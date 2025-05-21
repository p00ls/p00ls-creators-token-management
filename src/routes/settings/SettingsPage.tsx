import {SettingsHeader} from "./SettingsHeader";
import {useToken} from "../layout/WithTokens";
import {Separator} from '../../lib/ui';
import {TokenInformationSection} from "./TokenInformationSection";
import {TokenTransferabilitySection} from "./transferabilitySection";
import {useTokenAllowlist} from "../../lib/tokens";

export function SettingsPage() {
  const token = useToken();
  return <div className={'max-w-screen-lg py-10 px-7 flex flex-col gap-8'}>
    <SettingsHeader token={token}/>
    <TokenTransferabilitySection
      token={token}
      useTokenAllowlist={useTokenAllowlist}
    />
    <Separator text={''}/>
    <TokenInformationSection token={token}/>
  </div>;
}
