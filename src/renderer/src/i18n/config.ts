import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { EN, SK } from '@renderer/i18n/locales'

export const defaultNS = 'common'
export const fallbackLng = 'en'

export const resources = {
  en: EN,
  sk: SK
} as const

i18next.use(initReactI18next).init({
  // ? debug: true
  lng: window.localStorage.getItem('lang') || fallbackLng,
  fallbackLng,
  defaultNS,
  resources
})

export default i18next
