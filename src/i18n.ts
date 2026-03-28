import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import he from './locales/he/common.json'
import en from './locales/en/common.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: he },
      en: { translation: en },
    },
    lng: localStorage.getItem('i18nextLng') || 'he',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n