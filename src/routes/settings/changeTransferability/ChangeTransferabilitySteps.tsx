import {Addresses, Chains, EvmAddress, HexString, TokenContract} from '../../../lib/domain';
import {ColumnLayout, PrimaryButton} from '../../../lib/ui';
import {AccountConnectionStatus, UseWallet} from '../../../lib/wallet';
import {useCallback} from 'react';
import {NotOwnerState, ProcessingTransactionStep, SelectOwnerWalletStep, WrongChainState,} from '../common';
import {ConfirmChangeTransferabilityStep} from './ConfirmChangeTransferabilityStep';
import {LoadingStateWrapper} from "../../../lib/states/LoadingStateWrapper";
import {useTranslation} from "react-i18next";
import {appRoutes} from "../../routing";
import {useNavigate} from 'react-router';
import {UseOpenToken} from "../../../lib/tokens";
import {useBuildConfiguration} from "../../../lib/configuration/BuildConfigurationProvider";

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
  const pushRoute = useNavigate();
  const onTransactionSucceeded = useCallback(
    () => pushRoute(appRoutes.settings),
    [pushRoute]
  );
  const {appPolygonChainId} = useBuildConfiguration();

  const connectedAsOwner =
    connection.status === AccountConnectionStatus.Connected &&
    Addresses.areEqual(connection.address, ownerAddress);

  const {openToken, openTokenReady, openingToken} = useOpenToken({
    contract,
    onSucceeded: onTransactionSucceeded,
    enabled: connectedAsOwner && currentChainId === appPolygonChainId,
    chainId: appPolygonChainId,
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

  if (currentChainId !== appPolygonChainId) {
    return (
      <WrongChainState
        switchToNetwork={switchToNetwork}
        targetChainName={Chains.getChainNameForId(appPolygonChainId)}
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
