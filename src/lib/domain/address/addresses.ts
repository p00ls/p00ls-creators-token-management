export const Addresses = {
  areEqual,
  include,
  truncate,
};

function areEqual(
  left: string | undefined | null,
  right: string | undefined | null
) {
  if (!left || !right) {
    return left === right;
  }
  return left.toLowerCase() === right.toLowerCase();
}

function include(array: string[], entry: string) {
  return array.some((a) => areEqual(a, entry));
}

export function truncate(address: string, rest = 4): string {
  if (address.length < rest * 2 + 2) return address;
  return `${address.slice(0, rest + 2)}…${address.slice(
    address.length - rest
  )}`;
}
