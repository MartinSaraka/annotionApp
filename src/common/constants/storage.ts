import { APP_NAME } from './global'

export enum EStorageName {
  IMAGES = 'images',
  SETTINGS = 'settings'
}

export const IMAGES_STORAGE_NAME =
  `${APP_NAME}/${EStorageName.IMAGES}-storage` as const

export const SETTINGS_STORAGE_NAME =
  `${APP_NAME}/${EStorageName.SETTINGS}-storage` as const
