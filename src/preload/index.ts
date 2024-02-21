import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import {
  mainToRenderer,
  rendererToMain,
  rendererToMainAndBack
} from '@common/utils/event'

// Custom APIs for renderer
export const api = {
  mainWindowAction: rendererToMain('WINDOW_ACTION').renderer,
  setCsrfToken: rendererToMain('SET_CSRF_TOKEN').renderer,
  setAccessToken: rendererToMain('SET_ACCESS_TOKEN').renderer,
  getAccessToken: rendererToMainAndBack('GET_ACCESS_TOKEN').renderer,
  deleteAccessToken: rendererToMain('DELETE_ACCESS_TOKEN').renderer,

  onIdentityToken: mainToRenderer('AUTH_TOKENS').renderer,
  onWindowIsFocused: mainToRenderer('WINDOW_IS_FOCUSED').renderer
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
