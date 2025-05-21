import {P00lsGradientName, RoundIconPill, SvgProps} from '../../../lib/ui';
import {ReactNode} from 'react';

interface Props {
  Icon: (props: SvgProps) => ReactNode;
  title: string;
  description: string;
  cta?: ReactNode;
}

export function OpennessRow({Icon, title, description, cta}: Props) {
  return (
    <div className={'flex items-center gap-5'}>
      <RoundIconPill
        Icon={Icon}
        backgroundColor={'electric-lime'}
        bordered={false}
        gradientName={P00lsGradientName.GRADIENT_01}
      />
      <div className={'flex flex-col gap-1.5 flex-1'}>
        <div className={'font-apercu-mono font-bold text-white'}>{title}</div>
        <div className={'font-apercu-mono font-bold text-taupe-gray'}>
          {description}
        </div>
      </div>
      {cta && <div>{cta}</div>}
    </div>
  );
}
