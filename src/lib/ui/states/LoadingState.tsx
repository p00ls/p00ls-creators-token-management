import { ReactNode } from 'react';
import { Loading } from '../spinner';
import { LayoutVariant, State } from './State';

interface Props {
  message?: ReactNode;
  layoutVariant?: LayoutVariant;
}

export function LoadingState({ message, layoutVariant }: Props) {
  return (
    <State layoutVariant={layoutVariant}>
      <Loading message={message} />
    </State>
  );
}
