import {
  buildGradientDirective,
  ColumnLayout,
  GradientText,
  P00lsGradientName,
  PrimaryButton,
  RoundIconPill,
  TransferBox,
  WarningSvg,
} from '../../../lib/ui';
import classNames from 'classnames';
import {MainTitle} from '../common';
import {useConfirmChangeForm} from './useConfirmChangeForm';
import {appRoutes} from "../../routing";
import {useTranslation} from "react-i18next";
import {Checkbox} from "../../../lib/ui/form";

interface Props {
  onConfirm: () => void;
  confirmReady: boolean;
}

export function ConfirmChangeTransferabilityStep({
                                                   onConfirm,
                                                   confirmReady,
                                                 }: Props) {
  return (
    <>
      <MainContent/>
      <Footer onConfirm={onConfirm} confirmReady={confirmReady}/>
    </>
  );
}

function MainContent() {
  const {t} = useTranslation();
  return (
    <div className={'flex-1 overflow-y-auto'}>
      <ColumnLayout size={'md'}>
        <div className='flex flex-col items-center'>
          <RoundIconPill
            Icon={WarningSvg}
            gradientName={P00lsGradientName.GRADIENT_01}
            className={'mb-8'}
          />
          <MainTitle>{t('settings.change-transferability.title')}</MainTitle>
          <div
            className={classNames(
              'rounded p-px mb-10',
              buildGradientDirective(P00lsGradientName.GRADIENT_01)
            )}
          >
            <div className={'rounded-sm px-4 py-2.5 bg-creator-black'}>
              <GradientText
                gradientName={P00lsGradientName.GRADIENT_01}
                className={'font-apercu-mono font-light'}
              >
                {t('settings.change-transferability.warning-text')}
              </GradientText>
            </div>
          </div>
          <div className={'font-apercu-mono font-bold text-white mb-3'}>
            {t('settings.change-transferability.change-title')}
          </div>
          <div className='w-2/3'>
            <TransferBox
              from={t('settings.change-transferability.limited-label')}
              fromDescription={t(
                'settings.change-transferability.limited-sublabel'
              )}
              to={t('settings.change-transferability.full-label')}
              toDescription={t('settings.change-transferability.full-sublabel')}
            />
          </div>
        </div>
      </ColumnLayout>
    </div>
  );
}

function Footer({onConfirm, confirmReady}: Props) {
  const {
    confirmationChecked,
    setConfirmationChecked,
    toggleConfirmationChecked,
  } = useConfirmChangeForm();
  const {t} = useTranslation();
  return (
    <div className={'border-t border-raisin-black pt-6 pb-16'}>
      <ColumnLayout size={'md'} padding={false}>
        <div className='mb-8 flex gap-7'>
          <div>
            <Checkbox
              checked={confirmationChecked}
              onChange={setConfirmationChecked}
              shape={'square'}
              checkedGradient={P00lsGradientName.GRADIENT_01}
            />
          </div>
          <div
            onClick={toggleConfirmationChecked}
            className={'font-apercu-mono cursor-default'}
          >
            <div className={'font-bold text-white'}>
              {t('settings.change-transferability.confirm-label')}
            </div>
            <div className={'text-chinese-silver'}>
              {t('settings.change-transferability.confirm-sublabel')}
            </div>
          </div>
        </div>
        <div className={'flex gap-4'}>
          <PrimaryButton
            href={appRoutes.settings}
            value={t('common.cancel')}
            primaryButtonThemeName={'outer-space'}
            block={true}
          />
          <PrimaryButton
            onClick={onConfirm}
            disabled={!confirmationChecked || !confirmReady}
            value={t('settings.change-transferability.request-button')}
            primaryButtonThemeName={'electric-lime'}
            block={true}
          />
        </div>
      </ColumnLayout>
    </div>
  );
}
