import {LayoutVariant, LoadingState} from '../ui';
import {useTranslation} from "react-i18next";
import {useBuildConfiguration} from "../configuration/BuildConfigurationProvider";

interface Props {
  layoutVariant?: LayoutVariant;
}

export function LoadingStateWrapper({layoutVariant}: Props) {
  const {assetsBaseUrl} = useBuildConfiguration();
  const {t} = useTranslation();
  const message = t('components.loading_bar.loading');
  return (
    <LoadingState
      assetsBaseUrl={assetsBaseUrl}
      message={message}
      layoutVariant={layoutVariant}
    />
  );
}
