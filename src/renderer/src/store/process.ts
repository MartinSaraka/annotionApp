// import { v4 as uuid } from 'uuid'
import { create } from 'zustand'

import { AiService } from '@renderer/services'

import { TMitoticCountResponse } from '@common/types/aiService'
import { TProcess, TProcessStatus } from '@common/types/process'

export type TProcessState = {
  processes: Record<TProcess['id'], TProcess>

  addProcess: (
    type: TProcess['type'],
    annotationId: TProcess['annotationId']
  ) => TProcess

  getProcess: (id: TProcess['id']) => TProcess | null
}

const useProcessStore = create<TProcessState>()((set, get) => {
  const processes: TProcessState['processes'] = {}

  const setProcessStatus = (id: TProcess['id'], status: TProcessStatus) => {
    processes[id].status = status
    set({ processes })
  }

  const handleProcess = async (id: TProcess['id']) => {
    const process = processes?.[id]
    if (!process) throw new Error('Process is not available')

    try {
      const taskId = await AiService.MitoticCount(
        process.annotationId,
        (status) => setProcessStatus(process.id, status)
      )
      processes[process.id].taskId = taskId
      set({ processes })
    } catch (e) {
      const error = e as Error
      return setProcessStatus(process.id, {
        type: 'FAILURE',
        message: error.message
      })
    }

    return await new Promise<TMitoticCountResponse>((resolve, reject) => {
      if (!processes[process.id].taskId) return reject('Task ID not available')

      const poll = async () => {
        try {
          if (!processes[process.id]) throw new Error('Process not found')

          const data = await AiService.ResultStatus(
            processes[process.id],
            (status) => setProcessStatus(process.id, status)
          )

          if (data) return resolve(data)

          setTimeout(poll, 2000)
        } catch (e) {
          reject(e)
        }
      }

      poll()
    })
  }

  const addProcess: TProcessState['addProcess'] = (type, annotationId) => {
    const process: TProcess = {
      id: '1', //uuid(),
      type,
      annotationId,
      status: {
        type: 'STARTED',
        message: 'Preparing'
      }
    }

    processes[process.id] = process
    set({ processes })

    console.log('[PROCESS]', 'Starting process', process)

    handleProcess(process.id).then(console.log).catch(console.info)

    return process
  }

  const getProcess: TProcessState['getProcess'] = (id) => {
    const data = get().processes

    if (!(id in data)) return null

    return data[id]
  }

  return { processes, addProcess, getProcess }
})

export default useProcessStore
