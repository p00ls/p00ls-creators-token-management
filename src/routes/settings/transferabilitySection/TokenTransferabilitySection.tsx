import {SettingsSectionTitle} from '../SettingsSectionTitle';
import {ClosedToken} from './ClosedToken';
import {OpenToken} from './OpenToken';
import {useTranslation} from "react-i18next";
import {TokenContract} from "../../../lib/domain";
import {UseTokenAllowlist} from "../../../lib/tokens";

interface Props {
  token: TokenContract;
  useTokenAllowlist: UseTokenAllowlist;
}

export function TokenTransferabilitySection({
                                              token,
                                              useTokenAllowlist,
                                            }: Props) {
  const {t} = useTranslation();
  return (
    <div className={'flex flex-col gap-8'}>
      <SettingsSectionTitle>
        {t('settings.token-transferability-section.title')}
      </SettingsSectionTitle>
      <TransferabilityForL2Contract
        contract={token}
        useTokenAllowlist={useTokenAllowlist}
      />
    </div>
  );
}

interface TransferabilityForL2ContractProps {
  contract: TokenContract;
  useTokenAllowlist: UseTokenAllowlist;
}

function TransferabilityForL2Contract({
                                        contract,
                                        useTokenAllowlist,
                                      }: TransferabilityForL2ContractProps) {
  return contract.isOpened ? (
    <OpenToken/>
  ) : (
    <ClosedToken contract={contract} useTokenAllowlist={useTokenAllowlist}/>
  );
}
