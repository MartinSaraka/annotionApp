import { AnnotationService } from '@renderer/services'
import { TAnnotation } from '@common/types/annotation'
import { AnnotationUtils } from '@common/utils'

type TMetadata = {
  tag: ReturnType<(typeof AnnotationUtils)['getShape']>['tag']
  class: string
}

class TreeAdapter {
  static fromAnnotationsToNodes(
    annotations: TAnnotation[]
  ): TRATNodes<TMetadata> {
    const nodes: TRATNodes<TMetadata> = {
      name: '',
      children: []
    }

    for (const annotation of annotations) {
      const data = AnnotationService.getBody(annotation, [
        'naming',
        'tagging'
      ] as const)
      const shape = AnnotationUtils.from(annotation).shape

      nodes.children?.push({
        id: annotation.id,
        name: data?.naming || '',
        metadata: {
          tag: shape.tag,
          class: data?.tagging || '',
          ...shape.props
        }
      } as TRATNodes<TMetadata>)
    }

    return nodes
  }
}

export default TreeAdapter
