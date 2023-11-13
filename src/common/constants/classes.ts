import { TAnnotationClass } from '@common/types/annotation'

export const DEFAULT_CLASSES: Record<TID, TAnnotationClass> = {
  mitosis: {
    id: 'mitosis',
    name: 'Mitosis',
    color: '#0AC5B3'
  },
  hard_negative_mitosis: {
    id: 'hard_negative_mitosis',
    name: 'Hard negative mitosis',
    color: '#ED5B00'
  }
}
