import { ProcessType } from '@common/types/process'

export default {
  processes: {
    [ProcessType.MITOSIS_DETECTION]: {
      title: 'Mitosis Detection',
      description: 'Detect mitosis from ROI'
    },
    [ProcessType.NUCLEAR_PLEOMORPHISM]: {
      title: 'Nuclear Pleomorphism',
      description: 'Detect nuclear atypia'
    },
    [ProcessType.NUCLICK_BBOX_DENSE]: {
      title: 'Segment Nuclei',
      description: 'Segment nuclei from ROI'
    }
  }
} as const
