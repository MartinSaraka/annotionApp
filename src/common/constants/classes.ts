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
  },
  undetermined: {
    id: 'undetermined',
    name: 'NP Undertermined',
    color: '#ED5B00'
  },
  score_1: {
    id: 'score_1',
    name: 'NP Score 1',
    color: '#44D292'
  },
  score_2: {
    id: 'score_2',
    name: 'NP Score 2',
    color: '#FFDC52'
  },
  score_3: {
    id: 'score_3',
    name: 'NP Score 3',
    color: '#FF546C'
  },
  preview: {
    id: 'preview',
    name: 'Preview',
    color: '#7A40ED'
  }
}
