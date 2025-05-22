import {PaginationValue} from './paginationValue';

export function computePaginationState(
  pagination: PaginationValue,
  rowsCount: number
) {
  const numberOfPages = Math.ceil(rowsCount / pagination.pageSize);
  const cappedCurrentPage = Math.max(
    Math.min(pagination.page, numberOfPages),
    1
  );
  const firstItem = rowsCount
    ? (cappedCurrentPage - 1) * pagination.pageSize + 1
    : 0;
  const lastItem = Math.min(firstItem + pagination.pageSize - 1, rowsCount);
  return [firstItem, lastItem, cappedCurrentPage, numberOfPages];
}

export function splitPagesToEllipsedGroups(
  numberOfPages: number,
  currentPage: number
) {
  function getRange(begin: number, end: number): number[] {
    const range = [];
    for (let i = begin; i < end; i++) {
      range.push(i);
    }
    return range;
  }

  const countAtTheEdge = 5;
  // equals number of pages seen at the edge + the … + the last item
  const thresholdForEllipsis = countAtTheEdge + 2;
  if (numberOfPages <= thresholdForEllipsis) {
    return [[], getRange(1, numberOfPages + 1), []];
  }
  if (currentPage < countAtTheEdge) {
    return [[], getRange(1, countAtTheEdge + 1), [numberOfPages]];
  }
  if (currentPage > numberOfPages - countAtTheEdge + 1) {
    return [
      [1],
      getRange(numberOfPages - countAtTheEdge + 1, numberOfPages + 1),
      [],
    ];
  }
  return [[1], getRange(currentPage - 1, currentPage + 2), [numberOfPages]];
}
