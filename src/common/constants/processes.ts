import { join } from 'path'

import { InstantType, ProcessType } from '@common/types/process'
import { ETool } from '@common/constants/tools'
import { BBoxOrigin } from '@common/types/aiService'

const constructPredictPath = (type: string) => join('models', type)

const constructResultPath = (processType: ProcessType) => (taskId: string) =>
  join('models', `${processType}?task_id=${taskId}`)

export const PROCESS_SETTINGS = {
  [ProcessType.MITOSIS_DETECTION]: {
    predictURL: constructPredictPath(ProcessType.MITOSIS_DETECTION),
    resultURL: constructResultPath(ProcessType.MITOSIS_DETECTION),
    origin: BBoxOrigin.TOP_LEFT,
    magnification: 40,
    minSize: {
      width: 512,
      height: 512
    }
  },

  [ProcessType.NUCLEAR_PLEOMORPHISM]: {
    predictURL: constructPredictPath(ProcessType.NUCLEAR_PLEOMORPHISM),
    resultURL: constructResultPath(ProcessType.NUCLEAR_PLEOMORPHISM),
    origin: BBoxOrigin.TOP_LEFT,
    magnification: 20,
    minSize: {
      width: 256,
      height: 256
    }
  },

  [ProcessType.NUCLICK_BBOX_DENSE]: {
    predictURL: constructPredictPath(ProcessType.NUCLICK_BBOX_DENSE),
    resultURL: constructResultPath(ProcessType.NUCLICK_BBOX_DENSE),
    origin: BBoxOrigin.CENTER_CENTER,
    magnification: 40,
    minSize: {
      width: 128,
      height: 128
    }
  }
} as const

export const INSTANT_SETTINGS = {
  [InstantType.NUCLICK]: {
    predictURL: constructPredictPath(InstantType.NUCLICK),
    origin: BBoxOrigin.CENTER_CENTER,
    magnification: 40,
    minSize: {
      width: 128,
      height: 128
    }
  }
} as const

export const PROCESS_ICON_MAP: Record<ProcessType, string> = {
  [ProcessType.MITOSIS_DETECTION]: 'RocketIcon',
  [ProcessType.NUCLEAR_PLEOMORPHISM]: 'RocketIcon',
  [ProcessType.NUCLICK_BBOX_DENSE]: 'RocketIcon'
}

export const PROCESS_ALLOWED_TYPES: Record<ProcessType, ETool[]> = {
  [ProcessType.MITOSIS_DETECTION]: [
    ETool.RECTANGLE,
    ETool.CIRCLE,
    ETool.ELLIPSE,
    ETool.POLYGON
  ],
  [ProcessType.NUCLEAR_PLEOMORPHISM]: [
    ETool.RECTANGLE,
    ETool.CIRCLE,
    ETool.ELLIPSE,
    ETool.POLYGON
  ],
  [ProcessType.NUCLICK_BBOX_DENSE]: [
    ETool.RECTANGLE,
    ETool.CIRCLE,
    ETool.ELLIPSE,
    ETool.POLYGON
  ]
}
