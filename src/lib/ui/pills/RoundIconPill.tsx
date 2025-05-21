import {SvgProps} from '../svgs';
import {P00lsGradientName} from '../colors';
import classNames from 'classnames';
import {ReactNode} from 'react';

type Size = 'md' | 'lg';

type BackgroundColor = 'none' | 'electric-lime';

interface Props {
  Icon: (p: SvgProps) => ReactNode;
  gradientName: P00lsGradientName;
  backgroundColor?: BackgroundColor;
  bordered?: boolean;
  className?: string;
  size?: Size;
}

const backgroundColorVariantClases: Record<BackgroundColor, string> = {
  none: '',
  'electric-lime': 'bg-electric-lime',
};

const containerSizeVariantClases: Record<Size, string> = {
  md: 'p-3.5',
  lg: 'p-10',
};

const iconSizeVariantClases: Record<Size, string> = {
  md: 'w-7 h-7',
  lg: 'w-10 h-10',
};

export function RoundIconPill({
                                Icon,
                                gradientName,
                                bordered = true,
                                backgroundColor = 'none',
                                size = 'md',
                                className,
                              }: Props) {
  return (
    <div
      className={classNames(
        'rounded-full',
        containerSizeVariantClases[size],
        {
          'border border-dark-charcoal': bordered,
          'bg-opacity-10': !!backgroundColor,
        },
        backgroundColorVariantClases[backgroundColor],
        className
      )}
    >
      <Icon
        gradientName={gradientName}
        className={iconSizeVariantClases[size]}
      />
    </div>
  );
}
