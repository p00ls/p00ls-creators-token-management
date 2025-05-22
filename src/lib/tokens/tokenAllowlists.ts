import {keccak256, toHex} from 'viem';
import {Addresses, HexString} from "../domain";

export const TokenAllowlists = {
  getAllowlistedAddress,
  roleAddress: keccak256(toHex('WHITELISTED')),
  filter,
};

export interface RoleEvent {
  blockNumber: bigint;
  transactionIndex: number;
  eventName: 'RoleGranted' | 'RoleRevoked';
  args: {
    account?: HexString | undefined;
  };
}

type RoleEventWithAccount = RoleEvent & { args: { account: HexString } };

function getAllowlistedAddress(roleEvents: RoleEvent[]): HexString[] {
  const sorted = sortEvents(roleEvents);
  const indexed = sorted.reduce(
    (result, current) => ({
      ...result,
      [current.args.account || '']:
        current.eventName === 'RoleGranted' ? current : undefined,
    }),
    {} as Record<string, RoleEvent | undefined>
  );
  const remainingGrantedEvents = Object.entries(indexed)
    .filter(([address, eventMaybe]) => address && eventMaybe !== undefined)
    .map(([_, event]) => event as RoleEventWithAccount);
  const sortedGrantedEvents = sortEvents(remainingGrantedEvents);
  return sortedGrantedEvents.map((e) => e.args.account);
}

function sortEvents<TRoleEvent extends RoleEvent>(
  roleEvents: TRoleEvent[]
): TRoleEvent[] {
  return roleEvents.slice().sort((left, right) => {
    if (left.blockNumber === right.blockNumber) {
      return left.transactionIndex < right.transactionIndex ? -1 : 1;
    }
    return left.blockNumber < right.blockNumber ? -1 : 1;
  });
}

function filter(
  input: HexString[],
  searchedAddress: HexString | undefined
): HexString[] {
  return input.filter(
    (address) =>
      !searchedAddress || Addresses.areEqual(address, searchedAddress)
  );
}
