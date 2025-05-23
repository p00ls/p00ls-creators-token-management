import {z} from "zod";
import {ChainName} from "./chain";

const HexString = z
  .string()
  .startsWith("0x")
  .transform((s) => s as `0x${string}`);

type HexString = z.infer<typeof HexString>;

export const GraphQLAddress = HexString;

export type GraphQLAddress = z.infer<typeof GraphQLAddress>;

export enum ChainId {
  Mainnet = 1,
  Sepolia = 11155111,
  Polygon = 137,
  Amoy = 80002,
}

export enum NetworkEnvironment {
  Mainnet = "mainnet",
  Testnet = "testnet",
}

export const NetworkEnvironmentSchema = z.nativeEnum(NetworkEnvironment);

export const Protocols = {
  getEthereumChainForEnvironment,
  getPolygonChainForEnvironment,
};

function getEthereumChainForEnvironment(network: NetworkEnvironment) {
  return network === NetworkEnvironment.Mainnet
    ? ChainId.Mainnet
    : ChainId.Sepolia;
}

function getPolygonChainForEnvironment(network: NetworkEnvironment) {
  return network === NetworkEnvironment.Mainnet
    ? ChainId.Polygon
    : ChainId.Amoy;
}

export interface TokenContract {
  name: string;
  address: GraphQLAddress;
  symbol: string;
  decimals: number;
  isOpened: boolean;
  chainId: ChainId;
  chainName: ChainName;
  ownerAddress: string;
}

export interface Transaction {
  hash: string;
  dateIso: string;
  contract: TokenContract;
}
