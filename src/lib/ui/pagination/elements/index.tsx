import classNames from 'classnames';
import { MouseEventHandler, PropsWithChildren } from 'react';
import { OnPageChange } from '../Pagination';

interface Props {
  canGoPrevious: boolean;
  disabled: boolean;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  pagesStartRange: number[];
  pagesMiddleRange: number[];
  pagesEndRange: number[];
  canGoNext: boolean;
  wording: PaginationWording;
}

export interface PaginationWording {
  previous: string;
  next: string;
  ellipsis: string;
}

export function Pages({
  canGoPrevious,
  disabled,
  currentPage,
  onPageChange,
  pagesStartRange,
  pagesMiddleRange,
  pagesEndRange,
  canGoNext,
  wording,
}: Props) {
  return (
    <div className='flex gap-px'>
      <PageButton
        disabled={!canGoPrevious || disabled}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {wording.previous}
      </PageButton>
      {pagesStartRange.length ? (
        <PagesRange
          range={pagesStartRange}
          current={currentPage}
          ellipsis={'AFTER'}
          onPageChange={onPageChange}
          disabled={disabled}
          wording={wording}
        />
      ) : null}
      <PagesRange
        range={pagesMiddleRange}
        current={currentPage}
        onPageChange={onPageChange}
        disabled={disabled}
        wording={wording}
      />
      {pagesEndRange.length ? (
        <PagesRange
          range={pagesEndRange}
          current={currentPage}
          ellipsis={'BEFORE'}
          onPageChange={onPageChange}
          disabled={disabled}
          wording={wording}
        />
      ) : null}
      <PageButton
        disabled={!canGoNext || disabled}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {wording.next}
      </PageButton>
    </div>
  );
}

export function PagesRange({
  current,
  range,
  ellipsis,
  onPageChange,
  disabled,
  wording,
}: {
  range: number[];
  current: number;
  ellipsis?: 'BEFORE' | 'AFTER';
  onPageChange: OnPageChange;
  disabled: boolean;
  wording: PaginationWording;
}) {
  return (
    <>
      {ellipsis === 'BEFORE' ? <Ellipsis ellipsis={wording.ellipsis} /> : null}
      {range.map((page) => (
        <PageButton
          key={page}
          selected={current === page}
          onClick={() => onPageChange(page)}
          disabled={disabled}
        >
          {String(page).padStart(2, '0')}
        </PageButton>
      ))}
      {ellipsis === 'AFTER' ? <Ellipsis ellipsis={wording.ellipsis} /> : null}
    </>
  );
}

function Ellipsis({ ellipsis }: Pick<PaginationWording, 'ellipsis'>) {
  return <PageButton disabled={true}>{ellipsis}</PageButton>;
}

export function PageButton({
  children,
  onClick,
  selected = false,
  disabled = false,
}: PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
  disabled?: boolean;
}>) {
  return (
    <button
      type='button'
      disabled={disabled}
      className={classNames(
        'px-3.5 py-2.5',
        selected
          ? 'bg-electric-lime text-creator-black font-medium'
          : 'bg-chinese-black',
        { 'text-outer-space': disabled }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
