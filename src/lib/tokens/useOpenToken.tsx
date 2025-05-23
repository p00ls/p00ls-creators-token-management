import {useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from 'wagmi';
import {tokenAbi} from './tokenAbi';
import {TokenContract} from "../domain";
import {Functions} from "../functions/functions";

interface Dependencies {
  contract: TokenContract;
  onSucceeded: () => void;
  enabled: boolean;
  chainId: number;
}

export type UseOpenToken = typeof useOpenToken;

export function useOpenToken({contract, onSucceeded, enabled, chainId}: Dependencies) {
  const {config, isError: prepareFailed} = usePrepareContractWrite({
    address: contract.address,
    abi: tokenAbi,
    functionName: 'open',
    chainId: chainId,
    enabled,
  });
  const {write, data, isError: writeFailed} = useContractWrite(config);
  const {isLoading: openingToken} = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: onSucceeded,
  });
  return {
    openToken: write ?? Functions.noop,
    openTokenReady: write !== undefined && !openingToken,
    openingToken,
    openingFailed: prepareFailed || writeFailed,
  };
}
