import { Functions } from './functions';
import { CheckSvg, CopySvg } from '../svgs';
import classNames from 'classnames';
import {
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

type SizeVariant = 'sm' | 'md';

const sizeVariantIconClasses: Record<SizeVariant, string> = {
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
};

type Props = PropsWithChildren<{
  value: string;
  className?: string;
  size?: SizeVariant;
}>;

export function CopyToClipboardButton({
  value,
  className,
  size = 'md',
  children,
}: Props) {
  return (
    <WithCopyToClipboard
      value={value}
      render={({ onClick, copying }) => (
        <div
          className={classNames('inline-block cursor-pointer', className)}
          onClick={onClick}
        >
          {children ||
            (copying ? (
              <CheckSvg
                className={classNames(
                  sizeVariantIconClasses[size],
                  'text-electric-lime'
                )}
              />
            ) : (
              <CopySvg className={sizeVariantIconClasses[size]} />
            ))}
        </div>
      )}
    />
  );
}

interface WithCopyToClipboardProps {
  value: string;
  render: (props: { onClick: () => void; copying: boolean }) => ReactNode;
}

export function WithCopyToClipboard({
  value,
  render,
}: WithCopyToClipboardProps) {
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    if (!copying) {
      return;
    }
    const timeout = setTimeout(() => setCopying(false), 1000);
    return () => clearTimeout(timeout);
  }, [copying]);

  const onClick = useCallback(() => {
    setCopying(true);
    navigator.clipboard.writeText(value).catch(Functions.noop);
  }, [value]);

  return render({ onClick, copying });
}
