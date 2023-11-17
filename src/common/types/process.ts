export enum ProcessType {
  MITOSIS_DETECTION = 'mc',
  NUCLEAR_PLEOMORPHISM = 'np'
}

export type TProcessStatus = {
  type: 'STARTED' | 'PENDING' | 'RETRY' | 'FAILURE' | 'SUCCESS'
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
}
