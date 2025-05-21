import { Numbers } from '@p00ls/tools';
import { EditSvg, Spinner, VersatileLink } from '../../../lib/ui';
import { Routing } from '../../../../../iso';
import {
  QueryResultPresenterWrapper,
  UseTokenAllowlist,
} from '../../../../features';
import {TokenContract} from "../../../lib/domain";
import {useTranslation} from "react-i18next";

interface Props {
  contract: TokenContract;
  useTokenAllowlist: UseTokenAllowlist;
}

export function TokenAllowlist({ useTokenAllowlist, contract }: Props) {
  const { t } = useTranslation();
  const { result: allowlistResult } = useTokenAllowlist({ contract });
  return (
    <div className={'flex flex-col gap-6'}>
      <div className={'flex items-center justify-between'}>
        <div
          className={
            'font-apercu-mono text-chinese-silver pt-1.5 pb-2 pl-6 border-l border-raisin-black'
          }
        >
          {t(
            'settings.token-transferability-section.closed-token.allowlist-label'
          )}
        </div>
        <div className={'flex gap-2'}>
          <QueryResultPresenterWrapper
            result={allowlistResult}
            empty={() => <AllowlistedAddressesCount count={0} />}
            success={(result) => (
              <AllowlistedAddressesCount count={result.length} />
            )}
            loading={() => <Spinner />}
          />
          <VersatileLink href={Routing.getManageTokenAllowlist()}>
            <EditSvg className={'text-spanish-gray w-5 h-5'} />
          </VersatileLink>
        </div>
      </div>
    </div>
  );
}

interface AllowlistedAddressesCountProps {
  count: number;
}

function AllowlistedAddressesCount({ count }: AllowlistedAddressesCountProps) {
  const { t } = useTranslation();
  return (
    <div className={'font-apercu-mono font-bold text-spanish-gray'}>
      {t(
        'settings.token-transferability-section.closed-token.allowlisted-addresses-value',
        {
          value: Numbers.formatNumber(count),
          count,
        }
      )}
    </div>
  );
}
