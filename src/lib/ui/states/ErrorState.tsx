import { ReactNode } from 'react';
import { iconColorPresets } from '../colors';
import { WarningSvg } from '../svgs';
import { EmptyState } from './EmptyState';
import { LayoutVariant } from './State';

export interface ErrorStateProps {
  title: ReactNode;
  text?: ReactNode;
  layoutVariant?: LayoutVariant;
  cta?: ReactNode;
}

export function ErrorState({
  title,
  text,
  layoutVariant,
  cta,
}: ErrorStateProps) {
  return (
    <EmptyState
      icon={WarningSvg}
      iconColor={iconColorPresets['electric-lime']}
      title={title}
      text={text}
      cta={cta}
      layoutVariant={layoutVariant}
    />
  );
}
