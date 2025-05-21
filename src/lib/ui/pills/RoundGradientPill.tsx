import classNames from 'classnames';
import {buildGradientDirective} from '../colors';
import {PillProps} from './types';

export function RoundGradientPill({
                                    gradientName,
                                    className = 'w-11 h-11',
                                    icon,
                                  }: PillProps) {
  const gradient = gradientName ? buildGradientDirective(gradientName) : '';
  return (
    <div
      className={classNames(
        'rounded-full flex flex-col items-center justify-center',
        gradient,
        className
      )}
    >
      {icon}
    </div>
  );
}
