import {Addresses, HexString} from '../../../lib/domain';
import {ErrorState, PrimaryButton} from '../../../lib/ui';
import {useTranslation} from "react-i18next";

interface Props {
  disconnectFromWallet: () => void;
  currentAddress: HexString;
  ownerAddress: HexString;
  cancelHref?: string;
  onCancel?: () => void;
}

export function NotOwnerState({
                                disconnectFromWallet,
                                currentAddress,
                                ownerAddress,
                                cancelHref,
                                onCancel,
                              }: Props) {
  const {t} = useTranslation();

  return (
    <ErrorState
      title={t('settings.not-owner-state.title')}
      text={t('settings.not-owner-state.text', {
        currentAddress: Addresses.truncate(currentAddress),
        ownerAddress: Addresses.truncate(ownerAddress),
      })}
      cta={
        <div className={'flex gap-4'}>
          <PrimaryButton
            href={cancelHref}
            onClick={onCancel}
            value={t('common.cancel')}
            primaryButtonThemeName={'outer-space'}
          />
          <PrimaryButton
            onClick={disconnectFromWallet}
            value={t('settings.not-owner-state.change-wallet-button')}
            primaryButtonThemeName={'electric-lime'}
          />
        </div>
      }
    />
  );
}
