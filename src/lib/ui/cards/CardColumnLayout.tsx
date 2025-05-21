import classNames from 'classnames';
import {PropsWithChildren} from 'react';

type Props = PropsWithChildren<{ className?: string }>;

export function CardColumnLayout({children, className}: Props) {
  return (
    <div className={classNames('flex flex-col gap-8', className)}>
      {children}
    </div>
  );
}
