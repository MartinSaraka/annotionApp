import { NodeModel } from '@minoru/react-dnd-treeview'

import { AnnotationHandler } from '@renderer/handlers'

import { AnnotationUtils } from '@common/utils'
import { TAnnotation } from '@common/types/annotation'

export type TNodeData = {
  tag: ReturnType<(typeof AnnotationUtils)['getShape']>['tag']
  shape: ReturnType<(typeof AnnotationUtils)['getShape']>['props']
  class: string
  editability: string
  visibility: string
  status?: string
}

export type TNodeModel = NodeModel<TNodeData>

class TreeAdapter {
  static fromAnnotationsToNodes(
    annotations: TAnnotation[],
    query: string | null
  ): TNodeModel[] {
    const nodes: TNodeModel[] = []

    const queryRegex = query ? new RegExp(query, 'gi') : null

    for (const annotation of annotations) {
      const data = AnnotationHandler.getBody(annotation, [
        'naming',
        'tagging',
        'editability',
        'visibility',
        'parent',
        'status'
      ])

      if (queryRegex) {
        const matchId =
          !!annotation.id &&
          query?.charAt(0) === '#' &&
          queryRegex.test(annotation.id)

        const matchName = !!data.naming && queryRegex.test(data.naming)

        if (!matchId && !matchName) continue
      }

      const shape = AnnotationUtils.from(annotation).shape

      const newNode: TNodeModel = {
        id: annotation.id,
        text: data?.naming || '',
        parent: data?.parent || '0',
        droppable: true,
        data: {
          tag: shape.tag,
          shape: shape.props,
          class: data.tagging,
          editability: data.editability || 'editable',
          visibility: data.visibility || 'visible',
          status: data.status || undefined
        }
      }

      nodes.push(newNode)
    }

    return nodes
  }
}

export default TreeAdapter
