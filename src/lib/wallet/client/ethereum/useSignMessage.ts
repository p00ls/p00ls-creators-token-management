import {CreateLogger} from '@arpinum/log';
import {Address, EvmAddress} from '../../../domain';
import {Errors} from '../../../tools';
import {useCallback, useMemo} from 'react';
import {useSignMessage as useWagmiSignMessage} from 'wagmi';
import {AccountConnection, AccountConnectionStatus, Signature, WalletErrors,} from '../../iso';

interface Creation {
  connection: AccountConnection;
  onAddressConfirmed?: (address: Address) => void;
  createLogger: CreateLogger;
}

export function useSignMessage({
                                 connection,
                                 onAddressConfirmed,
                                 createLogger,
                               }: Creation): (message: string) => Promise<Signature> {
  const logger = useMemo(
    () => createLogger({category: 'useSignMessage'}),
    [createLogger]
  );
  const {signMessageAsync} = useWagmiSignMessage();
  return useCallback(
    async (message: string) => {
      try {
        if (connection.status !== AccountConnectionStatus.Connected) {
          return Promise.reject(new Error('Invalid address for signature'));
        }
        const signature: string = await Errors.tryAsync(
          () => signMessageAsync({message}),
          WalletErrors.businessFrom
        );
        const safeAddress = EvmAddress.fromString(connection.address);
        if (onAddressConfirmed) {
          onAddressConfirmed(safeAddress);
        }
        return Promise.resolve({
          address: safeAddress,
          signature,
          message,
        });
      } catch (e) {
        logger.error(e);
        return Promise.reject(e);
      }
    },
    [connection, logger, signMessageAsync, onAddressConfirmed]
  );
}
