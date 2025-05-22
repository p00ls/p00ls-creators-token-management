import {MutableRefObject} from 'react';
import {Addresses, HexString} from "../../../../lib/domain";
import {useTranslation} from "react-i18next";
import {PrimaryButton} from "../../../../lib/ui";

interface Props {
  addressToAdd: HexString;
  onConfirm: () => void;
  onCancel: () => void;
  mainFocusableButtonRef: MutableRefObject<HTMLButtonElement | null>;
}

export function ConfirmAddToTokenAllowlistStep({
                                                 addressToAdd,
                                                 onConfirm,
                                                 onCancel,
                                                 mainFocusableButtonRef,
                                               }: Props) {
  const {t} = useTranslation();
  return (
    <div className={'flex flex-col items-center justify-center gap-24'}>
      <div className={'font-apercu-mono text-center'}>
        <div className={'mb-8 font-bold text-3xl text-white'}>
          {t('settings.manage-allowlist-page.add-confirmation-text', {
            address: Addresses.truncate(addressToAdd),
          })}
        </div>
        <div className={'text-xl text-chinese-silver'}>
          {t('settings.manage-allowlist-page.add-confirmation-subtext')}
        </div>
      </div>
      <div className={'flex gap-4'}>
        <PrimaryButton
          value={t('common.cancel')}
          primaryButtonThemeName={'outer-space'}
          onClick={onCancel}
        />
        <PrimaryButton
          value={t('settings.manage-allowlist-page.add-confirmation-button')}
          primaryButtonThemeName={'electric-lime'}
          onClick={onConfirm}
          ref={mainFocusableButtonRef}
        />
      </div>
    </div>
  );
}
