import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {AccountConnectionStatus, SelectWallet, useWallet, WalletConfirmation} from "../../lib/wallet";
import {createAppLogger} from "../../lib/logger";

interface OwnerWalletInfos {
  address: string;
}

const ownerWalletContext = createContext<
  OwnerWalletInfos | undefined
>(undefined);

export function useOwnerWallet() {
  const result = useContext(ownerWalletContext);
  if (!result) {
    throw new Error('Missing owner wallet');
  }
  return result;
}

export function OwnerWalletGuard({
                                   children,
                                 }: PropsWithChildren) {
  const {t} = useTranslation();
  const {connection, wallets, connectToWallet} = useWallet();
  const [ownerWallet, setOwnerWallet] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (connection.status !== 'Connected') {
      setOwnerWallet(undefined);
    }
  }, [connection]);

  if (ownerWallet) {
    return (
      <ownerWalletContext.Provider value={{address: ownerWallet}}>
        {children}
      </ownerWalletContext.Provider>
    );
  } else {
    if (connection.status === AccountConnectionStatus.Connected) {
      return (
        <WalletConfirmation
          walletConnection={connection}
          onContinue={() => setOwnerWallet(connection.address)}
          onChangeWallet={() => setOwnerWallet(undefined)}
          logger={createAppLogger({category: 'Wallet'})}
          title={t('wallet.confirmation-title')}
          next={t('common.continue')}
          separator={t('common.or-separator')}
          disconnect={t('wallet.disconnect-button')}
        />
      );
    } else {
      return (
        <SelectWallet
          wallets={wallets}
          connectToWallet={connectToWallet}
          title={t('select-wallet.title')}
          ethereumAdvice={t('select-wallet.advice.ethereum')}
          next={t('common.continue')}
          retry={t('common.retry')}
        />
      );
    }
  }
}
