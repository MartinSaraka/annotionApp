import { ProcessType } from '@common/types/process'

// TODO: custom icons

export const PROCESS_ICON_MAP: Record<ProcessType, string> = {
  [ProcessType.MITOSIS_DETECTION]: 'RocketIcon',
  [ProcessType.NUCLEAR_PLEOMORPHISM]: 'LightningBoltIcon'
}
