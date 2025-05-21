import {ChainName, Chains} from '../../../lib/domain';
import {ErrorState, PrimaryButton} from '../../../lib/ui';
import {Trans, useTranslation} from "react-i18next";

interface Props {
  switchToNetwork: (chainId: number) => void;
  cancelHref?: string;
  onCancel?: () => void;
  targetChainName: ChainName;
}

export function WrongChainState({
                                  switchToNetwork,
                                  targetChainName,
                                  cancelHref,
                                  onCancel,
                                }: Props) {
  const {t} = useTranslation();

  return (
    <ErrorState
      title={t('settings.wrong-chain-state.title')}
      text={
        <Trans
          values={{
            target: Chains.getChainDisplayNameForName(targetChainName),
          }}
          i18nKey={'settings.wrong-chain-state.text'}
          components={{chain: <span className={'capitalize font-bold'}/>}}
        />
      }
      cta={
        <div className={'flex gap-4'}>
          <PrimaryButton
            href={cancelHref}
            onClick={onCancel}
            value={t('common.cancel')}
            primaryButtonThemeName={'outer-space'}
          />
          <PrimaryButton
            onClick={() =>
              switchToNetwork(Chains.getChainIdForName(targetChainName))
            }
            value={t('settings.wrong-chain-state.change-button')}
            primaryButtonThemeName={'electric-lime'}
          />
        </div>
      }
    />
  );
}
