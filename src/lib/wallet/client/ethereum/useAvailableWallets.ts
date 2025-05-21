import {useEffect, useMemo, useState} from 'react';
import {Wallet, WalletType} from '../../iso';

import {EthereumConnectors} from './EthereumConnectors';

export function useAvailableWallets(connectors: EthereumConnectors): Wallet[] {
  const metamaskMobile = {
    type: WalletType.MetamaskMobile,
    name: 'MetaMask',
    connectorId: connectors.walletConnect.id,
  };
  const [availableMetaMask, setAvailableMetaMask] = useState(metamaskMobile);
  useEffect(() => {
    if (isMetaMaskInBrowser()) {
      setAvailableMetaMask({
        type: WalletType.Metamask,
        name: 'MetaMask',
        connectorId: connectors.metaMask.id,
      });
    }
  }, [connectors.metaMask.id]);
  return useMemo(
    () => [
      availableMetaMask,
      {
        type: WalletType.Injected,
        name: 'Browser wallet',
        connectorId: connectors.injected.id,
      },
      {
        type: WalletType.Coinbase,
        name: 'Coinbase Wallet',
        connectorId: connectors.coinbaseWallet.id,
      },
      {
        type: WalletType.Rainbow,
        name: 'Rainbow',
        connectorId: connectors.walletConnect.id,
      },
      {
        type: WalletType.Trust,
        name: 'Trust',
        connectorId: connectors.walletConnect.id,
      },
      {
        type: WalletType.Other,
        name: 'Wallet Connect',
        connectorId: connectors.walletConnect.id,
      },
    ],
    [
      availableMetaMask,
      connectors.coinbaseWallet.id,
      connectors.walletConnect.id,
      connectors.injected.id,
    ]
  );
}

interface WithEthereum {
  ethereum?: { isMetaMask: boolean };
}

function isMetaMaskInBrowser(): boolean {
  const castWindow = window as WithEthereum;
  return castWindow?.ethereum?.isMetaMask ?? false;
}
