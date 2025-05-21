import {ExitSvg, VersatileLink} from '../../../lib/ui';
import {UseWallet, useWallet as defaultUseWallet} from '@p00ls/wallet';
import {
  useOpenToken as defaultUseOpenToken,
  UseOpenToken,
  useTokenOwner as defaultUseTokenOwner,
  UseTokenOwner,
} from '../../../features';
import {OpenTokenState} from '../common';
import {ChangeTransferabilitySteps} from './ChangeTransferabilitySteps';
import {useToken} from "../../layout/WithTokens";
import {appRoutes} from "../../routing";
import {TokenContract} from "../../../lib/domain";
import {ErrorStateWrapper} from "../../../lib/states";

interface Props {
  useOpenToken?: UseOpenToken;
  useTokenOwner?: UseTokenOwner;
  useWallet?: UseWallet;
}

export function ChangeTransferabilityPage({
                                            useOpenToken = defaultUseOpenToken,
                                            useTokenOwner = defaultUseTokenOwner,
                                            useWallet = defaultUseWallet,
                                          }: Props) {
  const token = useToken();
  return (
    <div className={'h-screen flex flex-col'}>
      <div className={'px-3 py-4 mb-20'}>
        <VersatileLink href={appRoutes.settings}>
          <ExitSvg className={'w-8 h-8 text-white'}/>
        </VersatileLink>
      </div>
      <TransferabilityForL2Contract
        contract={token}
        useOpenToken={useOpenToken}
        useTokenOwner={useTokenOwner}
        useWallet={useWallet}
      />
    </div>
  );
}

interface TransferabilityForL2ContractProps {
  contract: TokenContract;
  useOpenToken: UseOpenToken;
  useTokenOwner: UseTokenOwner;
  useWallet: UseWallet;
}

function TransferabilityForL2Contract({
                                        contract,
                                        useOpenToken,
                                        useTokenOwner,
                                        useWallet,
                                      }: TransferabilityForL2ContractProps) {

  const {
    ownerAddress,
    fetching: fetchingOwnerAddress,
    failed: ownerAddressFailed,
  } = useTokenOwner({
    contract,
  });

  if (contract.isOpened) {
    return <OpenTokenState/>;
  }
  if (ownerAddress) {
    return (
      <ChangeTransferabilitySteps
        contract={contract}
        useOpenToken={useOpenToken}
        useWallet={useWallet}
        ownerAddress={ownerAddress}
      />
    );
  }
  return <ErrorStateWrapper/>;
}
