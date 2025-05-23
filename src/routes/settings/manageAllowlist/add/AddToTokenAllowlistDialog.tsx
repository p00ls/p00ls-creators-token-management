import {useRef} from 'react';
import {NotOwnerState, ProcessingTransactionStep, SelectOwnerWalletStep, WrongChainState,} from '../../common';
import {ConfirmAddToTokenAllowlistStep} from './ConfirmAddToTokenAllowlistStep';
import {Addresses, Chains, EvmAddress, HexString, TokenContract} from "../../../../lib/domain";
import {UseAddToTokenAllowlist} from "../../../../lib/tokens";
import {AccountConnectionStatus, UseWallet} from "../../../../lib/wallet";
import {CenteredDialog, ExitSvg, TertiaryButton} from "../../../../lib/ui";
import {LoadingStateWrapper} from "../../../../lib/states/LoadingStateWrapper";
import {ErrorStateWrapper} from "../../../../lib/states";
import {useBuildConfiguration} from "../../../../lib/configuration/BuildConfigurationProvider";

interface Props {
  contract: TokenContract;
  ownerAddress: HexString;
  addressToAdd: HexString;
  useAddToTokenAllowlist: UseAddToTokenAllowlist;
  useWallet: UseWallet;
  open: boolean;
  onClose: () => void;
  onSucceeded: () => void;
}

export function AddToTokenAllowlistDialog({
                                            open,
                                            onClose,
                                            ownerAddress,
                                            contract,
                                            addressToAdd,
                                            onSucceeded,
                                            useAddToTokenAllowlist,
                                            useWallet,
                                          }: Props) {
  const {
    switchToNetwork,
    connection,
    wallets,
    connectToWallet,
    disconnectFromWallet,
    currentChainId,
  } = useWallet();
  const {appPolygonChainId} = useBuildConfiguration();

  const connectedAsOwner =
    connection.status === AccountConnectionStatus.Connected &&
    Addresses.areEqual(connection.address, ownerAddress);

  const {
    addToTokenAllowlistReady,
    addToTokenAllowlist,
    addingToAllowlist,
    addingFailed,
  } = useAddToTokenAllowlist({
    contract,
    addressToAdd,
    onSucceeded,
    enabled:
      connection.status === AccountConnectionStatus.Connected &&
      connectedAsOwner &&
      currentChainId === appPolygonChainId,
    chainId: appPolygonChainId
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
    if (currentChainId !== appPolygonChainId) {
      return (
        <WrongChainState
          switchToNetwork={switchToNetwork}
          targetChainName={Chains.getChainNameForId(appPolygonChainId)}
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
          onCancel={onClose}
        />
      );
    }
    if (addingToAllowlist) {
      return <ProcessingTransactionStep/>;
    }
    if (addingFailed) {
      return <ErrorStateWrapper layoutVariant={'auto'}/>;
    }
    if (addToTokenAllowlistReady) {
      return (
        <ConfirmAddToTokenAllowlistStep
          addressToAdd={addressToAdd}
          mainFocusableButtonRef={focusableButtonRef}
          onConfirm={addToTokenAllowlist}
          onCancel={onClose}
        />
      );
    }
    return <LoadingStateWrapper layoutVariant={'auto'}/>;
  }
}
