import classNames from 'classnames';
import {buildGradientDirective} from '..';
import {PillProps} from './types';

export const SquareGradientPill = ({
                                     gradientName,
                                     children,
                                     className = 'w-12 h-12',
                                   }: PillProps) => {
  const gradient = gradientName ? buildGradientDirective(gradientName) : '';
  return (
    <div
      className={classNames(
        'rounded-md flex justify-center items-center',
        className,
        gradient
      )}
    >
      {children}
    </div>
  );
};
