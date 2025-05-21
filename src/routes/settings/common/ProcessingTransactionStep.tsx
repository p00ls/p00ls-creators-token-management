import {DurationSvg, P00lsGradientName, RoundIconPill} from '../../../lib/ui';
import {ReactNode} from 'react';
import {MainTitle} from './MainTitle';
import {useTranslation} from "react-i18next";
import {LoadingStateWrapper} from "../../../lib/states/LoadingStateWrapper";

interface Props {
  cta?: ReactNode;
}

export function ProcessingTransactionStep({cta}: Props) {
  const {t} = useTranslation();
  return (
    <div className='flex flex-col items-center'>
      <RoundIconPill
        Icon={DurationSvg}
        gradientName={P00lsGradientName.GRADIENT_01}
        className={'mb-8'}
      />
      <MainTitle>{t('settings.processing-transaction-step.title')}</MainTitle>
      <div className='mb-8'>
        <LoadingStateWrapper/>
      </div>
      {cta && <div>{cta}</div>}
    </div>
  );
}
