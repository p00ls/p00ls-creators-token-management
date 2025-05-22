import {useContractRead} from 'wagmi';
import {tokenAbi} from './tokenAbi';
import {TokenContract, ZodEvmAddress} from "../domain";

interface Creation {
  contract: TokenContract;
}

export function useTokenOwner({contract}: Creation) {
  const {data, isLoading, isError} = useContractRead({
    address: contract.address,
    abi: tokenAbi,
    functionName: 'owner',
    chainId: contract.chainId,
  });
  return {
    ownerAddress: data ? ZodEvmAddress.parse(data) : undefined,
    fetching: isLoading,
    failed: isError,
  };
}

export type UseTokenOwner = typeof useTokenOwner;
