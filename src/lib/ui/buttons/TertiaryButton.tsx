import classNames from 'classnames';
import {ForwardedRef, forwardRef, ReactNode} from 'react';
import {TertiaryButtonColor, tertiaryButtonThemes} from './buttonThemes';
import {BaseButtonProps, resolveButtonValue} from './common';

type ButtonProps = BaseButtonProps & {
  tertiaryButtonThemeName: TertiaryButtonColor;
  icon?: ReactNode;
};

export const TertiaryButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(
  (
    {
      type = 'button',
      tertiaryButtonThemeName,
      icon,
      block = false,
      ...props
    },
    ref
  ) => {
    const tertiaryButtonTheme = tertiaryButtonThemes[tertiaryButtonThemeName];
    const className = classNames('group', tertiaryButtonTheme.text, {
      'w-full block': block,
      'inline-block': !block,
      'opacity-60': props.disabled,
    });
    return (
      <button
        {...props}
        type={type}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        className={className}
      >
        <InnerButton icon={icon} value={resolveButtonValue(props)}/>
      </button>
    );
  }
);

function InnerButton({
                       icon,
                       value,
                     }: {
  icon: ReactNode | undefined;
  value: string | ReactNode;
}) {
  return (
    <div className={classNames('inline-flex gap-x-2 align-middle')}>
      {icon && <span aria-hidden>{icon}</span>}
      {value && <span>{value}</span>}
    </div>
  );
}

TertiaryButton.displayName = 'TertiaryButton';
