export const AsyncOperationState = {
  Failed: 'failed',
  Succeeded: 'succeeded',
  Pending: 'pending',
  Idle: 'idle',
} as const;

export type AsyncOperationResult<TResult> =
  | {
  state: typeof AsyncOperationState.Failed;
  error: Error;
}
  | {
  state: typeof AsyncOperationState.Succeeded;
  result: TResult;
}
  | {
  state:
    | typeof AsyncOperationState.Pending
    | typeof AsyncOperationState.Idle;
};

export const asyncOperationResult = {
  match: <A, B>(
    onIdle: () => B,
    onError: (e: Error) => B,
    onLoading: () => B,
    onSuccess: (a: A) => B,
    ma: AsyncOperationResult<A>
  ) => {
    switch (ma.state) {
      case AsyncOperationState.Failed:
        return onError(ma.error);
      case AsyncOperationState.Pending:
        return onLoading();
      case AsyncOperationState.Idle:
        return onIdle();
      case AsyncOperationState.Succeeded:
        return onSuccess(ma.result);
    }
  },
};
