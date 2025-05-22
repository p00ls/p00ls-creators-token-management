import {useCallback, useMemo, useState} from 'react';
import {RemoveFromTokenAllowlistDialog} from './remove';
import {Addresses, HexString, TokenContract} from "../../../lib/domain";
import {UseRemoveFromTokenAllowlist} from "../../../lib/tokens";
import {UseWallet} from "../../../lib/wallet";
import {CheckSvg, CopyToClipboardButton, ExitSvg, P00lsGradientName, useDialog} from "../../../lib/ui";
import {PaginationWrapper, useInMemoryPagination} from "../../../lib/ui/pagination";

interface Props {
  contract: TokenContract;
  ownerAddress: HexString;
  addresses: HexString[];
  useRemoveFromTokenAllowlist: UseRemoveFromTokenAllowlist;
  useWallet: UseWallet;
  reloadAllowlist: () => void;
}

export function AllowlistedAddresses({
                                       contract,
                                       ownerAddress,
                                       addresses,
                                       reloadAllowlist,
                                       useRemoveFromTokenAllowlist,
                                       useWallet,
                                     }: Props) {
  const {pagination, total, entries, onPageChange, computeGlobalIndex} =
    useInMemoryPagination({
      entries: addresses,
    });

  const {openDialog, closeDialog, isDialogOpen} = useDialog();
  const [addressToRemove, setAddressToRemove] = useState<HexString | null>(
    null
  );
  const onRemoveAddress = useCallback(
    (address: HexString) => {
      setAddressToRemove(address);
      openDialog();
    },
    [openDialog]
  );

  const onRemoveSucceeded = useCallback(() => {
    closeDialog();
    setAddressToRemove(null);
    reloadAllowlist();
  }, [closeDialog, reloadAllowlist]);

  return (
    <>
      <div className={'flex-1 min-h-0 flex flex-col'}>
        <div
          className={
            'max-w-screen-lg px-9 flex-1 overflow-y-auto flex flex-col'
          }
        >
          <div
            className={
              'flex flex-col divide-y divide-raisin-black border-y border-raisin-black font-apercu-mono'
            }
          >
            {entries.map((address, index) => (
              <AddressRow
                key={address}
                address={address}
                index={index}
                addressesToProtect={[]}
                onRemoveAddress={onRemoveAddress}
                computeGlobalIndex={computeGlobalIndex}
              />
            ))}
          </div>
        </div>
        <PaginationWrapper
          pagination={pagination}
          rowsCount={total}
          i18nRowKindKey='settings.manage-allowlist-page.pagination-row-kind'
          onPageChange={onPageChange}
          disabled={false}
        />
      </div>
      {addressToRemove && (
        <RemoveFromTokenAllowlistDialog
          open={isDialogOpen}
          contract={contract}
          ownerAddress={ownerAddress}
          addressToRemove={addressToRemove}
          onClose={closeDialog}
          onSucceeded={onRemoveSucceeded}
          useRemoveFromTokenAllowlist={useRemoveFromTokenAllowlist}
          useWallet={useWallet}
        />
      )}
    </>
  );
}

interface AddressRowProps {
  address: HexString;
  index: number;
  computeGlobalIndex: (index: number) => string;
  addressesToProtect: HexString[];
  onRemoveAddress: (address: HexString) => void;
}

function AddressRow({
                      address,
                      index,
                      computeGlobalIndex,
                      addressesToProtect,
                      onRemoveAddress,
                    }: AddressRowProps) {
  const canBeRemoved = useMemo(
    () => !Addresses.include(addressesToProtect, address),
    [address, addressesToProtect]
  );
  return (
    <div className={'flex gap-5 py-4'}>
      <div className={'font-medium text-taupe-gray'}>
        {computeGlobalIndex(index)}
      </div>
      <div className={'flex gap-2.5 font-bold text-white'}>
        {Addresses.truncate(address)}
        <CopyToClipboardButton
          value={address}
          size={'sm'}
          className={'text-taupe-gray'}
        />
        <CheckSvg
          className={'w-5 h-5'}
          gradientName={P00lsGradientName.GRADIENT_15}
        />
      </div>
      {canBeRemoved && (
        <div
          onClick={() => onRemoveAddress(address)}
          className={'ml-auto cursor-pointer'}
        >
          <ExitSvg className={'w-5 h-5 text-taupe-gray'}/>
        </div>
      )}
    </div>
  );
}
