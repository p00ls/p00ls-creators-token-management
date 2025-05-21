import classNames from 'classnames';
import { ReactNode } from 'react';
import { IconColorPreset, iconColorPresets } from '../colors';
import { SvgProps } from '../svgs';
import { LayoutVariant, State } from './State';

interface Props {
  iconColor?: IconColorPreset;
  icon: (p: SvgProps) => ReactNode;
  title: ReactNode;
  text?: ReactNode;
  cta?: ReactNode;
  layoutVariant?: LayoutVariant;
}

export function EmptyState({
  iconColor = iconColorPresets['electric-lime'],
  title,
  text,
  cta,
  icon: Icon,
  layoutVariant,
}: Props) {
  return (
    <State layoutVariant={layoutVariant}>
      <div className='flex flex-col items-center'>
        <div className='p-10 rounded-full border border-dark-charcoal mb-8'>
          <Icon className={classNames('w-[30px] h-[30px]', iconColor.color)} />
        </div>
        <div className='font-apercu-mono font-bold text-2xl text-center text-white mb-7'>
          {title}
        </div>
        {text && (
          <div className='font-apercu-mono font-light text-center mb-12'>
            {text}
          </div>
        )}
        {cta && <div className='font-sm'>{cta}</div>}
      </div>
    </State>
  );
}
