import {Card, CardContent} from './Card';
import {InfoSvg} from '../svgs';
import {GradientText} from '../text';
import {P00lsGradientName} from '../colors';
import {PropsWithChildren, ReactNode} from 'react';

interface Props {
  title: string;
  content: ReactNode;
}

export function InfoCard({
                           title,
                           content,
                           children,
                         }: PropsWithChildren<Props>) {
  return (
    <Card className={'font-apercu-mono'}>
      <CardContent size={'sm'}>
        <div className='font-bold mb-2.5 whitespace-nowrap flex gap-4 items-center'>
          <div
            className={
              'w-8 h-8 rounded-full flex flex-col justify-center items-center'
            }
          >
            <InfoSvg
              gradientName={P00lsGradientName.GRADIENT_01}
              className={'w-4 h-4'}
            />
          </div>
          <GradientText gradientName={P00lsGradientName.GRADIENT_01}>
            {title}
          </GradientText>
        </div>
        <div className='text-justify'>{content}</div>
        {children && <div className='mt-3'>{children}</div>}
      </CardContent>
    </Card>
  );
}
