import { z } from 'zod';

export const addressTypes = ['address', 'token', 'tx', 'nft'] as const;
export type AddressType = (typeof addressTypes)[number];

export const allChainNames = [
  'ARBITRUM_MAINNET',
  'AVALANCHE_MAINNET',
  'BASE_MAINNET',
  'BLAST_MAINNET',
  'ETH_GOERLI',
  'ETH_MAINNET',
  'ETH_SEPOLIA',
  'OPTIMISM_MAINNET',
  'POLYGON_AMOY',
  'POLYGON_MAINNET',
  'POLYGON_MUMBAI',
  'TEZOS_MAINNET',
  'ZORA_MAINNET',
] as const;

export const ChainName = z.enum(allChainNames);
export type ChainName = z.infer<typeof ChainName>;

const legacyChainNames = [
  'ethereum',
  'mainnet',
  'goerli',
  'polygon',
  'mumbai',
  'sepolia',
  'amoy',
] as const;

export const LegacyChainName = z.enum(legacyChainNames);

export type LegacyChainName = z.infer<typeof LegacyChainName>;

const chainNamePerLegacyOne: Record<LegacyChainName, ChainName> = {
  ethereum: 'ETH_MAINNET',
  mainnet: 'ETH_MAINNET',
  goerli: 'ETH_GOERLI',
  sepolia: 'ETH_SEPOLIA',
  polygon: 'POLYGON_MAINNET',
  mumbai: 'POLYGON_MUMBAI',
  amoy: 'POLYGON_AMOY',
};

const blockExplorerUrlsPerChains: Record<
  ChainName,
  (address: string, type: AddressType) => string
> = {
  ETH_MAINNET: (address, type) => `https://etherscan.io/${type}/${address}`,
  ETH_GOERLI: (address, type) =>
    `https://goerli.etherscan.io/${type}/${address}`,
  ETH_SEPOLIA: (address, type) =>
    `https://sepolia.etherscan.io/${type}/${address}`,
  POLYGON_MAINNET: (address, type) =>
    `https://polygonscan.com/${type}/${address}`,
  POLYGON_MUMBAI: (address, type) =>
    `https://mumbai.polygonscan.com/${type}/${address}`,
  POLYGON_AMOY: (address, type) =>
    `https://amoy.polygonscan.com/${type}/${address}`,
  ARBITRUM_MAINNET: (address: string, type: AddressType) =>
    `https://arbiscan.io/${type}/${address}`,
  AVALANCHE_MAINNET: (address: string, type: AddressType) =>
    `https://avascan.info/${type}/${address}`,
  BASE_MAINNET: (address: string, type: AddressType) =>
    `https://basescan.org/${type}/${address}`,
  BLAST_MAINNET: (address: string, type: AddressType) =>
    `https://blastscan.io/${type}/${address}`,
  OPTIMISM_MAINNET: (address: string, type: AddressType) =>
    `https://optimistic.etherscan.io/${type}/${address}`,
  TEZOS_MAINNET: (address: string) => `https://tzstats.com/${address}`,
  ZORA_MAINNET: (address: string, type: AddressType) =>
    `https://zora.superscan.network/${type}/${address}`,
};

const chainIdsPerChains: Partial<Record<ChainName, number>> = {
  ETH_GOERLI: 5,
  ETH_MAINNET: 1,
  ETH_SEPOLIA: 11155111,
  POLYGON_AMOY: 80002,
  POLYGON_MAINNET: 137,
  POLYGON_MUMBAI: 80001,
};

const chainSymbolsPerChains: Partial<Record<ChainName, string>> = {
  ETH_GOERLI: 'ETH',
  ETH_MAINNET: 'ETH',
  ETH_SEPOLIA: 'ETH',
  POLYGON_AMOY: 'MATIC',
  POLYGON_MAINNET: 'MATIC',
  POLYGON_MUMBAI: 'MATIC',
};

