import {eq, ord, string} from 'fp-ts';
import {flow} from 'fp-ts/lib/function';
import {Branded} from '../brand';

export interface AddressBrand {
  readonly Address: unique symbol;
}

export class InvalidAddress extends Error {
}

export enum BlockchainType {
  Ethereum = 'Ethereum',
  Tezos = 'Tezos',
}

export type EvmAddress = Address;
export type TezosAddress = Address;
export type Address = Branded<string, AddressBrand>;

export const Address = {
  fromString: (value: string): Address => {
    if (EvmAddress.isAddress(value)) {
      return value;
    }
    if (TezosAddress.isAddress(value)) {
      return value;
    }
    throw new InvalidAddress(`Invalid address: ${value}`);
  },
  safeParse: (value: string): Address | null => {
    try {
      return Address.fromString(value);
    } catch {
      return null;
    }
  },
  blockchainType: (address: Address): BlockchainType => {
    if (EvmAddress.isAddress(address)) {
      return BlockchainType.Ethereum;
    }
    if (TezosAddress.isAddress(address)) {
      return BlockchainType.Tezos;
    }
    throw new InvalidAddress(`Invalid address: ${address}`);
  },
};

export const EvmAddress = {
  isAddress: (s: string): s is EvmAddress =>
    s.match(/^0x[0-9a-f]{40}/i) !== null,
  fromString: flow(string.toLowerCase, (value): EvmAddress => {
    if (!EvmAddress.isAddress(value)) {
      throw new InvalidAddress(`Invalid ethereum address: ${value}`);
    }
    return value;
  }),
  toString: (address: EvmAddress): `0x${string}` => address as `0x${string}`,
  safeParse: (value: string): EvmAddress | null => {
    try {
      return EvmAddress.fromString(value);
    } catch {
      return null;
    }
  },

  eq: string.Eq as eq.Eq<EvmAddress>,
  ord: string.Ord as ord.Ord<EvmAddress>,
};

export const TezosAddress = {
  isAddress: (s: string): s is TezosAddress =>
    s.match(/^tz[1-3]|^KT1/) !== null,
  fromString: (value: string): TezosAddress => {
    if (!TezosAddress.isAddress(value)) {
      throw new InvalidAddress(`Invalid tezos address: ${value}`);
    }
    return value;
  },

  eq: string.Eq as eq.Eq<TezosAddress>,
  ord: string.Ord as ord.Ord<TezosAddress>,
};
