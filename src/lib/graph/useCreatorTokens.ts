import useSWR from "swr";
import {TokenContract} from "../domain";
import {useTheGraph} from "./useTheGraph";
import {useBuildConfiguration} from "../configuration/BuildConfigurationProvider";

const empty: TokenContract[] = [];

export function useCreatorTokens() {
  const {appPolygonChainId} = useBuildConfiguration();
  const {getCreatorTokens} = useTheGraph();
  const {data, isLoading, error} = useSWR(
    ["getCreatorTokens", appPolygonChainId],
    () => getCreatorTokens({chainId: appPolygonChainId}),
    {revalidateOnFocus: false}
  );
  return {
    creatorTokens: data || empty,
    gettingCreatorTokens: isLoading,
    gettingCreatorTokensFailed: error !== undefined,
  };
}
