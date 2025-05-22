export const Arrays = {
  haveCommonElements,
  difference,
  findDuplicates,
  removeDuplicates,
  shuffle,
  range,
  chunk,
};

function haveCommonElements(left: unknown[], right: unknown[]): boolean {
  for (const element of left) {
    if (right.includes(element)) {
      return true;
    }
  }
  return false;
}

function difference<T>(left: T[], right: T[]): T[] {
  return right.filter((x) => !left.includes(x));
}

function findDuplicates<T>(array: T[]): T[] {
  const mappedDuplicates = array.reduce((acc, val) => {
    acc.has(val) ? acc.set(val, acc.get(val) + 1) : acc.set(val, 1);
    return acc;
  }, new Map());
  return [...mappedDuplicates.entries()].reduce((acc, val) => {
    if (val[1] > 1) {
      acc.push(val[0]);
    }
    return acc;
  }, [] as T[]);
}

function removeDuplicates<T>(array: T[]): T[] {
  return [...new Set(array)];
}

function shuffle<T>(array: T[]): T[] {
  const result = array.slice();
  let i = result.length;
  while (--i > 0) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [result[randIndex], result[i]] = [result[i], result[randIndex]];
  }
  return result;
}

function range(end: number) {
  return [...Array(end).keys()];
}

function chunk<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}
