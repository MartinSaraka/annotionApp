import { i18n } from 'i18next'
import { useTranslation } from 'react-i18next'

import { type resources } from '@renderer/i18n/config'

type TLang = keyof typeof resources

type TUseLanguage = {
  i18n: i18n
  current: TLang
  available: TLang[]
  setLanguage: (language: TLang) => void
}

const useLanguage = (): TUseLanguage => {
  const { i18n } = useTranslation()

  const setLanguage: TUseLanguage['setLanguage'] = (language) => {
    window.localStorage.setItem('lang', language)
    i18n.changeLanguage(language)
  }

  return {
    i18n,
    current: i18n.language as TLang,
    available: ['en', 'sk'],
    setLanguage
  }
}

export default useLanguage
