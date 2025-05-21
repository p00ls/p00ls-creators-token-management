import { Addresses, HexString } from '../../../lib/domain';
import { ConnectToWallet, SelectWallet, Wallet } from '@p00ls/wallet';
import {useTranslation} from "react-i18next";

interface Props {
  wallets: Wallet[];
  connectToWallet: ConnectToWallet;
  ownerAddress: HexString;
}

export function SelectOwnerWalletStep({
  wallets,
  connectToWallet,
  ownerAddress,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className={'flex flex-col items-center'}>
      <SelectWallet
        wallets={wallets}
        connectToWallet={connectToWallet}
        title={t('select-wallet.title')}
        ethereumAdvice={t('settings.select-owner-wallet.advice', {
          address: Addresses.truncate(ownerAddress),
        })}
        next={t('common.continue')}
        retry={t('common.retry')}
      />
    </div>
  );
}
