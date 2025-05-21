import {EthereumConfig, WalletProvider as BaseWalletProvider,} from './client';
import {PropsWithChildren, useMemo} from 'react';
import {createAppLogger} from '../logger';
import {useBuildConfiguration} from '../configuration/BuildConfigurationProvider';

export function CreatorWalletProvider({children}: PropsWithChildren) {
  const {web3, publicUrl} = useBuildConfiguration();
  const providerConfiguration: EthereumConfig = useMemo(
    () => ({
      ...web3,
      metadata: {
        name: 'P00ls',
        description: 'P00ls Creator Portal',
        url: publicUrl,
        logoUrl: `${publicUrl}/images/favicons/apple-touch-icon.png`,
      },
    }),
    [publicUrl, web3]
  );
  return (
    <BaseWalletProvider
      ethereumConfig={providerConfiguration}
      createLogger={createAppLogger}
    >
      {children}
    </BaseWalletProvider>
  );
}
