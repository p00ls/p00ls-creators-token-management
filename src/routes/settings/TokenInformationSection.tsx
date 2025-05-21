import {Addresses, Chains, TokenContract} from '../../lib/domain';
import {BlockExplorerLink, CopyToClipboardButton, ExternalUrlSvg} from '../../lib/ui';
import {PropsWithChildren} from 'react';
import {SettingsSectionTitle} from './SettingsSectionTitle';
import {useTranslation} from "react-i18next";

interface Props {
  token: TokenContract;
}

export function TokenInformationSection({token}: Props) {
  const {t} = useTranslation();
  return (
    <div className={'flex flex-col gap-8'}>
      <SettingsSectionTitle>
        {t('settings.token-information-section.title')}
      </SettingsSectionTitle>
      <div className={'flex flex-col gap-4'}>
        <InformationRow>
          <LabelText>
            {t('settings.token-information-section.token-name-label')}
          </LabelText>
          <ValueText>{token.name}</ValueText>
        </InformationRow>
        <InformationRow>
          <LabelText>
            {t('settings.token-information-section.token-symbol-label')}
          </LabelText>
          <ValueText>{token.symbol}</ValueText>
        </InformationRow>
        <InformationRow>
          <LabelText>
            {t('settings.token-information-section.token-type-label')}
          </LabelText>
          <ValueText>ERC-20</ValueText>
        </InformationRow>
        <ContractRows token={token}/>
      </div>
    </div>
  );
}

function ContractRows({token}: { token: TokenContract }) {
  const {t} = useTranslation();
  return <InformationRow key={`${token.chainId}_${token.address}`}>
    <LabelText>
      {t('settings.token-information-section.contract-address-label', {
        chain: Chains.getChainDisplayNameForName(token.chainName),
      })}
    </LabelText>
    <ValueText>
      <div className={'flex items-center'}>
        <BlockExplorerLink
          address={token.address}
          type={'token'}
          chainName={token.chainName}
        >
          {Addresses.truncate(token.address)}
          <ExternalUrlSvg className={'inline-block ml-2.5 mb-1 w-5 h-5'}/>
        </BlockExplorerLink>
        <CopyToClipboardButton
          value={token.address}
          className={'ml-2.5 mb-1'}
          size={'sm'}
        />
      </div>
    </ValueText>
  </InformationRow>;
}

function InformationRow({children}: PropsWithChildren) {
  return <div className={'flex justify-between'}>{children}</div>;
}

function LabelText({children}: PropsWithChildren) {
  return (
    <div className={'font-apercu-mono font-bold text-white capitalize'}>
      {children}
    </div>
  );
}

function ValueText({children}: PropsWithChildren) {
  return (
    <div className={'font-apercu-mono font-bold text-spanish-gray'}>
      {children}
    </div>
  );
}
