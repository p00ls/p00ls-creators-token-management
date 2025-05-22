import {Paginations} from './paginations';
import {Arrays} from '../../tools';
import {useCallback, useMemo, useState} from 'react';

interface Creation<TEntry> {
  entries: TEntry[];
  pageSize?: number;
}

export function useInMemoryPagination<TEntry>({
                                                entries,
                                                pageSize = 20,
                                              }: Creation<TEntry>) {
  const [page, setPage] = useState(1);

  const pagination = useMemo(() => ({page, pageSize}), [page, pageSize]);

  const total = entries.length;

  const computeGlobalIndex = useCallback(
    (localIndex: number) =>
      Paginations.computeGlobalIndex(localIndex, pagination, total),
    [pagination, total]
  );

  const chunks = useMemo(() => Arrays.chunk(entries, 20), [entries]);
  const pageEntries = useMemo(() => {
    const index = page - 1;
    const lastAvailableIndex = chunks.length - 1;
    return lastAvailableIndex >= index ? chunks[index] : [];
  }, [chunks, page]);

  return {
    pagination,
    entries: pageEntries,
    total: total,
    onPageChange: setPage,
    computeGlobalIndex,
  };
}
