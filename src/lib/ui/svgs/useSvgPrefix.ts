import {useCallback, useId} from 'react';

export function useSvgPrefix() {
  const uniquePrefix = useId();

  const prefix = useCallback(
    (id: string) => {
      return `${uniquePrefix}_${id}`;
    },
    [uniquePrefix]
  );

  return {prefix};
}
