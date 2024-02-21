import Smartlook from 'smartlook-client'

export const initializeSmartlook = () => {
  console.info('[SMARTLOOK] Initializing...')

  if (Smartlook.initialized()) {
    console.info('[SMARTLOOK] Already initialized.')
    return
  }

  if (!import.meta.env.PROD) {
    console.info('[SMARTLOOK] Not initialized in development.')
    return
  }

  Smartlook.init(import.meta.env.RENDERER_VITE_SMARTLOOK_KEY, {
    region: 'eu'
  })

  console.info('[SMARTLOOK] Initialized:', Smartlook.initialized())
}
