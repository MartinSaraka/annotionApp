export enum TElectronEvent {
  WINDOW_ACTION = 'electron:window',
  WINDOW_IS_FOCUSED = 'electron:window-is-focused',

  AUTH_TOKENS = 'auth:auth-tokens',
  SET_CSRF_TOKEN = 'auth:set-csrf-token',
  SET_ACCESS_TOKEN = 'auth:set-access-token',
  GET_ACCESS_TOKEN = 'auth:get-access-token',
  DELETE_ACCESS_TOKEN = 'auth:delete-access-token'
}

export type TElectronEventArgs = {
  [TElectronEvent.WINDOW_ACTION]: {
    action: 'close' | 'minimize' | 'maximize'
  }
  [TElectronEvent.AUTH_TOKENS]: {
    identityToken: string
    csrfToken: string
  }
  [TElectronEvent.SET_CSRF_TOKEN]: {
    csrfToken: string
  }
  [TElectronEvent.SET_ACCESS_TOKEN]: {
    accessToken: string
  }
  [TElectronEvent.GET_ACCESS_TOKEN]: void
  [TElectronEvent.DELETE_ACCESS_TOKEN]: void
  [TElectronEvent.WINDOW_IS_FOCUSED]: void
}

export type TElectronEventReturn = {
  [TElectronEvent.WINDOW_ACTION]: void
  [TElectronEvent.AUTH_TOKENS]: void
  [TElectronEvent.SET_CSRF_TOKEN]: void
  [TElectronEvent.SET_ACCESS_TOKEN]: void
  [TElectronEvent.GET_ACCESS_TOKEN]: {
    accessToken: string | null
  }
  [TElectronEvent.DELETE_ACCESS_TOKEN]: void
  [TElectronEvent.WINDOW_IS_FOCUSED]: boolean
}
