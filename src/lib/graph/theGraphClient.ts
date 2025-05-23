import {gql, request} from "graphql-request";
import z from "zod";
import {ChainId, getChainNameForId, GraphQLAddress, TokenContract} from "../domain";
import {BuildConfiguration} from "../configuration/buildConfiguration";

interface TheGraphClient {
  getCreatorTokens: (query: GetCreatorTokensQuery) => Promise<TokenContract[]>;
  getEthereumCreatorToken: (query: GetCreatorTokenQuery) => Promise<TokenContract | undefined>;
}

interface GetCreatorTokensQuery {
  chainId: ChainId;
}

interface GetCreatorTokenQuery {
  chainId: ChainId;
  symbol: string;
}

const RawContract = z.strictObject({
  id: GraphQLAddress,
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  isOpened: z.coerce.boolean(),
});
type RawContract = z.infer<typeof RawContract>;

const getCreatorTokensGql = gql`
  query GetCreatorTokens {
    erc20Contracts(where: { creatorToken: null }, first:1000) {
      id
      name
      symbol
      decimals
      isOpened
    }
  }
`;

const getEthereumCreatorTokenGql = gql`
  query getEthereumCreatorToken($symbol: String) {
    erc20Contracts(where: { symbol: $symbol }) {
      id
      name
      symbol
      decimals
      isOpened
    }
  }
`;

const GetCreatorTokensRawResult = z.strictObject({
  erc20Contracts: z.array(RawContract),
});

interface Creation {
  configuration: BuildConfiguration;
}

export function createTheGraphClient({
                                       configuration,
                                     }: Creation): TheGraphClient {
  const {mainnetUrl, sepoliaUrl, polygonUrl, amoyUrl} = configuration;
  const urlByChainId: Record<ChainId, string> = {
    [ChainId.Mainnet]: mainnetUrl,
    [ChainId.Sepolia]: sepoliaUrl,
    [ChainId.Polygon]: polygonUrl,
    [ChainId.Amoy]: amoyUrl,
  };
  return {
    getCreatorTokens,
    getEthereumCreatorToken
  };

  async function getEthereumCreatorToken({symbol, chainId}: GetCreatorTokenQuery): Promise<TokenContract | undefined> {
    const result = await request(urlByChainId[chainId], getEthereumCreatorTokenGql, {symbol});
    const typedResult = GetCreatorTokensRawResult.parse(result);
    return typedResult.erc20Contracts.length > 0 ? parseRawContract(typedResult.erc20Contracts[0], chainId) : undefined;
  }

  async function getCreatorTokens({
                                    chainId,
                                  }: GetCreatorTokensQuery): Promise<TokenContract[]> {
    const result = await request(urlByChainId[chainId], getCreatorTokensGql);
    const typedResult = GetCreatorTokensRawResult.parse(result);
    return typedResult.erc20Contracts.map((contract) => parseRawContract(contract, chainId));
  }

  function parseRawContract(raw: RawContract, chainId: ChainId) {
    return {
      name: raw.name,
      address: raw.id,
      symbol: raw.symbol,
      decimals: raw.decimals,
      isOpened: raw.isOpened || false,
      chainId: chainId,
      chainName: getChainNameForId(chainId),
    };
  }
}
