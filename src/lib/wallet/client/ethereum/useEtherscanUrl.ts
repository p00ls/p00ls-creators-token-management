import {useNetwork} from 'wagmi';

export function useEtherscanTransactionUrl(transactionHash: `0x${string}`) {
  const etherscanBaseUrl = useEtherscanBaseUrl();
  return `${etherscanBaseUrl}/tx/${transactionHash}`;
}

export function useEtherscanBaseUrl() {
  const {chain} = useNetwork();
  return chain?.blockExplorers?.etherscan?.url;
}
