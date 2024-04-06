import type { ProgressInfo } from 'electron-updater'

export enum TElectronEvent {
  WINDOW_ACTION = 'electron:window',
  WINDOW_IS_FOCUSED = 'electron:window-is-focused',

  UPDATER_ERROR = 'updater:error',
  UPDATER_CHECKING_FOR_UPDATE = 'updater:checking-for-update',
  UPDATER_UPDATE_AVAILABLE = 'updater:update-available',
  UPDADER_UPDATE_NOT_AVAILABLE = 'updater:update-not-available',
  UPDATER_DOWNLOAD_PROGRESS = 'updater:download-progress',
  UPDATER_UPDATE_DOWNLOADED = 'updater:update-downloaded',

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

  // Updater
  [TElectronEvent.UPDATER_ERROR]: {
    error: Error
  }
  [TElectronEvent.UPDATER_CHECKING_FOR_UPDATE]: void
  [TElectronEvent.UPDATER_UPDATE_AVAILABLE]: void
  [TElectronEvent.UPDADER_UPDATE_NOT_AVAILABLE]: void
  [TElectronEvent.UPDATER_DOWNLOAD_PROGRESS]: {
    info: ProgressInfo
  }
  [TElectronEvent.UPDATER_UPDATE_DOWNLOADED]: void
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

  // Updater
  [TElectronEvent.UPDATER_ERROR]: void
  [TElectronEvent.UPDATER_CHECKING_FOR_UPDATE]: void
  [TElectronEvent.UPDATER_UPDATE_AVAILABLE]: void
  [TElectronEvent.UPDADER_UPDATE_NOT_AVAILABLE]: void
  [TElectronEvent.UPDATER_DOWNLOAD_PROGRESS]: void
  [TElectronEvent.UPDATER_UPDATE_DOWNLOADED]: void
}
