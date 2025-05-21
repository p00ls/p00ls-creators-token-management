import {CheckSvg} from '../../../lib/ui';
import {OpennessRow} from './OpennessRow';
import {useTranslation} from "react-i18next";

export function OpenToken() {
  const {t} = useTranslation();
  return (
    <OpennessRow
      Icon={CheckSvg}
      title={t('settings.token-transferability-section.open-token.title')}
      description={t(
        'settings.token-transferability-section.open-token.description'
      )}
    />
  );
}
