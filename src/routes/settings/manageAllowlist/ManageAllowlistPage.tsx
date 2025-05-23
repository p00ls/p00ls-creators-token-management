import {UseWallet, useWallet as defaultUseWallet} from '../../../lib/wallet';
import {
  UseAddToTokenAllowlist,
  useAddToTokenAllowlist as defaultUseAddToTokenAllowlist,
  useRemoveFromTokenAllowlist as defaultUseRemoveFromTokenAllowlist,
  UseRemoveFromTokenAllowlist,
  useTokenAllowlist as defaultUseTokenAllowlist,
  UseTokenAllowlist,
  useTokenOwner as defaultUseTokenOwner,
  UseTokenOwner,
} from '../../../lib/tokens';
import {OpenTokenState} from '../common';
import {ManageAllowlistHeader} from './ManageAllowlistHeader';
import {TokenAllowlist} from './TokenAllowlist';
import {useSearchAllowlistForm} from './useSearchAllowlistForm';
import {useToken} from "../../layout/WithTokens";
import {HexString, TokenContract} from "../../../lib/domain";
import {LoadingStateWrapper} from "../../../lib/states/LoadingStateWrapper";
import {ErrorStateWrapper} from "../../../lib/states";
import {useBuildConfiguration} from "../../../lib/configuration/BuildConfigurationProvider";

interface Props {
  useTokenAllowlist?: UseTokenAllowlist;
  useAddToTokenAllowlist?: UseAddToTokenAllowlist;
  useRemoveFromTokenAllowlist?: UseRemoveFromTokenAllowlist;
  useTokenOwner?: UseTokenOwner;
  useWallet?: UseWallet;
}

export function ManageAllowlistPage({
                                      useTokenAllowlist = defaultUseTokenAllowlist,
                                      useAddToTokenAllowlist = defaultUseAddToTokenAllowlist,
                                      useRemoveFromTokenAllowlist = defaultUseRemoveFromTokenAllowlist,
                                      useTokenOwner = defaultUseTokenOwner,
                                      useWallet = defaultUseWallet,
                                    }: Props) {
  const {
    form: searchForm,
    onSubmit: onSearchSubmit,
    onReset: onSearchReset,
    searchedAddress,
  } = useSearchAllowlistForm();
  const contract = useToken();
  return (
    <div className={'h-screen flex flex-col'}>
      <ManageAllowlistHeader
        searchForm={searchForm}
        onSearchSubmit={onSearchSubmit}
        onSearchReset={onSearchReset}
      />
      <AllowlistForL2Contract
        contract={contract}
        useTokenAllowlist={useTokenAllowlist}
        useAddToTokenAllowlist={useAddToTokenAllowlist}
        useRemoveFromTokenAllowlist={useRemoveFromTokenAllowlist}
        useTokenOwner={useTokenOwner}
        useWallet={useWallet}
        searchedAddress={searchedAddress}
      />
    </div>
  );
}

interface AllowlistForL2ContractProps {
  contract: TokenContract;
  useTokenAllowlist: UseTokenAllowlist;
  useAddToTokenAllowlist: UseAddToTokenAllowlist;
  useRemoveFromTokenAllowlist: UseRemoveFromTokenAllowlist;
  useTokenOwner: UseTokenOwner;
  useWallet: UseWallet;
  searchedAddress: HexString | undefined;
}

function AllowlistForL2Contract({
                                  contract,
                                  useTokenAllowlist,
                                  useAddToTokenAllowlist,
                                  useRemoveFromTokenAllowlist,
                                  useTokenOwner,
                                  useWallet,
                                  searchedAddress,
                                }: AllowlistForL2ContractProps) {
  const {appPolygonChainId} = useBuildConfiguration();

  const {
    ownerAddress,
    fetching: fetchingOwnerAddress,
    failed: ownerAddressFailed,
  } = useTokenOwner({
    contract,
    chainId: appPolygonChainId
  });
  if (fetchingOwnerAddress) {
    return <LoadingStateWrapper/>;
  }
  if (contract.isOpened) {
    return <OpenTokenState/>;
  }
  if (ownerAddressFailed) {
    return <ErrorStateWrapper/>;
  }
  if (ownerAddress) {
    return (
      <TokenAllowlist
        contract={contract}
        ownerAddress={ownerAddress}
        useTokenAllowlist={useTokenAllowlist}
        useAddToTokenAllowlist={useAddToTokenAllowlist}
        useRemoveFromTokenAllowlist={useRemoveFromTokenAllowlist}
        useWallet={useWallet}
        searchedAddress={searchedAddress}
      />
    );
  }
  return <ErrorStateWrapper/>;
}
