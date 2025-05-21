import {useCallback, useState} from 'react';
import {AsyncOperationResult, AsyncOperationState} from './asyncOperation';
import {Errors} from '../errors/errors';

interface Options<TResult> {
  onSucceeded?: (result: TResult) => void;
  onUpdate?: (result: AsyncOperationResult<TResult>) => void;
}

export function useAsyncOperation<TResult, TArgs extends unknown[]>(
  func: (...args: TArgs) => Promise<TResult>,
  {onSucceeded, onUpdate}: Options<TResult> = {},
) {
  const [result, setResult] = useState<AsyncOperationResult<TResult>>({
    state: AsyncOperationState.Idle,
  });

  const callbacks = useCallback(
    (result: AsyncOperationResult<TResult>) => {
      setResult(result);
      if (onSucceeded && result.state === AsyncOperationState.Succeeded) {
        onSucceeded(result.result);
      }
      if (onUpdate) {
        onUpdate(result);
      }
    },
    [onSucceeded, onUpdate],
  );

  const execute = useCallback(
    (...args: TArgs) => {
      (async () => {
        try {
          callbacks({state: AsyncOperationState.Pending});
          const result = await func(...args);
          callbacks({state: AsyncOperationState.Succeeded, result});
        } catch (error) {
          callbacks({
            state: AsyncOperationState.Failed,
            error: Errors.errorify(error),
          });
        }
      })();
    },
    [callbacks, func],
  );

  const reset = useCallback(() => {
    callbacks({state: AsyncOperationState.Idle});
  }, [callbacks]);

  return {
    execute,
    result,
    reset,
  };
}
