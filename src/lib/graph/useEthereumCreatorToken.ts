import useSWR from "swr";
import {useTheGraph} from "./useTheGraph";
import {useBuildConfiguration} from "../configuration/BuildConfigurationProvider";

export function useEthereumCreatorToken(symbol: string) {
  const {appPolygonChainId} = useBuildConfiguration();
  const ethereumChainId = appPolygonChainId === 80002 ? 11155111 : 1;

  const {getEthereumCreatorToken} = useTheGraph();
  const {data, isLoading, error} = useSWR(
    ["getCreatorToken", ethereumChainId],
    () => getEthereumCreatorToken({chainId: ethereumChainId, symbol}),
    {revalidateOnFocus: false, shouldRetryOnError: false}
  );
  return {
    ethereumToken: data,
    gettingEthereumToken: isLoading,
    gettingEthereumTokenFailed: error !== undefined,
  };
}
