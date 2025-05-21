import { forwardRef, MouseEventHandler, PropsWithChildren } from 'react';
import { Link } from "react-router";

function isAbsolute(url: string): boolean {
  return /^[a-zA-Z][a-zA-Z\d+\-.]*?:/.test(url);
}

export type VersatileLinkProps = PropsWithChildren<{
  onClick?: MouseEventHandler<unknown>;
  disabled?: boolean;
  href?: string;
  className?: string;
  title?: string;
  external?: 'auto' | true | false;
  newTab?: 'auto' | true | false;
  replace?: boolean;
}>;

export const VersatileLink = forwardRef<HTMLAnchorElement, VersatileLinkProps>(
  (
    {
      external = 'auto',
      newTab = 'auto',
      replace,
      ...props
    }: VersatileLinkProps,
    ref
  ) => {
    const { href, disabled } = props;
    if (disabled) {
      return <div {...props} />;
    }

    const shouldBeExternal = determineIfShouldBeExternal();
    const shouldOpenNewTab = determineIfShouldOpenNewTab();
    const target = shouldOpenNewTab ? '_blank' : undefined;

    if (shouldBeExternal) {
      return (
        <a {...props} target={target} ref={ref} rel='noopener noreferrer'>
          {props.children || ''}
        </a>
      );
    }

    return (
      <Link
        {...props}
        ref={ref}
        target={target}
        replace={replace}
        to={href || ''}
      />
    );

    function determineIfShouldBeExternal() {
      return external === 'auto'
        ? href === undefined || isAbsolute(href)
        : external;
    }

    function determineIfShouldOpenNewTab() {
      return newTab === 'auto' ? shouldBeExternal : newTab;
    }
  }
);

VersatileLink.displayName = 'VersatileLink';
