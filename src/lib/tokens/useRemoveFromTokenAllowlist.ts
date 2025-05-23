import {useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi';
import {tokenAbi} from './tokenAbi';
import {TokenAllowlists} from './tokenAllowlists';
import {HexString, TokenContract} from "../domain";
import {Functions} from "../functions/functions";

interface Dependencies {
  contract: TokenContract;
  addressToRemove: HexString;
  onSucceeded: () => void;
  enabled: boolean;
  chainId: number;
}

export type UseRemoveFromTokenAllowlist = typeof useRemoveFromTokenAllowlist;

export function useRemoveFromTokenAllowlist({
                                              contract,
                                              addressToRemove,
                                              onSucceeded,
                                              enabled,
                                              chainId,
                                            }: Dependencies) {
  const {config, isError: prepareFailed} = usePrepareContractWrite({
    address: contract.address,
    abi: tokenAbi,
    functionName: 'revokeRole',
    args: [TokenAllowlists.roleAddress, addressToRemove],
    chainId: chainId,
    enabled,
  });
  const {write, data, isError: writeFailed} = useContractWrite(config);
  const {isLoading: removingFromAllowlist} = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: onSucceeded,
  });
  return {
    removeFromTokenAllowlist: write ?? Functions.noop,
    removeFromTokenAllowlistReady:
      write !== undefined && !removingFromAllowlist,
    removingFromAllowlist,
    removingFailed: prepareFailed || writeFailed,
  };
}
