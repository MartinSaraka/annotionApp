import { APP_NAME } from './global'

export enum EStorageName {
  IMAGES = 'images',
  LAYOUT = 'layout',
  RIGHTBAR = 'rightbar'
}

export const IMAGES_STORAGE_NAME =
  `${APP_NAME}/${EStorageName.IMAGES}-storage` as const

export const LAYOUT_STORAGE_NAME =
  `${APP_NAME}/${EStorageName.LAYOUT}-storage` as const

export const RIGHTBAR_STORAGE_NAME =
  `${APP_NAME}/${EStorageName.RIGHTBAR}-storage` as const
