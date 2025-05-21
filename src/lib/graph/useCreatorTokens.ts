import useSWR from "swr";
import {TokenContract} from "../domain";
import {useTheGraph} from "./useTheGraph";
import {useBuildConfiguration} from "../configuration/BuildConfigurationProvider";

const empty: TokenContract[] = [];

export function useCreatorTokens() {
  const {web3} = useBuildConfiguration();
  const {getCreatorTokens} = useTheGraph();
  const {data, isLoading, error} = useSWR(
    ["getCreatorTokens", web3.chainId],
    () => getCreatorTokens({chainId: web3.chainId}),
    {revalidateOnFocus: false}
  );
  return {
    creatorTokens: data || empty,
    gettingCreatorTokens: isLoading,
    gettingCreatorTokensFailed: error !== undefined,
  };
}
