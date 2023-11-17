import { v4 as uuid } from 'uuid'
import { create } from 'zustand'

import { AiService } from '@renderer/services'

import { TMitoticCountResponse } from '@common/types/aiService'
import { ProcessType, TProcess, TProcessStatus } from '@common/types/process'
import { AnnotationUtils } from '@common/utils'
import { useAnnotoriousStore, useImageStore } from '.'
import { TAnnotationIntersection } from '@common/types/annotation'
import { AnnotoriousHandler } from '@renderer/handlers'

export type TProcessState = {
  processes: Record<TProcess['id'], TProcess>

  addProcess: (
    type: TProcess['type'],
    annotationId: TProcess['annotationId']
  ) => TProcess

  getProcess: (id: TProcess['id']) => TProcess | null
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

    try {
      const handler = {
        [ProcessType.MITOSIS_DETECTION]: AiService.MC,
        [ProcessType.NUCLEAR_PLEOMORPHISM]: AiService.MC
      }

      const taskId = await handler[process.type](
        process.annotationId,
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

          setTimeout(poll, retryTime)
        } catch (e) {
          reject(e)
        }
      }

      setTimeout(poll, retryTime)
    })
  }

  const handleResponse = (
    data: TMitoticCountResponse,
    processId: TProcess['id']
  ) => {
    const process = get().processes[processId]
    if (!process) throw new Error('Process not found')

    // TODO: use active anno
    const anno = useAnnotoriousStore.getState().anno
    const preview = useAnnotoriousStore.getState().preview
    if (!anno || !preview) throw new Error('Annotorious not available')

    const annotation = useImageStore
      .getState()
      .getAnnotation(process.annotationId)
    if (!annotation) throw new Error('Annotation not found')

    // TODO: unlock annotation
    // TODO: process type

    for (const item of data.mitosis) {
      const newAnnotation = AnnotationUtils.createRectAnnotation(item.bbox, [
        AnnotationUtils.createBody('TextualBody', 'tagging', item.label),
        AnnotationUtils.createBody('TextualBody', 'status', 'generated'),
        AnnotationUtils.createBody('TextualBody', 'parent', annotation.id),
        AnnotationUtils.createBody('TextualBody', 'describing', item.confidence)
      ])

      const intersections: TAnnotationIntersection[] =
        anno.getAnnotationsIntersecting(newAnnotation)
      if (!intersections.length) continue

      const isParent = intersections.find(
        (item) => item.underlying.id === annotation.id
      )
      if (!isParent) continue

      anno.addAnnotation(newAnnotation)
      useImageStore.getState().saveAnnotation(newAnnotation)
    }

    useImageStore.getState().selectAnnotation(annotation.id)
    AnnotoriousHandler.instance(preview).showPreview(annotation)
  }

  const addProcess: TProcessState['addProcess'] = (type, annotationId) => {
    const data = get().processes

    const newProcess: TProcess = {
      id: uuid(),
      type,
      annotationId,
      status: {
        type: 'STARTED',
        message: 'Preparing'
      }
    }

    data[newProcess.id] = newProcess
    set({ processes: data })

    // TODO: implement then and catch
    // TODO: set annotation status and loading
    handleProcess(newProcess.id, 2000)
      .then((response) => handleResponse(response, newProcess.id))
      .catch(console.error)

    return get().processes[newProcess.id]
  }

  // TODO: stop process

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

  return { processes, addProcess, getProcess, getAnnotationProcesses }
})

export default useProcessStore
