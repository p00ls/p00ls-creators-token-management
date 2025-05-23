import {useContractRead} from 'wagmi';
import {tokenAbi} from './tokenAbi';
import {TokenContract, ZodEvmAddress} from "../domain";

interface Creation {
  contract: TokenContract;
  chainId: number;
}

export function useTokenOwner({contract, chainId}: Creation) {
  const {data, isLoading, isError} = useContractRead({
    address: contract.address,
    abi: tokenAbi,
    functionName: 'owner',
    chainId: chainId,
  });
  return {
    ownerAddress: data ? ZodEvmAddress.parse(data) : undefined,
    fetching: isLoading,
    failed: isError,
  };
}

export type UseTokenOwner = typeof useTokenOwner;
