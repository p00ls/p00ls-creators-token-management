import {AppRouter} from "./routes/Router";
import {BuildConfigurationProvider} from "./lib/configuration/BuildConfigurationProvider";
import {loadBuildConfiguration} from "./lib/configuration/buildConfiguration";
import {useMemo} from "react";
import {TranslationProvider} from "./lib/i18n/TranslationProvider";
import {CreatorWalletProvider} from "./lib/wallet/CreatorWalletProvider";

export function App() {
  const configuration = useMemo(() => loadBuildConfiguration(), []);

  return (
    <BuildConfigurationProvider value={configuration}>
      <TranslationProvider userLanguageCode={'en'}>
        <CreatorWalletProvider>
          <AppRouter/>
        </CreatorWalletProvider>
      </TranslationProvider>
    </BuildConfigurationProvider>
  );
}
