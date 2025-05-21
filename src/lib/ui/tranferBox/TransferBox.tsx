import {ArrowSvg} from '../svgs';
import {ReactNode} from 'react';

interface Props {
  from: ReactNode;
  fromDescription?: ReactNode;
  to: ReactNode;
  toDescription?: ReactNode;
}

export function TransferBox({
                              from,
                              fromDescription,
                              to,
                              toDescription,
                            }: Props) {
  return (
    <div
      className='border border-raisin-black pt-6 pb-7 px-4 flex items-center justify-between font-apercu-mono text-chinese-silver'>
      <div>
        <div className={'font-bold'}>{from}</div>
        <div>{fromDescription}</div>
      </div>
      <div
        className={'p-3 border border-raisin-black rounded-md bg-chinese-black'}
      >
        <ArrowSvg className={'w-5 h-5 text-white'}/>
      </div>
      <div className={'text-right'}>
        <div className={'font-bold'}>{to}</div>
        <div>{toDescription}</div>
      </div>
    </div>
  );
}
