import {initReactI18next} from 'react-i18next';
import i18n, {Namespace} from 'i18next';
import en from '../locales/en.json';
import gu from '../locales/gu.json';
import hi from '../locales/hi.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {translation: en},
    gu: {translation: gu},
    hi: {translation: hi},
  },
});

export type ItxType = Namespace;

export default i18n;
