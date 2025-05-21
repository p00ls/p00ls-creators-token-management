import {useCallback} from 'react';
import {makeCreateSiweMessage} from '../iso';

interface Creation {
  chainId: number;
  createStatement: (address: string) => string;
}

export function useSiweMessage({chainId, createStatement}: Creation) {
  const siweMessage = useCallback(
    (address: string, nonce: number | string) => {
      const createSiweMessage = makeCreateSiweMessage({
        createDate: () => new Date(),
      });
      return createSiweMessage({
        statement: createStatement(address),
        addressHex: address,
        chainId,
        domain: window.location.hostname,
        uri: `${window.location.protocol}://${window.location.host}`,
        nonce: nonce.toString(),
        durationInSeconds: 600,
      });
    },
    [chainId, createStatement]
  );

  return {siweMessage};
}
