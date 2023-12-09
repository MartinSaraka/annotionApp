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
    name: 'Undertermined (Nuclear pleomorphism)',
    color: '#ED5B00'
  },
  score_1: {
    id: 'score_1',
    name: 'Score 1 (Nuclear pleomorphism)',
    color: '#44D292'
  },
  score_2: {
    id: 'score_2',
    name: 'Score 2 (Nuclear pleomorphism)',
    color: '#FFDC52'
  },
  score_3: {
    id: 'score_3',
    name: 'Score 3 (Nuclear pleomorphism)',
    color: '#FF546C'
  }
}
