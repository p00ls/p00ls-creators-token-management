import {Addresses, Chains, EvmAddress, HexString, TokenContract} from '../../../lib/domain';
import {ColumnLayout, PrimaryButton} from '../../../lib/ui';
import {useRouterMutation} from '@p00ls/ui-client-pages-router';
import {AccountConnectionStatus, UseWallet} from '@p00ls/wallet';
import {useCallback} from 'react';
import {UseOpenToken} from '../../../features';
import {NotOwnerState, ProcessingTransactionStep, SelectOwnerWalletStep, WrongChainState,} from '../common';
import {ConfirmChangeTransferabilityStep} from './ConfirmChangeTransferabilityStep';
import {LoadingStateWrapper} from "../../../lib/states/LoadingStateWrapper";
import {useTranslation} from "react-i18next";
import {appRoutes} from "../../routing";

interface Props {
  contract: TokenContract;
  useOpenToken: UseOpenToken;
  useWallet: UseWallet;
  ownerAddress: HexString;
}

export function ChangeTransferabilitySteps({
                                             contract,
                                             useOpenToken,
                                             useWallet,
                                             ownerAddress,
                                           }: Props) {
  const {
    connection,
    wallets,
    connectToWallet,
    disconnectFromWallet,
    switchToNetwork,
    currentChainId,
  } = useWallet();
  const {push: pushRoute} = useRouterMutation();
  const onTransactionSucceeded = useCallback(
    () => pushRoute(appRoutes.settings),
    [pushRoute]
  );

  const contractChainId = Chains.getChainIdForName(
    Chains.fromLegacy(contract.chain)
  );
  const connectedAsOwner =
    connection.status === AccountConnectionStatus.Connected &&
    Addresses.areEqual(connection.address, ownerAddress);

  const {openToken, openTokenReady, openingToken} = useOpenToken({
    contract,
    onSucceeded: onTransactionSucceeded,
    enabled: connectedAsOwner && currentChainId === contractChainId,
  });

  const {t} = useTranslation();

  if (connection.status === AccountConnectionStatus.Loading) {
    return <LoadingStateWrapper/>;
  }

  if (connection.status === AccountConnectionStatus.Disconnected) {
    return (
      <ColumnLayout size={'md'}>
        <SelectOwnerWalletStep
          wallets={wallets}
          connectToWallet={connectToWallet}
          ownerAddress={ownerAddress}
        />
      </ColumnLayout>
    );
  }

  if (currentChainId !== contractChainId) {
    return (
      <WrongChainState
        switchToNetwork={switchToNetwork}
        targetChainName={Chains.fromLegacy(contract.chain)}
        cancelHref={appRoutes.settings}
      />
    );
  }

  if (!connectedAsOwner) {
    return (
      <NotOwnerState
        disconnectFromWallet={disconnectFromWallet.disconnectFromWallet}
        currentAddress={EvmAddress.toString(connection.address)}
        ownerAddress={ownerAddress}
        cancelHref={appRoutes.settings}
      />
    );
  }

  if (openingToken) {
    return (
      <ColumnLayout size={'md'}>
        <ProcessingTransactionStep
          cta={
            <PrimaryButton
              href={appRoutes.settings}
              value={t('settings.go-to-settings-button')}
              primaryButtonThemeName={'electric-lime'}
            />
          }
        />
      </ColumnLayout>
    );
  }

  return (
    <ConfirmChangeTransferabilityStep
      onConfirm={openToken}
      confirmReady={openTokenReady}
    />
  );
}
