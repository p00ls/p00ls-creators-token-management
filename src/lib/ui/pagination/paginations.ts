import { z } from 'zod';
import { PaginationValue } from './paginationValue';

export const Paginations = {
  serialize,
  deserialize,
  computeGlobalIndex,
};

function computeGlobalIndex(
  localIndex: number,
  pagination: PaginationValue,
  total: number
) {
  const { page, pageSize } = pagination;
  return (localIndex + (page - 1) * pageSize + 1)
    .toString()
    .padStart(total.toString().length, '0');
}

function serialize(value: PaginationValue): string {
  const string = `${value.pageSize}:${value.page}`;
  return btoa(string);
}

const SerializationParts = z.array(z.coerce.number(), z.coerce.number());

function deserialize(
  cursor: string | undefined | null
): PaginationValue | undefined {
  try {
    return unsafelyDeserialize();
  } catch (_error) {
    return undefined;
  }

  function unsafelyDeserialize() {
    if (!cursor) {
      return undefined;
    }
    const string = atob(cursor);
    const rawParts = string.split(':');
    const partsParsing = SerializationParts.safeParse(rawParts);
    if (!partsParsing.success) {
      return undefined;
    }
    return { pageSize: partsParsing.data[0], page: partsParsing.data[1] };
  }
}
