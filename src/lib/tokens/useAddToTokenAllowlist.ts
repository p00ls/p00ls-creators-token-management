import {useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi';
import {tokenAbi} from './tokenAbi';
import {TokenAllowlists} from './tokenAllowlists';
import {HexString, TokenContract} from "../domain";
import {Functions} from "../functions/functions";

interface Dependencies {
  contract: TokenContract;
  addressToAdd: HexString;
  onSucceeded: () => void;
  enabled: boolean;
}

export type UseAddToTokenAllowlist = typeof useAddToTokenAllowlist;

export function useAddToTokenAllowlist({
                                         contract,
                                         addressToAdd,
                                         onSucceeded,
                                         enabled,
                                       }: Dependencies) {
  const {config, isError: prepareFailed} = usePrepareContractWrite({
    address: contract.address,
    abi: tokenAbi,
    functionName: 'grantRole',
    args: [TokenAllowlists.roleAddress, addressToAdd],
    chainId: contract.chainId,
    enabled,
  });
  const {write, data, isError: writeFailed} = useContractWrite(config);
  const {isLoading: addingToAllowlist} = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: onSucceeded,
  });
  return {
    addToTokenAllowlist: write ?? Functions.noop,
    addToTokenAllowlistReady: write !== undefined && !addingToAllowlist,
    addingToAllowlist,
    addingFailed: prepareFailed || writeFailed,
  };
}
