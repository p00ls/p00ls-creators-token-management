import { ReactNode } from 'react';
import { Loading } from '../spinner';
import { LayoutVariant, State } from './State';

interface Props {
  assetsBaseUrl: string;
  message?: ReactNode;
  layoutVariant?: LayoutVariant;
}

export function LoadingState({ assetsBaseUrl, message, layoutVariant }: Props) {
  return (
    <State layoutVariant={layoutVariant}>
      <Loading assetsBaseUrl={assetsBaseUrl} message={message} />
    </State>
  );
}
