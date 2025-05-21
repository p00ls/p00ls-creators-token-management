import {createInstance} from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {PropsWithChildren, useEffect} from 'react';
import {I18nextProvider, initReactI18next} from 'react-i18next';

const i18n = createInstance()
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  );

i18n
  .init({
    lng: 'en',
    fallbackLng: 'en',
    defaultNS: 'common',
    fallbackNS: 'common',
    ns: ['common', 'achievements'],
    interpolation: {
      escapeValue: false,
    },
  })
  .catch(console.error);

export function TranslationProvider({
                                      children,
                                      userLanguageCode,
                                    }: PropsWithChildren<{ userLanguageCode: string }>) {
  useEffect(() => {
    i18n.changeLanguage(userLanguageCode).catch(console.error);
  }, [userLanguageCode]);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
