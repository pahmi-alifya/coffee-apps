import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import translationEN from './en.json';
import translationID from './id.json';

const resources = {
  en: {
    translation: translationEN,
  },
  id: {
    translation: translationID,
  },
};

// Define i18n Module
i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
  fallbackLng: 'id', // use id if detected lng is not available
  keySeparator: '.', // we use keys in form messages.welcome
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
