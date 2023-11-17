import { ProcessType } from '@common/types/process'

export default {
  processes: {
    [ProcessType.MITOSIS_DETECTION]: {
      title: 'Mitosis Detection',
      description: 'Detect mitosis'
    },
    [ProcessType.NUCLEAR_PLEOMORPHISM]: {
      title: 'Nuclear Pleomorphism',
      description: 'Detect nuclear atipia'
    }
  }
} as const
