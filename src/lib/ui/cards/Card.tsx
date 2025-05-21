import classNames from 'classnames';
import {PropsWithChildren, useMemo} from 'react';

type SmallVariant = 'outlined' | 'contained' | 'none';

const smallVariantClasses: Record<SmallVariant, string> = {
  outlined: 'border border-raisin-black',
  contained: 'bg-chinese-black',
  none: '',
};

type Variant = 'outlined' | 'contained';

const variantClasses: Record<Variant, string> = {
  outlined: 'sm:border sm:border-raisin-black',
  contained: 'sm:bg-chinese-black',
};

interface Props {
  variant?: Variant;
  smallVariant?: SmallVariant;
  className?: string;
}

export function Card({
                       variant = 'contained',
                       smallVariant = variant,
                       className,
                       children,
                     }: PropsWithChildren<Props>) {
  return (
    <div
      className={classNames(
        'p-0 rounded-standard',
        variantClasses[variant],
        smallVariantClasses[smallVariant],
        className
      )}
    >
      {children}
    </div>
  );
}

type SizeVariant = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

const contentSizeVariantClasses: Record<SizeVariant, string> = {
  xxs: 'px-4 py-3',
  xs: 'px-6 py-8',
  sm: 'px-7 pt-5 pb-8',
  md: 'px-4 sm:px-10 sm:pt-12 sm:pb-20',
  lg: 'px-8 py-4 sm:px-28 sm:pt-12 sm:pb-20',
};

export function CardContent({
                              children,
                              size = 'sm',
                              grow = false,
                              className,
                            }: PropsWithChildren<{
  size?: SizeVariant;
  grow?: boolean;
  className?: string;
}>) {
  return (
    <div
      className={classNames(contentSizeVariantClasses[size], className, {
        'flex-1': grow,
      })}
    >
      {children}
    </div>
  );
}

const horizontalPaddingRemoverSizeVariantClasses: Record<SizeVariant, string> =
  {
    xxs: '-mx-4',
    xs: '-mx-6',
    sm: '-mx-7',
    md: '-mx-4 sm:-mx-10',
    lg: '-mx-8 sm:-mx-28',
  };

export function CardHorizontalPaddingRemover({
                                               children,
                                               size = 'sm',
                                             }: PropsWithChildren<{
  size?: SizeVariant;
}>) {
  return (
    <div className={horizontalPaddingRemoverSizeVariantClasses[size]}>
      {children}
    </div>
  );
}

export function CardSeparator() {
  return <hr className={'border-raisin-black sm:-mt-8 sm:-mb-2'}/>;
}

export function CardStepper({
                              steps,
                              currentStep,
                            }: {
  steps: number;
  currentStep: number;
}) {
  const stepTags = useMemo(() => Array.from({length: steps}), [steps]);
  const size = 100 / steps;

  return (
    <div className='flex flex-row'>
      {stepTags.map((_, index) => {
        const isFirst = index === 0;
        const isCurrent = index === currentStep;
        const isLast = index === steps - 1;
        const classes = classNames('h-1', {
          'rounded-tl-standard': isFirst,
          'rounded-tr-standard': isLast,
          'bg-electric-lime': isCurrent,
        });
        return (
          <div
            key={index}
            className={classes}
            style={{width: `${size}%`}}
          ></div>
        );
      })}
    </div>
  );
}
