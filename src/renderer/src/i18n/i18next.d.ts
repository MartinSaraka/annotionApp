import { defaultNS, fallbackLng, resources } from '@renderer/i18n/config'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: (typeof resources)[typeof fallbackLng]
  }
}
