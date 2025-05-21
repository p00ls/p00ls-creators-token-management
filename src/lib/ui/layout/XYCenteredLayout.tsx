import classNames from 'classnames';
import { createElement, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{ as?: string; className?: string }>;

export function XYCenteredLayout({ children, as = 'div', className }: Props) {
  return createElement(
    as,
    {
      className: classNames(
        'h-full flex justify-center items-center',
        className
      ),
    },
    children
  );
}
