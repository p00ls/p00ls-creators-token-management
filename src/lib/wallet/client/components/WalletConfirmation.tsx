import {Logger} from '@arpinum/log';
import {Addresses} from '../../../domain';
import {
  Card,
  CardColumnLayout,
  CardContent,
  P00lsGradientName,
  PrimaryButton,
  Separator,
  SquareGradientPill,
  TertiaryButton,
  WalletSvg,
} from '../../../ui';
import {ReactNode, useCallback} from 'react';
import {ConnectedAccount} from '../../iso';

interface Props {
  walletConnection: ConnectedAccount;
  onContinue: (walletConnection: ConnectedAccount) => void;
  onChangeWallet: () => void;
  error?: Error;
  logger: Logger;
  title: ReactNode;
  next: string;
  separator: string;
  disconnect: string;
}

export function WalletConfirmation({
                                     walletConnection,
                                     onContinue: baseOnContinue,
                                     onChangeWallet: baseOnChangeWallet,
                                     error,
                                     logger,
                                     title,
                                     next,
                                     separator,
                                     disconnect,
                                   }: Props) {
  const onContinue = useCallback(
    () => baseOnContinue(walletConnection),
    [baseOnContinue, walletConnection]
  );

  const onChangeWallet = useCallback(() => {
    walletConnection.disconnect().catch(logger.error);
    baseOnChangeWallet();
  }, [baseOnChangeWallet, logger.error, walletConnection]);

  return (
    <Card variant={'outlined'} smallVariant='none'>
      <CardContent size={'lg'}>
        <CardColumnLayout>
          <div className='flex justify-center'>
            <SquareGradientPill gradientName={P00lsGradientName.GRADIENT_07}>
              <WalletSvg className='w-6 h-6'/>
            </SquareGradientPill>
          </div>
          <div className='font-apercu-mono font-bold text-center text-lg text-white'>
            {title}
          </div>
          <div className='font-apercu-mono text-center text-lg text-electric-lime'>
            {Addresses.truncate(walletConnection.address, 8)}
          </div>
          {error && (
            <div className='font-apercu-mono text-center text-lg text-maize'>
              {error.message}
            </div>
          )}
          <div className='mx-6'>
            <PrimaryButton
              primaryButtonThemeName={'electric-lime'}
              block={true}
              value={next}
              onClick={onContinue}
            />
          </div>
          <div>
            <Separator text={separator}/>
            <div className={'text-center text-lg mt-8'}>
              <TertiaryButton
                onClick={onChangeWallet}
                value={disconnect}
                tertiaryButtonThemeName={'taupe-gray'}
              />
            </div>
          </div>
        </CardColumnLayout>
      </CardContent>
    </Card>
  );
}
