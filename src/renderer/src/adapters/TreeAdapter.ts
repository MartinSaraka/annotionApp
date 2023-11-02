import { TAnnotation } from '@common/types/annotation'
import { AnnotationUtils } from '@common/utils'
import { NodeModel } from '@minoru/react-dnd-treeview'
import { AnnotationHandler } from '@renderer/handlers'

export type TNodeData = {
  tag: ReturnType<(typeof AnnotationUtils)['getShape']>['tag']
  shape: ReturnType<(typeof AnnotationUtils)['getShape']>['props']
  class: string
  editability: string
  visibility: string
}

export type TNodeModel = NodeModel<TNodeData>

class TreeAdapter {
  static fromAnnotationsToNodes(annotations: TAnnotation[]): TNodeModel[] {
    const nodes: TNodeModel[] = []

    for (const annotation of annotations) {
      const data = AnnotationHandler.getBody(annotation, [
        'naming',
        'tagging',
        'editability',
        'visibility'
      ])

      const shape = AnnotationUtils.from(annotation).shape

      const newNode: TNodeModel = {
        id: annotation.id,
        text: data?.naming || '',
        parent: 0,
        data: {
          tag: shape.tag,
          shape: shape.props,
          class: data.tagging,
          editability: data.editability || 'editable',
          visibility: data.visibility || 'visible'
        }
      }

      nodes.push(newNode)
    }

    return nodes
  }
}

export default TreeAdapter
