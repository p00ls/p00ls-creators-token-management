import {Level} from '@arpinum/log';
import {z} from 'zod';

export const BuildConfigurationSchema = z.strictObject({
  logLevel: z.nativeEnum(Level),
  publicUrl: z.string(),
  web3: z.object({
    chainId: z.coerce.number(),
    infuraId: z.string(),
    alchemyId: z.string(),
    etherscanId: z.string(),
    walletConnectProjectId: z.string(),
  }),
  mainnetUrl: z.string(),
  sepoliaUrl: z.string(),
  polygonUrl: z.string(),
  amoyUrl: z.string(),
  bypassWallet: z.coerce.boolean(),
  tokensAssetsBaseUrl: z.string(),
  assetsBaseUrl: z.string(),
});
export type BuildConfiguration = z.infer<typeof BuildConfigurationSchema>;

export function loadBuildConfiguration() {
  return BuildConfigurationSchema.parse({
    logLevel: import.meta.env.VITE_LOG_LEVEL,
    publicUrl: import.meta.env.VITE_PUBLIC_URL,
    web3: {
      chainId: import.meta.env.VITE_ETHEREUM_CHAIN_ID,
      infuraId: import.meta.env.VITE_INFURA_ID,
      alchemyId: import.meta.env.VITE_ALCHEMY_ID,
      etherscanId: import.meta.env.VITE_ETHERSCAN_ID,
      walletConnectProjectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
    },
    mainnetUrl: import.meta.env.VITE_MAINNET_URL,
    sepoliaUrl: import.meta.env.VITE_SEPOLIA_URL,
    polygonUrl: import.meta.env.VITE_POLYGON_URL,
    amoyUrl: import.meta.env.VITE_AMOY_URL,
    bypassWallet: import.meta.env.VITE_BYPASS_WALLET,
    tokensAssetsBaseUrl: import.meta.env.VITE_TOKENS_ASSETS_BASE_URL,
    assetsBaseUrl: import.meta.env.VITE_ASSETS_BASE_URL,
  });
}
