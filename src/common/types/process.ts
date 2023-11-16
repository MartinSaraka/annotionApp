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
  type: 'mitotic_count'
  annotationId: TID
  status: TProcessStatus
}
