import {Card, CardContent, P00lsGradientName, PrimaryButton, SquareGradientPill, WalletSvg,} from '../../../ui';
import {ReactNode} from 'react';
import {Wallet} from '../../iso';
import {ConnectToWallet} from '..';
import {WalletButton} from './WalletButton';

interface Props {
  wallets: Wallet[];
  connectToWallet: ConnectToWallet;
  title: ReactNode;
  ethereumAdvice: ReactNode;
  genericAdvice?: (walletName: string) => ReactNode;
  retry: string;
  next: string;
  bottom?: ReactNode;
}

export function SelectWallet({
                               wallets,
                               connectToWallet,
                               title,
                               bottom,
                               ethereumAdvice,
                               genericAdvice,
                               retry,
                               next,
                             }: Props) {
  const {connectToWallet: connect, error: walletConnectionError} =
    connectToWallet;

  return (
    <Card variant={'outlined'} smallVariant='none'>
      <CardContent size={'lg'}>
        <div className='max-w-[356px] flex flex-col gap-10'>
          <div className='flex justify-center'>
            <SquareGradientPill gradientName={P00lsGradientName.GRADIENT_07}>
              <WalletSvg className='w-6 h-6'/>
            </SquareGradientPill>
          </div>
          <div className='font-apercu-mono font-bold text-center text-lg text-white'>
            {title}
          </div>
          {walletConnectionError ? (
            <div className='font-apercu-mono text-center text-lg text-maize'>
              {walletConnectionError.message}
            </div>
          ) : (
            <div className='font-apercu-mono text-center text-lg text-taupe-gray'>
              {wallets.length > 1
                ? ethereumAdvice
                : genericAdvice?.(wallets[0].name)}
            </div>
          )}
          <div className='mx-6'>
            {wallets.length === 1 ? (
              <div className='flex justify-center'>
                {walletConnectionError ? (
                  <PrimaryButton
                    onClick={() => connect(wallets[0])}
                    value={retry}
                    primaryButtonThemeName={'international-orange'}
                  />
                ) : (
                  <PrimaryButton
                    onClick={() => connect(wallets[0])}
                    value={next}
                    primaryButtonThemeName={'international-orange'}
                  />
                )}
              </div>
            ) : (
              <ul className={'flex flex-col gap-3 w-sm'}>
                {wallets.map((wallet) => (
                  <li key={wallet.type}>
                    <WalletButton
                      wallet={wallet}
                      walletName={wallet.name}
                      onClick={() => connect(wallet)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          {bottom}
        </div>
      </CardContent>
    </Card>
  );
}
