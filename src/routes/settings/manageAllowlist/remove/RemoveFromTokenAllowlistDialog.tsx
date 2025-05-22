import {useRef} from 'react';
import {NotOwnerState, ProcessingTransactionStep, SelectOwnerWalletStep, WrongChainState,} from '../../common';
import {ConfirmRemoveFromTokenAllowlistStep} from './ConfirmRemoveFromTokenAllowlistStep';
import {Addresses, EvmAddress, HexString, TokenContract} from "../../../../lib/domain";
import {UseRemoveFromTokenAllowlist} from "../../../../lib/tokens";
import {AccountConnectionStatus, UseWallet} from "../../../../lib/wallet";
import {CenteredDialog, ExitSvg, TertiaryButton} from "../../../../lib/ui";
import {LoadingStateWrapper} from "../../../../lib/states/LoadingStateWrapper";
import {appRoutes} from "../../../routing";
import {ErrorStateWrapper} from "../../../../lib/states";

interface Props {
  contract: TokenContract;
  ownerAddress: HexString;
  addressToRemove: HexString;
  useRemoveFromTokenAllowlist: UseRemoveFromTokenAllowlist;
  useWallet: UseWallet;
  open: boolean;
  onClose: () => void;
  onSucceeded: () => void;
}

export function RemoveFromTokenAllowlistDialog({
                                                 open,
                                                 onClose,
                                                 ownerAddress,
                                                 contract,
                                                 addressToRemove,
                                                 onSucceeded,
                                                 useRemoveFromTokenAllowlist,
                                                 useWallet,
                                               }: Props) {
  const {
    connection,
    wallets,
    connectToWallet,
    disconnectFromWallet,
    switchToNetwork,
    currentChainId,
  } = useWallet();

  const connectedAsOwner =
    connection.status === AccountConnectionStatus.Connected &&
    Addresses.areEqual(connection.address, ownerAddress);

  const {
    removeFromTokenAllowlistReady,
    removeFromTokenAllowlist,
    removingFromAllowlist,
    removingFailed,
  } = useRemoveFromTokenAllowlist({
    contract,
    addressToRemove,
    onSucceeded,
    enabled: connectedAsOwner && currentChainId === contract.chainId,
  });

  const focusableButtonRef = useRef(null);

  return (
    <CenteredDialog
      open={open}
      onClose={onClose}
      initialFocus={focusableButtonRef}
      bgColor={'chinese-black'}
    >
      <div className={'w-[640px] h-[480px] flex flex-col'}>
        <div className='absolute left-0 top-0 hidden pl-4 pt-4 sm:block'>
          <TertiaryButton
            onClick={onClose}
            icon={<ExitSvg className={'w-8 h-8 text-white'}/>}
            tertiaryButtonThemeName={'taupe-gray'}
          />
        </div>
        <div className={'flex-1 overflow-y-auto flex flex-col'}>
          <div className={'flex-1 flex flex-col items-center justify-center'}>
            {renderContent()}
          </div>
        </div>
      </div>
    </CenteredDialog>
  );

  function renderContent() {
    if (connection.status === AccountConnectionStatus.Loading) {
      return <LoadingStateWrapper layoutVariant={'auto'}/>;
    }
    if (connection.status === AccountConnectionStatus.Disconnected) {
      return (
        <SelectOwnerWalletStep
          wallets={wallets}
          connectToWallet={connectToWallet}
          ownerAddress={ownerAddress}
        />
      );
    }
    if (currentChainId !== contract.chainId) {
      return (
        <WrongChainState
          switchToNetwork={switchToNetwork}
          targetChainName={contract.chainName}
          onCancel={onClose}
        />
      );
    }
    if (!connectedAsOwner) {
      return (
        <NotOwnerState
          disconnectFromWallet={disconnectFromWallet.disconnectFromWallet}
          currentAddress={EvmAddress.toString(connection.address)}
          ownerAddress={ownerAddress}
          cancelHref={appRoutes.manageTokenAllowList}
          onCancel={onClose}
        />
      );
    }
    if (removingFromAllowlist) {
      return <ProcessingTransactionStep/>;
    }
    if (removingFailed) {
      return <ErrorStateWrapper layoutVariant={'auto'}/>;
    }
    if (removeFromTokenAllowlistReady) {
      return (
        <ConfirmRemoveFromTokenAllowlistStep
          addressToRemove={addressToRemove}
          mainFocusableButtonRef={focusableButtonRef}
          onConfirm={removeFromTokenAllowlist}
          onCancel={onClose}
        />
      );
    }
    return <LoadingStateWrapper layoutVariant={'auto'}/>;
  }
}
