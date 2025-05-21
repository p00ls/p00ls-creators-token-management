import classNames from 'classnames';
import {PropsWithChildren} from 'react';
import {buildGradientDirective, P00lsGradientName} from '../colors';

export function GradientText({
                               gradientName,
                               children,
                               className,
                             }: PropsWithChildren<{ gradientName: P00lsGradientName; className?: string }>) {
  return (
    <span
      className={classNames(
        'bg-clip-text text-transparent',
        buildGradientDirective(gradientName),
        className
      )}
    >
      {children}
    </span>
  );
}
