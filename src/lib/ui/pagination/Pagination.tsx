import {PaginationValue} from './paginationValue';
import classNames from 'classnames';
import {ReactNode} from 'react';
import {Pages, PaginationWording} from './elements';
import {computePaginationState, splitPagesToEllipsedGroups} from './pages';

export type OnPageChange = (pageNumber: number) => void;

export interface PaginationProps {
  pagination: PaginationValue;
  rowsCount: number;
  onPageChange: OnPageChange;
  disabled: boolean;
  wording: PaginationWording;
  renderTitle: RenderPaginationTitle;
  flexDirection?: 'row' | 'column';
}

interface PaginationContext {
  formattedFirst: string;
  formattedLast: string;
  rowsCount: number;
  formattedRowsCount: string;
}

export type RenderPaginationTitle = (context: PaginationContext) => ReactNode;

export function Pagination({
                             pagination,
                             rowsCount,
                             onPageChange,
                             disabled,
                             wording,
                             renderTitle,
                             flexDirection = 'row',
                           }: PaginationProps) {
  const [firstItem, lastItem, currentPage, numberOfPages] =
    computePaginationState(pagination, rowsCount);
  const [pagesStartRange, pagesMiddleRange, pagesEndRange] =
    splitPagesToEllipsedGroups(numberOfPages, currentPage);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < numberOfPages;
  const numberFormatter = new Intl.NumberFormat('en-US');
  return (
    <div
      className={classNames(
        'w-full flex items-center font-apercu-mono text-taupe-gray px-8 py-7 gap-4',
        {
          'justify-between': flexDirection === 'row',
          'flex-col justify-center': flexDirection === 'column',
        }
      )}
    >
      <div className={'whitespace-nowrap'}>
        {renderTitle({
          formattedFirst: numberFormatter.format(firstItem),
          formattedLast: numberFormatter.format(lastItem),
          formattedRowsCount: numberFormatter.format(rowsCount),
          rowsCount,
        })}
      </div>
      <Pages
        onPageChange={onPageChange}
        disabled={disabled}
        currentPage={currentPage}
        pagesEndRange={pagesEndRange}
        pagesStartRange={pagesStartRange}
        pagesMiddleRange={pagesMiddleRange}
        canGoPrevious={canGoPrevious}
        canGoNext={canGoNext}
        wording={wording}
      />
    </div>
  );
}
