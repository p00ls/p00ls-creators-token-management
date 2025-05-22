import {useReloadableQuery} from '../ui';
import {usePublicClient} from 'wagmi';
import {tokenAbi} from './tokenAbi';
import {TokenAllowlists} from './tokenAllowlists';
import {HexString, TokenContract} from "../domain";

interface Creation {
  contract: TokenContract;
  searchedAddress?: HexString;
}

export function useTokenAllowlist({contract, searchedAddress}: Creation) {
  const client = usePublicClient({
    chainId: contract.chainId,
  });
  return useReloadableQuery(
    [contract, searchedAddress],
    getAllowlistedAddresses
  );

  async function getAllowlistedAddresses() {
    const [grantedRoles, revokedRoles] = await Promise.all([
      getRoleGranted(TokenAllowlists.roleAddress),
      getRoleRevoked(TokenAllowlists.roleAddress),
    ]);
    const allEvents = [...grantedRoles, ...revokedRoles];
    const allowlistedAddresses =
      TokenAllowlists.getAllowlistedAddress(allEvents);
    return TokenAllowlists.filter(allowlistedAddresses, searchedAddress);
  }

  function getRoleGranted(roleAddress: HexString) {
    return client.getContractEvents({
      address: contract.address,
      abi: tokenAbi,
      eventName: 'RoleGranted',
      args: {role: roleAddress},
      fromBlock: BigInt(0),
      toBlock: 'latest',
    });
  }

  function getRoleRevoked(roleAddress: HexString) {
    return client.getContractEvents({
      address: contract.address,
      abi: tokenAbi,
      eventName: 'RoleRevoked',
      args: {role: roleAddress},
      fromBlock: BigInt(0),
      toBlock: 'latest',
    });
  }
}

export type UseTokenAllowlist = typeof useTokenAllowlist;
