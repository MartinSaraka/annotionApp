import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

import { AiService } from '@renderer/services'
import { ProcessHandler } from '@renderer/handlers'

import {
  TProcess,
  TProcessStatus,
  TProcessTypeMap
} from '@common/types/process'

export type TProcessState = {
  processes: Record<TProcess['id'], TProcess>

  addProcess: (
    type: TProcess['type'],
    annotationId: TProcess['annotationId']
  ) => TProcess

  getProcess: (id: TProcess['id']) => TProcess | null

  stopProcess: (id: TProcess['id']) => void

  getAnnotationProcesses: (annotationId: TProcess['annotationId']) => TProcess[]
}

const useProcessStore = create<TProcessState>()((set, get) => {
  const processes: TProcessState['processes'] = {}

  const setProcessStatus = (id: TProcess['id'], status: TProcessStatus) => {
    processes[id].status = status
    set({ processes })
  }

  const handleProcess = async (id: TProcess['id'], retryTime: number) => {
    const process = processes?.[id]
    if (!process) throw new Error('Process is not available')

    // First stage PREDICT
    try {
      const taskId = await AiService.predict(
        process.type,
        process.annotationId,
        process.controller.signal,
        (status) => setProcessStatus(process.id, status)
      )

      processes[process.id].taskId = taskId

      set({ processes })
    } catch (error) {
      setProcessStatus(process.id, {
        type: 'FAILURE',
        message: (error as Error).message
      })

      throw new Error((error as Error).message)
    }

    // Second stage RESULT polling
    return await new Promise<
      TProcessTypeMap[keyof TProcessTypeMap]['response']
    >((resolve, reject) => {
      if (!processes[process.id].taskId) return reject('Task ID not available')

      if (processes[process.id].status.type === 'STOPPED')
        throw new Error('Process stopped')

      const poll = async () => {
        try {
          if (!processes[process.id]) throw new Error('Process not found')

          if (processes[process.id].status.type === 'STOPPED')
            throw new Error('Process stopped')

          const data = await AiService.result(
            processes[process.id],
            process.controller.signal,
            (status) => setProcessStatus(process.id, status)
          )

          if (data) return resolve(data)

          setTimeout(poll, retryTime)
        } catch (e) {
          reject(e)
        }
      }

      setTimeout(poll, retryTime)
    })
  }

  const addProcess: TProcessState['addProcess'] = (type, annotationId) => {
    const data = get().processes

    const newProcess: TProcess = {
      id: uuid(),
      type,
      annotationId,
      controller: new AbortController(),
      status: {
        type: 'STARTED',
        message: 'Preparing'
      }
    }

    data[newProcess.id] = newProcess
    set({ processes: data })

    // TODO: set status to generating
    handleProcess(newProcess.id, 2000)
      .then((response) => {
        const process = get().processes[newProcess.id]
        return ProcessHandler.handle(process, response)
      })
      .then(() => console.log('OK'))
      .catch(console.error)

    return get().processes[newProcess.id]
  }

  const stopProcess: TProcessState['stopProcess'] = (id) => {
    const data = get().processes

    if (!(id in data)) return

    const process = data[id]

    process.controller.abort()

    setProcessStatus(process.id, {
      type: 'STOPPED',
      message: 'Process stopped'
    })
  }

  const getProcess: TProcessState['getProcess'] = (id) => {
    const data = get().processes

    if (!(id in data)) return null

    return data[id]
  }

  const getAnnotationProcesses: TProcessState['getAnnotationProcesses'] = (
    annotationId
  ) => {
    const data = get().processes

    const annotationProcesses = Object.values(data).filter(
      (process) => process.annotationId === annotationId
    )

    return annotationProcesses
  }

  return {
    processes,
    addProcess,
    getProcess,
    stopProcess,
    getAnnotationProcesses
  }
})

export default useProcessStore
