import { TBoundingBox, TKeypoint, TOffset } from './global'
import { TEmbedding } from './segment'

export enum ProcessType {
  MITOSIS_DETECTION = 'mc',
  NUCLEAR_PLEOMORPHISM = 'np',
  NUCLICK_BBOX_DENSE = 'nuclick/bbox-dense',
  SAM_EMBEDDINGS = 'sam/embeddings'
}

export enum InstantType {
  NUCLICK = 'nuclick',
  SAM = 'sam'
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

  [ProcessType.SAM_EMBEDDINGS]: {
    body: {
      image: string
    }
    response: TProcessResponse
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

  [InstantType.SAM]: {
    body: {
      embeddings_task_id: TID
      previous_predict_task_id?: TID
      bbox?: TEmbedding['bboxes'][number]
      keypoints?: TEmbedding['keypoints']
      offset: TOffset
    }
    response: {
      previous_predict_task_id: TID
      segmented_objects: TKeypoint[][]
    }
  }
}
