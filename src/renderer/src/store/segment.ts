import { create } from 'zustand'

import { TEmbedding } from '@common/types/segment'

export type TSegmentState = {
  embeddings: Record<TEmbedding['annotationId'], TEmbedding>

  addEmbedding: (
    annotationId: TEmbedding['annotationId'],
    embeddingId: TEmbedding['taskId']
  ) => void

  updateEmbedding: (
    annotationId: TEmbedding['annotationId'],
    data: Partial<TEmbedding>
  ) => void

  deleteEmbedding: (annotationId: TEmbedding['annotationId']) => void

  getEmbedding: (annotationId: TEmbedding['annotationId']) => TEmbedding | null

  hasEmbedding: (annotationId: TEmbedding['annotationId']) => boolean
}

const useSegmentStore = create<TSegmentState>()((set, get) => {
  const embeddings: TSegmentState['embeddings'] = {}

  const addEmbedding: TSegmentState['addEmbedding'] = (
    annotationId,
    embeddingId
  ) => {
    embeddings[annotationId] = {
      taskId: embeddingId,
      annotationId,
      annotations: [],
      keypoints: [],
      bboxes: [],
      previews: []
    }

    set({ embeddings })
  }

  const updateEmbedding: TSegmentState['updateEmbedding'] = (
    annotationId,
    data
  ) => {
    embeddings[annotationId] = {
      ...embeddings[annotationId],
      ...data
    }

    set({ embeddings })
  }

  const deleteEmbedding: TSegmentState['deleteEmbedding'] = (annotationId) => {
    if (!embeddings[annotationId]) return
    delete embeddings[annotationId]
    set({ embeddings })
  }

  const getEmbedding: TSegmentState['getEmbedding'] = (annotationId) => {
    return get().embeddings[annotationId] || null
  }

  const hasEmbedding: TSegmentState['hasEmbedding'] = (annotationId) => {
    return !!get().embeddings[annotationId]
  }

  return {
    embeddings,
    addEmbedding,
    updateEmbedding,
    deleteEmbedding,
    hasEmbedding,
    getEmbedding
  }
})

export default useSegmentStore
