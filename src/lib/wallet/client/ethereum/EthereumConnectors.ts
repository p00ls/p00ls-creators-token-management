import {InjectedConnector} from 'wagmi/connectors/injected';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';
import {CoinbaseWalletConnector} from 'wagmi/dist/connectors/coinbaseWallet';
import {WalletConnectConnector} from 'wagmi/dist/connectors/walletConnect';

export interface EthereumConnectors {
  metaMask: MetaMaskConnector;
  injected: InjectedConnector;
  walletConnect: WalletConnectConnector;
  coinbaseWallet: CoinbaseWalletConnector;
}
