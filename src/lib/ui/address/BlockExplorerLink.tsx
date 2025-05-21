import { AddressType, ChainName, Chains } from '../../domain';
import { VersatileLink, VersatileLinkProps } from '../routing';

type Props = Omit<VersatileLinkProps, 'href' | 'external'> & {
  address: string;
  chainName: ChainName;
  type?: AddressType;
};

export function BlockExplorerLink({
  address,
  type = 'address',
  chainName,
  ...props
}: Props) {
  const href = Chains.blockExplorerUrlsPerChains[chainName](address, type);
  return <VersatileLink {...props} href={href} />;
}
