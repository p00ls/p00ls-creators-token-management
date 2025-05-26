import {LayoutVariant, LoadingState} from '../ui';
import {useTranslation} from "react-i18next";

interface Props {
  layoutVariant?: LayoutVariant;
}

export function LoadingStateWrapper({layoutVariant}: Props) {
  const {t} = useTranslation();
  const message = t('components.loading_bar.loading');
  return (
    <LoadingState
      message={message}
      layoutVariant={layoutVariant}
    />
  );
}
