import {Pagination, PaginationProps} from './Pagination';
import {Trans, useTranslation} from "react-i18next";

type Props = Omit<PaginationProps, 'wording' | 'renderTitle'> & {
  i18nRowKindKey: string;
};

export function PaginationWrapper({i18nRowKindKey, ...props}: Props) {
  const {t} = useTranslation();
  return (
    <Pagination
      {...props}
      wording={{
        previous: t('pagination.previous'),
        next: t('pagination.next'),
        ellipsis: t('pagination.ellipsis'),
      }}
      renderTitle={({
                      formattedFirst,
                      formattedLast,
                      formattedRowsCount,
                      rowsCount,
                    }) => (
        <Trans
          i18nKey='pagination.cursor'
          values={{
            first: formattedFirst,
            last: formattedLast,
            rowsCount: formattedRowsCount,
            rowKind: t(i18nRowKindKey, {count: rowsCount}),
          }}
          components={[
            <span key='pagination-cursor' className='text-white'></span>,
          ]}
        />
      )}
    />
  );
}
