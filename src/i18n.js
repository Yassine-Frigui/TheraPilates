import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './translations/fr.json';
import en from './translations/en.json';

const resources = {
  fr: {
    translation: fr
  },
  en: {
    translation: en
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // default language is French
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false // React already does escaping
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;