const chainDisplayNamesPerChains: Partial<Record<ChainName, string>> = {
  ETH_GOERLI: 'Goerli',
  ETH_MAINNET: 'Ethereum',
  ETH_SEPOLIA: 'Sepolia',
  POLYGON_AMOY: 'Polygon Amoy',
  POLYGON_MAINNET: 'Polygon',
  POLYGON_MUMBAI: 'Polygon Mumbai',
};

const chainNamesPerIds: Partial<Record<number, ChainName>> = Object.entries(
  chainIdsPerChains
).reduce((result, [id, name]) => ({ ...result, [name]: id }), {});

export const Chains = {
  names: allChainNames,
  fromLegacy,
  isLegacyChain,
  toLegacyChainName,
  blockExplorerUrlsPerChains,
  getChainIdForName,
  getChainNameForId,
  getChainSymbolForName,
  getChainDisplayNameForName,
  toHumanExternalUrl,
};

function getChainIdForName(name: ChainName): number {
  const id = chainIdsPerChains[name];
  if (!id) {
    throw new Error(`No id configured for chain ${name}`);
  }
  return id;
}

export function getChainNameForId(id: number): ChainName {
  const name = chainNamesPerIds[id];
  if (!name) {
    throw new Error(`No name configured for id ${id}`);
  }
  return name;
}

function getChainSymbolForName(name: ChainName): string {
  const symbol = chainSymbolsPerChains[name];
  if (!symbol) {
    throw new Error(`No symbol configured for chain ${name}`);
  }
  return symbol;
}

function getChainDisplayNameForName(name: ChainName): string {
  const displayName = chainDisplayNamesPerChains[name];
  if (!displayName) {
    throw new Error(`No display name configured for chain ${name}`);
  }
  return displayName;
}

function fromLegacy(legacy: LegacyChainName): ChainName {
  return chainNamePerLegacyOne[legacy];
}

function isLegacyChain(name: string | undefined): name is LegacyChainName {
  return name === undefined
    ? false
    : legacyChainNames.includes(name as LegacyChainName);
}

function toLegacyChainName(chain: ChainName): LegacyChainName | undefined {
  switch (chain) {
    case 'ETH_GOERLI':
      return 'goerli';
    case 'ETH_MAINNET':
      return 'ethereum';
    case 'ETH_SEPOLIA':
      return 'sepolia';
    case 'POLYGON_AMOY':
      return 'amoy';
    case 'POLYGON_MAINNET':
      return 'polygon';
    case 'POLYGON_MUMBAI':
      return 'mumbai';
    default:
      return undefined;
  }
}

function toHumanExternalUrl(chain: ChainName, value: string): string {
  switch (chain) {
    case 'ETH_MAINNET':
    case 'ETH_GOERLI':
      return `https://opensea.io/assets/ethereum/${value}`;
    case 'ETH_SEPOLIA':
      return `https://opensea.io/assets/sepolia/${value}`;
    case 'POLYGON_MAINNET':
    case 'POLYGON_MUMBAI':
      return `https://opensea.io/assets/matic/${value}`;
    case 'POLYGON_AMOY':
      return `https://opensea.io/assets/amoy/${value}`;
    case 'ARBITRUM_MAINNET':
      return `https://opensea.io/assets/arbitrum/${value}`;
    case 'AVALANCHE_MAINNET':
      return `https://opensea.io/assets/avalanche/${value}`;
    case 'BASE_MAINNET':
      return `https://opensea.io/assets/base/${value}`;
    case 'BLAST_MAINNET':
      return `https://opensea.io/assets/blast/${value}`;
    case 'OPTIMISM_MAINNET':
      return `https://opensea.io/assets/optimism/${value}`;
    case 'TEZOS_MAINNET':
      return `https://objkt.com/collections/${value}`;
    case 'ZORA_MAINNET':
      return `https://opensea.io/assets/zora/${value}`;
    default:
      return '';
  }
}
