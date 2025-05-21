export interface EthereumConfig {
  chainId: number;
  infuraId: string;
  alchemyId: string;
  etherscanId: string;
  walletConnectProjectId: string;
  metadata: AppMetadata;
}

interface AppMetadata {
  name: string;
  description: string;
  url: string;
  logoUrl: string;
}
