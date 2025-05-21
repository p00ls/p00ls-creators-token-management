import {CreateLogger} from '@arpinum/log';
import {Address, EvmAddress} from '../../../domain';
import {useCallback, useEffect, useMemo} from 'react';
import {useConnect} from 'wagmi';
import {Wallet, WalletErrors} from '../../iso';

interface Creation {
  onWalletConnected?: (address: Address) => void;
  createLogger: CreateLogger;
}

export function useConnectToWallet({
                                     onWalletConnected,
                                     createLogger,
                                   }: Creation) {
  const logger = useMemo(
    () => createLogger({category: 'useConnectToWallet'}),
    [createLogger]
  );
  const {
    connect,
    connectors: wagmiConnectors,
    error,
    status,
    data,
  } = useConnect();

  const applicationError = useMemo(
    () => (error ? WalletErrors.businessFrom(error) : undefined),
    [error]
  );

  const connectToWallet = useCallback(
    (wallet: Wallet) =>
      connect({
        connector: wagmiConnectors.find((c) => c.id === wallet.connectorId),
      }),
    [connect, wagmiConnectors]
  );

  useEffect(() => {
    if (status === 'success' && data && onWalletConnected) {
      onWalletConnected(EvmAddress.fromString(data.account));
    }
  }, [data, onWalletConnected, status]);

  useEffect(() => {
    if (status === 'error' && applicationError) {
      logger.error(applicationError);
    }
  }, [applicationError, logger, status]);

  return {
    connectToWallet,
    error: applicationError,
  };
}
