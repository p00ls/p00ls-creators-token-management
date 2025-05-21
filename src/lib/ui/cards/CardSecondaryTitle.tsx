import {PropsWithChildren} from 'react';

export function CardSecondaryTitle({children}: PropsWithChildren) {
  return (
    <div className={'font-apercu-mono font-bold text-2xl text-white'}>
      {children}
    </div>
  );
}
