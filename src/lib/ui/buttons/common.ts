import {ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren, ReactNode,} from 'react';

export type BaseButtonProps = {
  type?: ButtonHTMLAttributes<unknown>['type'];
  onClick?: MouseEventHandler<unknown>;
  disabled?: boolean;
  href?: string;
  block?: boolean;
} & BaseButtonValue;

export type BaseButtonValue = { value: string } | PropsWithChildren;

export function resolveButtonValue(props: BaseButtonProps): string | ReactNode {
  return areBaseButtonPropsWithChildren(props) ? props.children : props.value;
}

export function areBaseButtonPropsWithChildren(
  props: BaseButtonProps
): props is PropsWithChildren {
  return (props as Partial<PropsWithChildren>).children !== undefined;
}
