import {z} from 'zod';
import {EvmAddress, TezosAddress} from './address';

export const HexString = z
  .string()
  .startsWith('0x')
  .transform((s) => s as HexString);
export type HexString = `0x${string}`;

const implicitPrefixes = ['tz1', 'tz2', 'tz3'] as const;

type ImplicitPrefix = (typeof implicitPrefixes)[number];

export type TezosImplicitAddress = `${ImplicitPrefix}${string}`;
export type TezosSmartContractAddress = `KT1${string}`;

function isImplicitAddress(address: string): address is TezosImplicitAddress {
  return implicitPrefixes.some((prefix) => address.startsWith(prefix));
}

function isSmartContractAddress(
  address: string
): address is TezosSmartContractAddress {
  return address.startsWith('KT1');
}

export type AnyTezosAddress = TezosImplicitAddress | TezosSmartContractAddress;
export const TezosImplicitAddress = z.string().refine(isImplicitAddress);

export const TezosSmartContractAddress = z
  .string()
  .refine(isSmartContractAddress);

export const ZodTezosAddress = z.union([
  TezosImplicitAddress,
  TezosSmartContractAddress,
]);

export const ZodEvmAddress = HexString.transform(
  (s) => s.toLowerCase() as `0x${string}`
);

export const ZodProperAddress = z.union([ZodEvmAddress, ZodTezosAddress]);

export const ZodAddress = z.union([
  z.string().refine(EvmAddress.isAddress).transform(EvmAddress.fromString),
  z.string().refine(TezosAddress.isAddress).transform(TezosAddress.fromString),
]);
