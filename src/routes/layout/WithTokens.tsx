import {createContext, PropsWithChildren, useContext, useMemo, useState} from "react";
import {useCreatorTokens} from "../../lib/graph";
import {useOwnerWallet} from "./OwnerWalletGuard";
import {useBuildConfiguration} from "../../lib/configuration/BuildConfigurationProvider";
import {PrimaryButton, Spinner} from "../../lib/ui";
import {TokenContract} from "../../lib/domain";


const TokenContext = createContext<
  TokenContract | undefined
>(undefined);

export function useToken() {
  const result = useContext(TokenContext);
  if (!result) {
    throw new Error('Missing token');
  }
  return result;
}

export function WithTokens({children}: PropsWithChildren) {
  const [token, setToken] = useState<TokenContract | undefined>();

  if (!token) {
    return <SelectToken onSelectToken={setToken}/>;
  }

  return <TokenContext.Provider value={token}>{children}</TokenContext.Provider>;
}

function SelectToken({onSelectToken}: { onSelectToken: (tokenInfos: TokenContract) => void; }) {
  const {creatorTokens, gettingCreatorTokens} = useCreatorTokens();
  const ownerWalletInfos = useOwnerWallet();
  const {bypassWallet} = useBuildConfiguration();

  const myTokens = useMemo(() => {
    return creatorTokens.filter(token => {
      if (bypassWallet) {
        return true;
      }
      return token.ownerAddress === ownerWalletInfos.address;
    });
  }, [creatorTokens, ownerWalletInfos, bypassWallet]);

  if (gettingCreatorTokens) {
    return <div className='flex flex-col w-full items-center justify-items-center text-white'><Spinner/></div>;
  }

  if (myTokens.length === 0) {
    return <div className='flex flex-col w-full items-center justify-items-center text-white'>No token found</div>;
  }

  return <div className='flex flex-col gap-4'>{
    myTokens.map(token => (<PrimaryButton
      primaryButtonThemeName='transparent-white'
      key={token.address}
      onClick={() => onSelectToken(token)}
      value={token.name}
    />))
  }</div>;
}
