import {PropsWithChildren} from 'react';

export function MainTitle({children}: PropsWithChildren) {
  return (
    <div className='font-apercu-mono font-bold text-3xl text-center text-white mb-8'>
      {children}
    </div>
  );
}
