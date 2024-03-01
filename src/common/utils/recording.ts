import Smartlook from 'smartlook-client'

import type { User } from '@common/types/datamodel'

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

export const identitySmartlook = (isProd: boolean, user: User) => {
  console.info('[SMARTLOOK] Authenticating...')

  if (!Smartlook.initialized()) {
    console.info('[SMARTLOOK] Not initialized.')
    return
  }

  if (!isProd) {
    console.info('[SMARTLOOK] Not authenticated in development.')
    return
  }

  Smartlook.identify(user.id, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    institution: user.institution || '',
    position: user.position || ''
  })

  console.info('[SMARTLOOK] Authenticated:', user.email)
}
