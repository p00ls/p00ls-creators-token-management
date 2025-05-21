import {CreateLogger} from '@arpinum/log';
import {useCallback, useEffect, useMemo} from 'react';
import {useDisconnect} from 'wagmi';
import {WalletErrors} from '../../iso';

interface Creation {
  createLogger: CreateLogger;
}

export function useDisconnectFromWallet({createLogger}: Creation) {
  const logger = useMemo(
    () => createLogger({category: 'useDisconnectFromWallet'}),
    [createLogger]
  );
  const {disconnect, disconnectAsync, error, status} = useDisconnect();

  useEffect(() => {
    if (status === 'error' && error) {
      logger.error(WalletErrors.businessFrom(error));
    }
  }, [error, logger, status]);

  const disconnectFromWallet = useCallback(() => {
    logger.debug('Disconnecting from wallet');
    disconnect();
  }, [disconnect, logger]);

  const disconnectFromWalletAsync = useCallback(() => {
    logger.debug('Disconnecting from wallet asynchronously');
    return disconnectAsync();
  }, [disconnectAsync, logger]);

  return {
    disconnectFromWallet,
    disconnectFromWalletAsync,
    error,
  };
}
