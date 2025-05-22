import { pipe } from 'fp-ts/function';
import { ReactNode } from 'react';
import { queryResult, QueryResult } from './queryResult';

export interface QueryResultPresenterProps<T> {
  result: QueryResult<T>;
  success: (data: T, loading: boolean) => ReactNode;
  error: (error: Error) => ReactNode;
  loading: () => ReactNode;
  empty: () => ReactNode;
}

export const QueryResultPresenter = <T,>({
  result,
  success,
  error,
  loading,
  empty,
}: QueryResultPresenterProps<T>) => {
  return pipe(
    result,
    queryResult.match(
      empty,
      error,
      loading,
      (data) => success(data, true),
      (data) => success(data, false)
    )
  );
};
