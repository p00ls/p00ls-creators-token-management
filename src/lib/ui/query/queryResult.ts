import { Lazy } from 'fp-ts/function';

interface EmptyResult {
  type: 'empty';
}

interface LoadingResult {
  type: 'loading';
}

interface SuccessResult<T> {
  type: 'success';
  data: T;
}

interface ReloadingResult<T> {
  type: 'reloading';
  data: T;
}

interface ErrorResult {
  type: 'error';
  error: Error;
}

export type QueryResult<T> =
  | EmptyResult
  | LoadingResult
  | SuccessResult<T>
  | ReloadingResult<T>
  | ErrorResult;

export const queryResult = {
  map:
    <T, U>(f: (t: T) => U) =>
    (state: QueryResult<T>): QueryResult<U> => {
      switch (state.type) {
        case 'error':
        case 'loading':
        case 'empty':
          return state;
        case 'reloading':
        case 'success':
          return {
            type: state.type,
            data: f(state.data),
          };
      }
    },
  mapFirst:
    <T, U>(f: (t: T) => U) =>
    (state: QueryResult<T>): QueryResult<T> => {
      switch (state.type) {
        case 'error':
        case 'loading':
        case 'empty':
          return state;
        case 'reloading':
        case 'success':
          f(state.data);
          return state;
      }
    },
  chain:
    <T, U>(f: (t: T) => QueryResult<U>) =>
    (state: QueryResult<T>): QueryResult<U> => {
      switch (state.type) {
        case 'error':
        case 'loading':
        case 'empty':
          return state;
        case 'reloading':
        case 'success':
          return f(state.data);
      }
    },
  match:
    <A, B>(
      onEmpty: () => B,
      onError: (e: Error) => B,
      onLoading: () => B,
      onReloading: (a: A) => B,
      onSuccess: (a: A) => B
    ) =>
    (ma: QueryResult<A>) => {
      switch (ma.type) {
        case 'error':
          return onError(ma.error);
        case 'loading':
          return onLoading();
        case 'reloading':
          return onReloading(ma.data);
        case 'success':
          return onSuccess(ma.data);
        case 'empty':
          return onEmpty();
      }
    },
  fold: <A, B>(onNone: Lazy<B>, onData: (a: A) => B) =>
    queryResult.match<A, B>(onNone, onNone, onNone, onData, onData),
  getOrElse: <T>(onNone: Lazy<T>) => queryResult.fold<T, T>(onNone, (d) => d),
  getOrNull: <T>(state: QueryResult<T>) =>
    queryResult.getOrElseW<null>(() => null)(state),
  getOrElseW:
    <B>(onNone: Lazy<B>) =>
    <A>(state: QueryResult<A>): B | A => {
      switch (state.type) {
        case 'error':
        case 'loading':
        case 'empty':
          return onNone();
        case 'reloading':
        case 'success':
          return state.data;
      }
    },
  sequence,
  of: <T>(data: T): QueryResult<T> => ({ type: 'success', data }),
  empty: <T>(): QueryResult<T> => ({ type: 'empty' }),
  error: <T>(error: Error): QueryResult<T> => ({ type: 'error', error }),
  isLoading: (result: QueryResult<unknown>) =>
    result.type === 'loading' || result.type === 'reloading',
};

function sequence<T>(results: [QueryResult<T>]): QueryResult<[T]>;
function sequence<T1, T2>(
  results: [QueryResult<T1>, QueryResult<T2>]
): QueryResult<[T1, T2]>;
function sequence<T1, T2, T3>(
  results: [QueryResult<T1>, QueryResult<T2>, QueryResult<T3>]
): QueryResult<[T1, T2, T3]>;
function sequence<T1, T2, T3, T4>(
  results: [QueryResult<T1>, QueryResult<T2>, QueryResult<T3>, QueryResult<T4>]
): QueryResult<[T1, T2, T3, T4]>;
function sequence<T1, T2, T3, T4, T5>(
  results: [
    QueryResult<T1>,
    QueryResult<T2>,
    QueryResult<T3>,
    QueryResult<T4>,
    QueryResult<T5>
  ]
): QueryResult<[T1, T2, T3, T4, T5]>;
function sequence(results: QueryResult<unknown>[]): QueryResult<unknown[]> {
  const errorMaybe = results.find((r) => r.type === 'error');
  if (errorMaybe) {
    return errorMaybe as ErrorResult;
  }
  const loadingMaybe = results.find((r) => r.type === 'loading');
  if (loadingMaybe) {
    return loadingMaybe as LoadingResult;
  }
  const emptyMaybe = results.find((r) => r.type === 'empty');
  if (emptyMaybe) {
    return emptyMaybe as EmptyResult;
  }
  const reloadingMaybe = results.find((r) => r.type === 'reloading');
  if (reloadingMaybe) {
    return {
      type: 'reloading',
      data: results.map(
        (r) => (r as ReloadingResult<unknown> | SuccessResult<unknown>).data
      ),
    };
  }
  if (!results.some((r) => r.type !== 'success')) {
    return {
      type: 'success',
      data: results.map((r) => (r as SuccessResult<unknown>).data),
    };
  }
  return { type: 'empty' };
}
