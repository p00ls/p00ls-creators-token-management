import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export type LayoutVariant =
  | 'parent-x-centered-y-offset'
  | 'auto'
  | 'parent-xy-centered';

const containerLayoutVariantClasses: Record<LayoutVariant, string> = {
  auto: '',
  'parent-x-centered-y-offset': 'h-full flex flex-col',
  'parent-xy-centered': 'h-full flex flex-col justify-center',
};

const spacerLayoutVariantClasses: Record<LayoutVariant, string> = {
  auto: '',
  'parent-x-centered-y-offset': 'flex-1',
  'parent-xy-centered': '',
};

const contentLayoutVariantClasses: Record<LayoutVariant, string> = {
  auto: '',
  'parent-x-centered-y-offset': 'flex-3',
  'parent-xy-centered': '',
};

export function State({
  children,
  layoutVariant = 'parent-x-centered-y-offset',
}: PropsWithChildren<{
  layoutVariant?: LayoutVariant;
}>) {
  return (
    <div className={classNames(containerLayoutVariantClasses[layoutVariant])}>
      <div className={classNames(spacerLayoutVariantClasses[layoutVariant])} />
      <div className={contentLayoutVariantClasses[layoutVariant]}>
        <div className={'flex p-2 sm:p-7 items-center justify-center w-full'}>
          {children}
        </div>
      </div>
    </div>
  );
}
