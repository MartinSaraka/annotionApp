import { TBoundingBox, TKeypoint, TOffset } from './aiService'

export enum ProcessType {
  MITOSIS_DETECTION = 'mc',
  NUCLEAR_PLEOMORPHISM = 'np',
  NUCLICK_BBOX_DENSE = 'nuclick/bbox-dense'
}

export enum InstantType {
  NUCLICK = 'nuclick'
}

export type TProcessStatus = {
  type: 'STARTED' | 'PENDING' | 'RETRY' | 'FAILURE' | 'SUCCESS' | 'STOPPED'
  message: string
}

export type TProcessResponse = {
  task_id: string
  status: TProcessStatus['type']
}

export type TProcess = {
  id: TID
  taskId?: string
  type: ProcessType
  annotationId: TID
  status: TProcessStatus
  controller: AbortController
}

export type TProcessTypeMap = {
  [ProcessType.MITOSIS_DETECTION]: {
    body: {
      image: string
      offset: TOffset
    }
    response: {
      mitosis: {
        bbox: TBoundingBox
        confidence: number
        label: string
      }[]
    }
  }

  [ProcessType.NUCLEAR_PLEOMORPHISM]: {
    body: {
      image: string
    }
    response: {
      label: 'undetermined' | 'score_1' | 'score_2' | 'score_3'
    }
  }

  [ProcessType.NUCLICK_BBOX_DENSE]: {
    body: {
      image: string
      offset: TOffset
      bboxes: TBoundingBox[]
    }
    response: {
      segmented_nuclei: TKeypoint[][]
    }
  }
}

export type TInstantTypeMap = {
  [InstantType.NUCLICK]: {
    body: {
      image: string
      keypoints: TKeypoint[]
      offset: TOffset
    }
    response: {
      segmented_nuclei: TKeypoint[][]
    }
  }
}
