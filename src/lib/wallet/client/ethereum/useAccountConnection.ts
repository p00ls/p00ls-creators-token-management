import {EvmAddress} from '../../../domain';
import {useEffect, useMemo, useState} from 'react';
import {useAccount, useDisconnect} from 'wagmi';
import {AccountConnection, AccountConnectionStatus} from '../../iso';

export function useAccountConnection() {
  const {isConnected, address} = useAccount();
  const {disconnectAsync} = useDisconnect();

  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(false), []);

  return useMemo<AccountConnection>(() => {
    if (loading) {
      return {status: AccountConnectionStatus.Loading};
    }
    if (isConnected && address) {
      return {
        status: AccountConnectionStatus.Connected,
        address: EvmAddress.fromString(address),
        disconnect: disconnectAsync,
      };
    }
    return {status: AccountConnectionStatus.Disconnected};
  }, [address, disconnectAsync, isConnected, loading]);
}
