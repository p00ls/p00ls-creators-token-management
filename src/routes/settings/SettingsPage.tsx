import {SettingsHeader} from "./SettingsHeader";
import {useToken} from "../layout/WithTokens";
import {Separator, Spinner} from '../../lib/ui';
import {TokenInformationSection} from "./TokenInformationSection";
import {TokenTransferabilitySection} from "./transferabilitySection";
import {useTokenAllowlist} from "../../lib/tokens";
import {useEthereumCreatorToken} from "../../lib/graph";

export function SettingsPage() {
  const token = useToken();

  const {gettingEthereumToken, ethereumToken} = useEthereumCreatorToken(token.symbol);

  if (gettingEthereumToken) {
    return <div className={'max-w-screen-lg py-10 px-7 flex flex-col gap-8'}>
      <Spinner/>
    </div>;
  }

  return <div className={'max-w-screen-lg py-10 px-7 flex flex-col gap-8'}>
    <SettingsHeader token={token}/>
    <TokenTransferabilitySection
      token={token}
      useTokenAllowlist={useTokenAllowlist}
    />
    <Separator text={''}/>
    <TokenInformationSection token={token} ethereumToken={ethereumToken}/>
  </div>;
}
