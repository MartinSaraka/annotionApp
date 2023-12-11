import { ProcessType } from '@common/types/process'

export default {
  processes: {
    [ProcessType.MITOSIS_DETECTION]: {
      title: 'Detekcia Mitóz',
      description: 'Detekcia mitóz z oblasti záujmu'
    },
    [ProcessType.NUCLEAR_PLEOMORPHISM]: {
      title: 'Bunečný Pleomorfizmus',
      description: 'Detekcia bunečnej atypie'
    },
    [ProcessType.NUCLICK_BBOX_DENSE]: {
      title: 'Segmentácia Buniek',
      description: 'Segmentácia buniek z oblasti záujmu'
    },
    [ProcessType.SAM_EMBEDDINGS]: {
      title: 'Segmentácia Čohokoľvek',
      description: 'Segmentácia čohokoľvek z oblasti záujmu'
    }
  }
} as const
