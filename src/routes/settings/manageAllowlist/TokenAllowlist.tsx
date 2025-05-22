import {UseWallet} from '../../../lib/wallet';
import {UseAddToTokenAllowlist, UseRemoveFromTokenAllowlist, UseTokenAllowlist,} from '../../../lib/tokens';
import {AddToTokenAllowlistForm} from './add';
import {AllowlistedAddresses} from './AllowlistedAddresses';
import {HexString, TokenContract} from "../../../lib/domain";
import {QueryResultPresenterWrapper} from "../../../lib/ui";

interface Props {
  contract: TokenContract;
  useTokenAllowlist: UseTokenAllowlist;
  useAddToTokenAllowlist: UseAddToTokenAllowlist;
  useRemoveFromTokenAllowlist: UseRemoveFromTokenAllowlist;
  useWallet: UseWallet;
  ownerAddress: HexString;
  searchedAddress: HexString | undefined;
}

export function TokenAllowlist({
                                 contract,
                                 useTokenAllowlist,
                                 useAddToTokenAllowlist,
                                 useRemoveFromTokenAllowlist,
                                 useWallet,
                                 ownerAddress,
                                 searchedAddress,
                               }: Props) {
  const {result: allowlistResult, reload: reloadAllowlist} =
    useTokenAllowlist({contract, searchedAddress});
  return (
    <div className={'flex-1 min-h-0 flex flex-col gap-8'}>
      <div className={'max-w-screen-lg'}>
        <AddToTokenAllowlistForm
          contract={contract}
          ownerAddress={ownerAddress}
          useAddToTokenAllowlist={useAddToTokenAllowlist}
          useWallet={useWallet}
          reloadAllowlist={reloadAllowlist}
        />
      </div>
      <QueryResultPresenterWrapper
        result={allowlistResult}
        success={(addresses) => (
          <AllowlistedAddresses
            useWallet={useWallet}
            contract={contract}
            ownerAddress={ownerAddress}
            addresses={addresses}
            useRemoveFromTokenAllowlist={useRemoveFromTokenAllowlist}
            reloadAllowlist={reloadAllowlist}
          />
        )}
      />
    </div>
  );
}
