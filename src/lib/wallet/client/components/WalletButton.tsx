import {
  BrandGradientName,
  buildGradientHoverDirective,
  CoinbaseSvg,
  GlobeSvg,
  MetamaskSvg,
  P00lsGradientName,
  RainbowSvg,
  TrustSvg,
  WalletConnectSvg,
} from '../../../ui';
import {ForwardedRef, forwardRef, MouseEventHandler, ReactNode} from 'react';
import {Wallet, WalletType} from '../../iso';

interface WalletConfiguration {
  icon: ReactNode;
  gradientName: P00lsGradientName | BrandGradientName;
}

const walletConfiguration: Record<WalletType, WalletConfiguration> = {
  [WalletType.Coinbase]: {
    icon: <CoinbaseSvg className='w-8 h-8'/>,
    gradientName: BrandGradientName.COINBASE,
  },
  [WalletType.Metamask]: {
    icon: <MetamaskSvg className='w-8 h-8'/>,
    gradientName: P00lsGradientName.GRADIENT_12,
  },
  [WalletType.Injected]: {
    icon: <GlobeSvg className='w-8 h-8'/>,
    gradientName: P00lsGradientName.GRADIENT_01,
  },
  [WalletType.Rainbow]: {
    icon: <RainbowSvg className='w-8 h-8'/>,
    gradientName: BrandGradientName.RAINBOW,
  },
  [WalletType.Trust]: {
    icon: <TrustSvg className='w-8 h-8'/>,
    gradientName: BrandGradientName.TRUST,
  },
  [WalletType.Other]: {
    icon: <WalletConnectSvg className='w-8 h-8'/>,
    gradientName: BrandGradientName.WALLETCONNECT,
  },
  [WalletType.MetamaskMobile]: {
    icon: <MetamaskSvg className='w-8 h-8'/>,
    gradientName: P00lsGradientName.GRADIENT_12,
  }
};

export const WalletButton = forwardRef<
  HTMLButtonElement,
  {
    wallet: Wallet;
    walletName: string;
    onClick?: MouseEventHandler<unknown>;
  }
>(({wallet, walletName, onClick, ...props}, ref) => {
  //Note : there is a bug with gradients and the transparent border ... It displays bands in some cases. The following structure is constrained to fix the problem
  return (
    <button
      {...props}
      type='button'
      className='group w-full border border-raisin-black hover:border-creator-black rounded-standard'
      ref={ref as ForwardedRef<HTMLButtonElement>}
      onClick={onClick}
    >
      <div
        className={`flex flex-row w-full items-center justify-between py-4 px-8 rounded-standard ${buildGradientHoverDirective(
          walletConfiguration[wallet.type].gradientName
        )} group-active:from-raisin-black group-active:to-raisin-black`}
      >
        <div
          className={
            'font-du-bois uppercase text-spanish-gray hover:text-white group-hover:text-white font-bold tracking-widest'
          }
        >
          {walletName}
        </div>
        <div className='text-spanish-gray hover:text-white group-hover:text-white'>
          {walletConfiguration[wallet.type].icon}
        </div>
      </div>
    </button>
  );
});

WalletButton.displayName = 'AuthButton';
