import classNames from 'classnames';
import {LabelHTMLAttributes, PropsWithChildren} from 'react';

export enum LabelVariants {
  DEFAULT = 'Default',
  CAPITALIZE = 'Capitalize',
}

type Props = PropsWithChildren<
  Pick<LabelHTMLAttributes<HTMLLabelElement>, 'htmlFor' | 'className'> & {
  variant?: LabelVariants;
}
>;

export function Label({
                        children,
                        className,
                        variant = LabelVariants.DEFAULT,
                        ...labelProps
                      }: Props) {
  return (
    <label
      {...labelProps}
      className={classNames(
        'font-du-bois font-bold text-granite-gray tracking-widest',
        className,
        {
          uppercase: variant === LabelVariants.DEFAULT,
          capitalize: variant === LabelVariants.CAPITALIZE,
        }
      )}
    >
      {children}
    </label>
  );
}
