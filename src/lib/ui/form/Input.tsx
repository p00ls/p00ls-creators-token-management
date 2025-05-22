import {SvgProps} from '../svgs';
import classNames from 'classnames';
import {createElement, forwardRef, InputHTMLAttributes, MouseEventHandler, ReactNode,} from 'react';
import {FormStyles} from './formStyles';
import {Label} from './Label';

export type InputIconSize = 'sm' | 'md' | 'lg';

type Props = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'name'
  | 'type'
  | 'placeholder'
  | 'className'
  | 'defaultValue'
  | 'disabled'
  | 'size'
  | 'step'
  | 'readOnly'
  | 'onBlur'
  | 'onKeyUp'
  | 'autoCorrect'
  | 'autoComplete'
  | 'onChange'
  | 'value'
> & {
  id: string;
  label?: ReactNode;
  icon?: (props: SvgProps) => ReactNode;
  iconAlignment?: 'left' | 'right';
  iconSize?: InputIconSize;
  onIconClick?: MouseEventHandler<unknown>;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      icon,
      iconAlignment = 'left',
      iconSize = 'sm',
      onIconClick,
      label,
      type = 'text',
      className,
      ...inputProps
    },
    ref
  ) => (
    <div
      className={classNames({
        'rounded-md shadow-sm': !!icon,
      })}
    >
      <Label
        htmlFor={inputProps.id}
        className={classNames({'sr-only': !label})}
      >
        {label}
      </Label>
      <div className={classNames({'mt-5': label})}>
        <div className='relative'>
          {icon ? (
            <InputIcon
              icon={icon}
              iconSize={iconSize}
              iconAlignment={iconAlignment}
              onClick={onIconClick}
            />
          ) : null}
          <input
            ref={ref}
            type={type}
            {...inputProps}
            className={classNames(FormStyles.input, className, {
              'pl-10': icon && iconSize === 'sm' && iconAlignment === 'left',
              'pl-12': icon && iconSize === 'md' && iconAlignment === 'left',
              'pl-14': icon && iconSize === 'lg' && iconAlignment === 'left',
              'pr-10': icon && iconSize === 'sm' && iconAlignment === 'right',
              'pr-12': icon && iconSize === 'md' && iconAlignment === 'right',
              'pr-14': icon && iconSize === 'lg' && iconAlignment === 'right',
            })}
          />
        </div>
      </div>
    </div>
  )
);

function InputIcon({
                     icon,
                     iconSize,
                     iconAlignment,
                     onClick,
                   }: Required<Pick<Props, 'icon' | 'iconSize' | 'iconAlignment'>> & {
  onClick?: MouseEventHandler<unknown>;
}) {
  return (
    <div
      className={classNames('absolute inset-y-0 flex items-center', {
        'left-0 pl-4': iconAlignment === 'left',
        'right-0 pr-4': iconAlignment === 'right',
        'pointer-events-none': onClick === undefined,
        'cursor-pointer': onClick !== undefined,
      })}
      onClick={onClick}
    >
      {createElement(icon, {
        className: classNames('text-white', {
          'h-3.5 w-3.5 ': iconSize === 'sm',
          'h-5 w-5 ': iconSize === 'md',
          'h-6 w-6 ': iconSize === 'lg',
        }),
        'aria-hidden': true,
      })}
    </div>
  );
}

Input.displayName = 'Input';
