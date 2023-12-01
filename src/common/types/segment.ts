import { TBoundingBox, TKeypoint } from './global'

import { TAnnotation } from './annotation'

export type TEmbedding = {
  taskId: TID
  prevTaskId?: TID
  annotationId: TAnnotation['id']
  annotations: TAnnotation['id'][]
  keypoints: {
    keypoint: TKeypoint
    label: 'foreground' | 'background'
  }[]
  bboxes: TBoundingBox[]
  previews: TAnnotation[]
}
