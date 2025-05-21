export const Functions = {
  noop,
  memoize,
};

function noop() {
  return;
}

function memoize<TResult, TArgs extends unknown[]>(
  func: (...args: TArgs) => TResult
) {
  const cache: Record<string, TResult> = {};

  return (...args: TArgs) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = func(...args);
    cache[key] = result;
    return result;
  };
}
