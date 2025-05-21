import {CreateLogger} from '@arpinum/log';
import {Address} from '../../../domain';
import {createContext, PropsWithChildren, useContext, useMemo} from 'react';
import {useNetwork, WagmiConfig} from 'wagmi';
import {EthereumConnectors} from './EthereumConnectors';
import {useAccountConnection} from './useAccountConnection';
import {useAvailableWallets} from './useAvailableWallets';
import {useConnectToWallet} from './useConnectToWallet';
import {useDisconnectFromWallet} from './useDisconnectFromWallet';
import {useSignMessage} from './useSignMessage';
import {useSwitchToNetwork} from './useSwitchToNetwork';
import {createWagmiConfig} from './wagmiClient';
import {EthereumConfig} from './EthereumConfig';
import {WalletFacade} from '../types';

export const WalletContext = createContext<WalletFacade | undefined>(undefined);

type WalletProviderProps = PropsWithChildren<{
  createLogger: CreateLogger;
  ethereumConfig: EthereumConfig;
  onWalletConnected?: (address: Address) => void;
  onAddressConfirmed?: (address: Address) => void;
}>;

export function useWallet() {
  const result = useContext(WalletContext);
  if (!result) {
    throw new Error('Missing ethereum wallet provider');
  }
  return result;
}

export function WalletProvider({
                                 createLogger,
                                 ethereumConfig,
                                 onWalletConnected,
                                 onAddressConfirmed,
                                 children,
                               }: WalletProviderProps) {
  const {config, connectors} = useMemo(
    () =>
      createWagmiConfig({
        params: {autoConnect: true},
        ethereumConfig,
        createLogger,
      }),
    [ethereumConfig, createLogger]
  );
  return (
    <WagmiConfig config={config}>
      <InternalWalletProvider
        connectors={connectors}
        onWalletConnected={onWalletConnected}
        onAddressConfirmed={onAddressConfirmed}
        createLogger={createLogger}
      >
        {children}
      </InternalWalletProvider>
    </WagmiConfig>
  );
}

function InternalWalletProvider({
                                  children,
                                  ...props
                                }: PropsWithChildren<UseProductionWalletCreation>) {
  const productionWallet = useProductionWallet(props);
  return (
    <WalletContext.Provider value={productionWallet}>
      {children}
    </WalletContext.Provider>
  );
}

interface UseProductionWalletCreation {
  connectors: EthereumConnectors;
  onWalletConnected?: (address: Address) => void;
  onAddressConfirmed?: (address: Address) => void;
  createLogger: CreateLogger;
}

function useProductionWallet({
                               connectors,
                               onWalletConnected,
                               onAddressConfirmed,
                               createLogger,
                             }: UseProductionWalletCreation) {
  const wallets = useAvailableWallets(connectors);
  const connection = useAccountConnection();
  const connectToWallet = useConnectToWallet({
    onWalletConnected,
    createLogger,
  });
  const disconnectFromWallet = useDisconnectFromWallet({
    createLogger,
  });
  const signMessage = useSignMessage({
    connection,
    onAddressConfirmed,
    createLogger,
  });
  const {chain} = useNetwork();
  const switchToNetwork = useSwitchToNetwork({createLogger});
  return {
    connectToWallet,
    disconnectFromWallet,
    wallets,
    connection,
    signMessage,
    switchToNetwork,
    currentChainId: chain?.id,
  };
}
