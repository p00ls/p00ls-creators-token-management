import {LockedSvg, PrimaryButton} from '../../../lib/ui';
import {OpennessRow} from './OpennessRow';
import {TokenAllowlist} from './TokenAllowlist';
import {useTranslation} from "react-i18next";
import {TokenContract} from "../../../lib/domain";
import {UseTokenAllowlist} from "../../../lib/tokens";
import {appRoutes} from "../../routing";

interface Props {
  contract: TokenContract;
  useTokenAllowlist: UseTokenAllowlist;
}

export function ClosedToken({useTokenAllowlist, contract}: Props) {
  const {t} = useTranslation();
  return (
    <div className={'flex flex-col gap-5'}>
      <OpennessRow
        Icon={LockedSvg}
        title={t('settings.token-transferability-section.closed-token.title')}
        description={t(
          'settings.token-transferability-section.closed-token.description'
        )}
        cta={
          <PrimaryButton
            href={appRoutes.changeTransferability}
            value={t(
              'settings.token-transferability-section.closed-token.change-button'
            )}
            primaryButtonThemeName={'electric-lime'}
          />
        }
      />
      <TokenAllowlist
        useTokenAllowlist={useTokenAllowlist}
        contract={contract}
      />
    </div>
  );
}
