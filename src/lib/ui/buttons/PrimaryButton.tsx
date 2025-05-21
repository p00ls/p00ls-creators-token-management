import classNames from 'classnames';
import {ForwardedRef, forwardRef, ReactNode} from 'react';
import {PrimaryButtonColor, primaryButtonThemes} from './buttonThemes';
import {BaseButtonProps, resolveButtonValue} from './common';

export const PrimaryButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(
  (
    {
      type = 'button',
      primaryButtonThemeName,
      block = false,
      size = 'm',
      ...props
    },
    ref
  ) => {
    const primaryButtonColorPreset =
      primaryButtonThemes[primaryButtonThemeName];
    const className = classNames(primaryButtonColorPreset.externalBackground, {
      'w-full block': block,
      'inline-block': !block,
      'opacity-60': props.disabled,
    });
    return (
      <button
        {...props}
        type={type}
        className={className}
        ref={ref as ForwardedRef<HTMLButtonElement>}
      >
        <InnerButton
          value={resolveButtonValue(props)}
          primaryButtonThemeName={primaryButtonThemeName}
          size={size}
          disabled={props.disabled || false}
        />
      </button>
    );
  }
);

export type ButtonSize = 'sm' | 'm' | 'l' | 'xl';
type ButtonProps = BaseButtonProps & {
  primaryButtonThemeName: PrimaryButtonColor;
  size?: ButtonSize;
};

function InnerButton({
                       primaryButtonThemeName,
                       size,
                       value,
                       disabled,
                     }: Pick<ButtonProps, 'primaryButtonThemeName'> & {
  size: ButtonSize;
  value: string | ReactNode;
  disabled: boolean;
}) {
  const primaryButtonColorPreset = primaryButtonThemes[primaryButtonThemeName];
  return (
    <div
      className={classNames(
        primaryButtonColorPreset.internalBackground,
        'flex items-center justify-center',
        {
          'px-8 py-5 text-3xl leading-8 tracking-widest': size === 'xl',
          'px-5 py-3 text-sm leading-3 tracking-widest h-16': size === 'l',
          'px-5 py-3 text-sm leading-3 tracking-widest': size === 'm',
          'px-3.5 py-2 text-sm leading-3 tracking-wider': size === 'sm',
        }
      )}
    >
      <span
        className={classNames(primaryButtonColorPreset.text, {
          'cursor-default': disabled,
        })}
      >
        {value}
      </span>
    </div>
  );
}

PrimaryButton.displayName = 'PrimaryButton';
