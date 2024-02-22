import Smartlook from 'smartlook-client'

export const initializeSmartlook = (isProd: boolean, key: string) => {
  console.info('[SMARTLOOK] Initializing...')

  if (Smartlook.initialized()) {
    console.info('[SMARTLOOK] Already initialized.')
    return
  }

  if (!isProd) {
    console.info('[SMARTLOOK] Not initialized in development.')
    return
  }

  Smartlook.init(key, { region: 'eu' })

  console.info('[SMARTLOOK] Initialized:', Smartlook.initialized())
}
