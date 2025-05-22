import { useCallback } from 'react';
import useSWR, { Key, SWRConfiguration } from 'swr';
import { Fetcher } from 'swr/_internal';
import { QueryResult } from './queryResult';

interface CustomOptions<Data> {
  isEmpty?: (data: Data) => boolean;
}

type AllOptions<Data, SWRKey extends Key> = CustomOptions<Data> &
  SWRConfiguration<Data, Fetcher<Data, SWRKey>>;

export function useQuery<Data, SWRKey extends Key>(
  key: SWRKey,
  fetcher: Fetcher<Data, SWRKey> | null,
  options: AllOptions<Data, SWRKey> = {}
): QueryResult<NonNullable<Data>> {
  const { result } = useReloadableQuery(key, fetcher, options);
  return result;
}

export interface ReloadableQueryResult<Data> {
  result: QueryResult<Data>;
  reload: () => void;
  updateAndReload: (data: Data) => void;
}

export function useReloadableQuery<Data, SWRKey extends Key>(
  key: SWRKey,
  fetcher: Fetcher<Data, SWRKey> | null,
  options: AllOptions<Data, SWRKey> = {}
): ReloadableQueryResult<NonNullable<Data>> {
  const { isEmpty = defaultIsEmpty, ...swrOptions } = options;
  const { data, isLoading, error, mutate } = useSWR<Data>(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
    ...swrOptions,
  });
  const reload = useCallback(() => {
    // noinspection JSIgnoredPromiseFromCall
    mutate();
  }, [mutate]);
  const updateAndReload = useCallback(
    (data: Data) => {
      // noinspection JSIgnoredPromiseFromCall
      mutate(data);
    },
    [mutate]
  );
  if (!key) {
    return { result: { type: 'empty' }, reload, updateAndReload };
  }
  if (isLoading && !data) {
    return { result: { type: 'loading' }, reload, updateAndReload };
  }
  if (isLoading && data) {
    return { result: { type: 'reloading', data }, reload, updateAndReload };
  }
  if (error) {
    return { result: { type: 'error', error }, reload, updateAndReload };
  }
  if (data === undefined || isEmpty(data)) {
    return { result: { type: 'empty' }, reload, updateAndReload };
  }
  if (data) {
    return { result: { type: 'success', data }, reload, updateAndReload };
  }
  return {
    result: { type: 'error', error: new Error('Unknown') },
    reload,
    updateAndReload,
  };
}

function defaultIsEmpty<Data>(data: Data): boolean {
  return !data;
}
