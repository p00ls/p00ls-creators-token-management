import classNames from 'classnames';
import { createElement, PropsWithChildren } from 'react';

export type ColumnLayoutProps = PropsWithChildren<{
  as?: string;
  size?: SizeVariant;
  className?: string;
  padding?: boolean;
}>;

type SizeVariant = 'xs' | 'sm' | 'md' | 'lg';

const sizeVariantClasses: Record<SizeVariant, string> = {
  xs: 'sm:w-[320px]',
  sm: 'sm:w-[480px]',
  md: 'sm:w-[640px]',
  lg: 'sm:w-[720px]',
};

export function ColumnLayout({
  children,
  as = 'div',
  size = 'sm',
  padding = true,
  className,
}: ColumnLayoutProps) {
  return createElement(
    as,
    {
      className: classNames(
        'mx-auto w-full',
        sizeVariantClasses[size],
        { 'sm:pt-20 ': padding },
        className
      ),
    },
    children
  );
}
