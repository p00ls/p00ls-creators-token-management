import {CheckSvg, ColumnLayout, P00lsGradientName, PrimaryButton, RoundIconPill,} from '../../../lib/ui';
import {MainTitle} from '../common';
import {useTranslation} from "react-i18next";
import {appRoutes} from "../../routing";

export function OpenTokenState() {
  const {t} = useTranslation();
  return (
    <ColumnLayout size={'md'}>
      <div className='flex flex-col items-center'>
        <RoundIconPill
          Icon={CheckSvg}
          gradientName={P00lsGradientName.GRADIENT_01}
          className={'mb-8'}
        />
        <MainTitle>{t('settings.open-token-state.title')}</MainTitle>
        <div>
          <PrimaryButton
            href={appRoutes.settings}
            value={t('settings.go-to-settings-button')}
            primaryButtonThemeName={'electric-lime'}
          />
        </div>
      </div>
    </ColumnLayout>
  );
}
