import {ReactNode} from 'react';

export function Loading({
                          message,
                        }: {
  message?: ReactNode;
}) {
  return (
    <div className='flex flex-col gap-7 min-w-52'>
      {message && (
        <div className='font-du-bois text-electric-lime uppercase font-bold tracking-widest text-center'>
          {message}
        </div>
      )}
      <div className={'h-7 relative'}>
        <img
          src={`/loading.gif`}
          alt='loading bar'
          aria-hidden={true}
          className='object-contain'
        />
      </div>
    </div>
  );
}
