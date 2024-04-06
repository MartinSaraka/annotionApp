import Route from 'route-parser'
import { BrowserWindow } from 'electron'

import Storage from './Storage'
import { mainToRenderer } from '@common/utils/event'
import { PROTOCOL_NAME } from '@common/constants/global'

class Router {
  private static LOGIN_ROUTE = new Route<{ identityToken: string }>(
    `${PROTOCOL_NAME}://login/:identityToken`
  )

  private constructor() {
    throw new Error('Router class is not meant to be instantiated.')
  }

  static loginHandler =
    <TStorage extends { csrfToken: string }>(
      storage: Storage<TStorage>,
      mainWindow: BrowserWindow
    ) =>
    (url: string) => {
      //event.preventDefault()

      // Parse the URL and extract the access token
      const params = this.LOGIN_ROUTE.match(url)
      if (!params) return

      const identityToken = params.identityToken
      if (!identityToken) return

      const csrfToken = storage.get('csrfToken')
      if (!csrfToken) return

      if (!mainWindow) return
      // Send access and csrf token to the renderer process
      mainToRenderer('AUTH_TOKENS').main(mainWindow, {
        identityToken,
        csrfToken
      })

      /*setTimeout(() => {
        mainWindow?.focus()
      }, 200)*/
    }
}

export default Router
