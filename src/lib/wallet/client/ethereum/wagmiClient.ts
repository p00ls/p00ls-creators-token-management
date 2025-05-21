import {CreateLogger} from '@arpinum/log';
import {defineChain} from 'viem';
import {Chain, configureChains, createConfig as wagmiCreateConfig, CreateConfigParameters,} from 'wagmi';
import {mainnet, polygon, sepolia} from 'wagmi/chains';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {MetaMaskConnector} from 'wagmi/connectors/metaMask';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {infuraProvider} from 'wagmi/providers/infura';
import {EthereumConnectors} from './EthereumConnectors';
import {EthereumConfig} from './EthereumConfig';

const polygonAmoy = defineChain({
  id: 80_002,
  name: 'Polygon Amoy',
  network: 'maticamoy',
  nativeCurrency: {name: 'MATIC', symbol: 'MATIC', decimals: 18},
  rpcUrls: {
    alchemy: {
      http: ['https://polygon-amoy.g.alchemy.com/v2'],
      webSocket: ['wss://polygon-amoy.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://polygon-amoy.infura.io/v3'],
      webSocket: ['wss://polygon-amoy.infura.io/ws/v3'],
    },
    default: {
      http: ['https://rpc.ankr.com/polygon_amoy'],
    },
    public: {
      http: ['https://rpc.ankr.com/polygon_amoy'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'PolygonScan',
      url: 'https://amoy.polygonscan.com',
    },
    default: {
      name: 'PolygonScan',
      url: 'https://amoy.polygonscan.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 3127388,
    },
  },
  testnet: true,
});

const supportedChains = [mainnet, sepolia, polygon, polygonAmoy];

function createConnectors(
  chains: Chain[],
  config: EthereumConfig
): EthereumConnectors {
  const metaMask = new MetaMaskConnector({
    chains,
    options: {shimDisconnect: true},
  });
  const injected = new InjectedConnector({
    chains,
    options: {shimDisconnect: true},
  });
  const walletConnect = new WalletConnectConnector({
    chains,
    options: {
      projectId: config.walletConnectProjectId,
      metadata: {
        name: config.metadata.name,
        description: config.metadata.description,
        url: config.metadata.url,
        icons: [config.metadata.logoUrl],
      },
    },
  });

  const coinbaseWallet = new CoinbaseWalletConnector({
    chains,
    options: {
      appName: config.metadata.name,
      appLogoUrl: config.metadata.logoUrl,
    },
  });

  return {injected, metaMask, walletConnect, coinbaseWallet};
}

interface ConfigCreation {
  params: Partial<CreateConfigParameters>;
  ethereumConfig: EthereumConfig;
  createLogger: CreateLogger;
}

export function createWagmiConfig({
                                    params,
                                    ethereumConfig,
                                    createLogger,
                                  }: ConfigCreation) {
  const logger = createLogger({category: 'wagmi'});
  const {chains, publicClient, webSocketPublicClient} = configureChains(
    supportedChains,
    [
      alchemyProvider({apiKey: ethereumConfig.alchemyId}),
      infuraProvider({apiKey: ethereumConfig.infuraId}),
    ]
  );
  const connectors = createConnectors(chains, ethereumConfig);
  const config = wagmiCreateConfig({
    ...params,
    connectors: Object.values(connectors),
    publicClient,
    webSocketPublicClient,
    logger,
  });
  return {config, connectors} as const;
}
