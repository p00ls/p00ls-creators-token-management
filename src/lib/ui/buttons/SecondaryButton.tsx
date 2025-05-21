import classNames from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { VersatileLink } from '../routing';
import { SecondaryButtonColor, secondaryButtonThemes } from './buttonThemes';
import { BaseButtonProps, resolveButtonValue } from './common';

type ButtonProps = BaseButtonProps & {
  secondaryButtonThemeName: SecondaryButtonColor;
};

export const SecondaryButton = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(
  (
    { type = 'button', secondaryButtonThemeName, href, block, ...props },
    ref
  ) => {
    const secondaryButtonColorPreset =
      secondaryButtonThemes[secondaryButtonThemeName];

    const className = classNames(
      'justify-center',
      secondaryButtonColorPreset.background,
      {
        'w-full block': block,
        'inline-block': !block,
        'opacity-60': props.disabled,
      }
    );
    if (href) {
      return (
        <VersatileLink
          {...props}
          href={href}
          className={className}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
        >
          <span className={secondaryButtonColorPreset.text}>
            {resolveButtonValue(props)}
          </span>
        </VersatileLink>
      );
    }
    return (
      <button
        {...props}
        type={type}
        className={className}
        ref={ref as ForwardedRef<HTMLButtonElement>}
      >
        <span className={secondaryButtonColorPreset.text}>
          {resolveButtonValue(props)}
        </span>
      </button>
    );
  }
);

SecondaryButton.displayName = 'SecondaryButton';
