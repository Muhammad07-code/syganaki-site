import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import kz from './translations/kz.json';
import ru from './translations/ru.json';
import en from './translations/en.json';
import ar from './translations/ar.json';

const savedLanguage =
  typeof window !== 'undefined' ? window.localStorage.getItem('i18nextLng') : null;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      kz: { translation: kz },
      ru: { translation: ru },
      en: { translation: en },
      ar: { translation: ar },
    },
    lng: savedLanguage || 'kz',
    fallbackLng: 'kz',
    supportedLngs: ['kz', 'ru', 'en', 'ar'],
    detection: {
      order: ['localStorage'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng === 'kz' ? 'kk' : lng;
    document.body.dir = lng === 'ar' ? 'rtl' : 'ltr';
  }
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language === 'kz' ? 'kk' : i18n.language;
  document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
}

export default i18n;
