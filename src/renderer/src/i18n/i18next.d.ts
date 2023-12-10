import { defaultNS, fallbackLng, resources } from '@renderer/i18n/config'

declare module 'i18next' {
  interface CustomTypeOptions {
    lng: (keyof typeof resources)[number]
    defaultNS: typeof defaultNS
    resources: (typeof resources)[typeof fallbackLng]
  }
}
