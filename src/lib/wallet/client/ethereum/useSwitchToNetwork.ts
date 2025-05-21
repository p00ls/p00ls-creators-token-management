import {CreateLogger} from '@arpinum/log';
import {useCallback, useEffect, useMemo} from 'react';
import {useNetwork, useSwitchNetwork} from 'wagmi';
import {WalletErrors} from '../../iso';

interface Creation {
  createLogger: CreateLogger;
}

export function useSwitchToNetwork({createLogger}: Creation) {
  const {chain} = useNetwork();
  const {switchNetwork, error} = useSwitchNetwork();
  const logger = useMemo(
    () => createLogger({category: 'useSwitchToNetwork'}),
    [createLogger]
  );

  const applicationError = useMemo(
    () => (error ? WalletErrors.businessFrom(error) : undefined),
    [error]
  );

  useEffect(() => {
    if (applicationError) {
      logger.error(applicationError);
    }
  }, [applicationError, logger]);

  const currentNetwork = chain?.id;

  return useCallback(
    (network: number) => {
      if (!switchNetwork || currentNetwork === network) {
        return;
      }
      switchNetwork(network);
    },
    [currentNetwork, switchNetwork]
  );
}
