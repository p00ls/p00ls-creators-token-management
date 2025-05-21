import {ErrorState, ErrorStateProps} from '../ui';
import {useTranslation} from "react-i18next";

export function ErrorStateWrapper({
                                    text,
                                    title,
                                    ...rest
                                  }: Partial<ErrorStateProps>) {
  const {t} = useTranslation();
  return (
    <ErrorState
      title={title || t('error.state.title')}
      text={text || t('error.state.text')}
      {...rest}
    />
  );
}
