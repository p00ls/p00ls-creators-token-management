import classNames from 'classnames';
import {PropsWithChildren} from 'react';

type Variant = 'default' | 'error';

const variantClasses: Record<Variant, string> = {
  default: 'text-chinese-silver',
  error: 'text-maize',
};

type TextAlignVariant = 'left' | 'center';

const textAlignVariantClasses: Record<TextAlignVariant, string> = {
  left: 'text-left',
  center: 'text-center',
};

type Props = PropsWithChildren<{
  variant?: Variant;
  textAlign?: TextAlignVariant;
}>;

export function CardText({
                           children,
                           variant = 'default',
                           textAlign = 'left',
                         }: Props) {
  return (
    <div
      className={classNames(
        'text-lg font-apercu-mono',
        variantClasses[variant],
        textAlignVariantClasses[textAlign]
      )}
    >
      {children}
    </div>
  );
}
