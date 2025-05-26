import {Addresses, TokenContract} from '../../lib/domain';
import {
  BlockExplorerLink,
  ExternalUrlSvg,
  GradientText,
  P00lsGradientName,
  SecondaryButton,
  TokenLogo
} from '../../lib/ui';
import {useTranslation} from "react-i18next";
import {useWallet} from "../../lib/wallet";

interface Props {
  token: TokenContract;
}

export function SettingsHeader({token}: Props) {
  const {t} = useTranslation();
  const {disconnectFromWallet} = useWallet();

  return (
    <div className={'flex justify-between'}>
      <div className={'flex gap-5 items-center'}>
        <div
          className={
            'bg-chinese-black border border-raisin-black rounded-full p-1 flex flex-col justify-center items-center w-14 h-14'
          }
        >
          <div className='relative w-10 h-12'>
            <TokenLogo
              tokenId={token.symbol}
              layout={'responsive'}
            />
          </div>
        </div>
        <div>
          <div className={'font-apercu-mono font-bold text-2xl text-white'}>
            <BlockExplorerLink
              address={token.address}
              type={'token'}
              chainName={token.chainName}
            >
              {token.name}
              <ExternalUrlSvg
                className={'inline-block ml-2.5 mb-1 w-5 h-5'}
              />
            </BlockExplorerLink>
          </div>
          <div className={'font-apercu-mono font-bold'}>
            <GradientText gradientName={P00lsGradientName.GRADIENT_01}>
              {Addresses.truncate(token.address)}
            </GradientText>
          </div>
        </div>
      </div>
      <div>
        <SecondaryButton
          value={t('authentication.signOut')}
          secondaryButtonThemeName='raisin-black'
          onClick={disconnectFromWallet.disconnectFromWallet}
        />
      </div>
    </div>
  );
}
