import { memo, useCallback } from 'react'
import { INodeRendererProps } from 'react-accessible-treeview'

import { Button, Chip, Icon, Shape, Text, TreeView } from '@renderer/ui'
import { preventAllDefaults } from '@common/utils/global'
import { AnnotoriousHandler } from '@renderer/handlers'
import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { omit } from 'lodash'

type TBaseProps = {
  data: INodeRendererProps
}

type TAnnotationItemProps = TBaseProps

// TODO: annotationService to annotationHandler
// TODO: use toggle not buttons

const AnnotationItem = ({ data }: TAnnotationItemProps) => {
  const id = data.element.id as TID
  const tag = (data.element.metadata?.tag || 'path') as React.ElementType

  const anno = useAnnotoriousStore((state) => state.anno)
  const annotation = useImageStore((state) => state.getAnnotation(id))

  const annotoriousHandler = AnnotoriousHandler.instance(anno)

  const handleLock = useCallback(
    preventAllDefaults(() => {
      console.log('handleLock')
    }),
    []
  )

  const handleVisibility = useCallback(
    preventAllDefaults(() => {
      console.log('handleVisibility')
    }),
    []
  )

  const handleZoomToAnnotation = useCallback(() => {
    if (!annotation) return
    annotoriousHandler.zoomToAnnotation(annotation)
  }, [annotation, annotoriousHandler])

  const handleMouseEnter = useCallback(() => {
    if (!annotation) return
    annotoriousHandler.highlightAnnotation(annotation, 'on')
  }, [annotation, annotoriousHandler])

  const handleMouseLeave = useCallback(() => {
    if (!annotation) return
    annotoriousHandler.highlightAnnotation(annotation, 'off')
  }, [annotation, annotoriousHandler])

  return (
    <TreeView.Node
      nodeProps={data}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      actions={
        <>
          <Button ghost condensed onClick={handleLock}>
            <Icon
              name="LockOpen1Icon"
              width={12}
              height={12}
              css={{ color: '$dark4' }}
            />
          </Button>

          <Button ghost condensed onClick={handleVisibility}>
            <Icon
              name="EyeOpenIcon"
              width={12}
              height={12}
              css={{ color: '$dark4' }}
            />
          </Button>
        </>
      }
    >
      <Button ghost condensed onDoubleClick={handleZoomToAnnotation}>
        <Shape tag={tag} props={omit(data.element.metadata || {}, 'class')} />
      </Button>

      <Text variant="md">{data.element.name}</Text>

      <Chip small fromCss data-class-id={data.element.metadata?.class} />
    </TreeView.Node>
  )
}

export default memo(AnnotationItem) as typeof AnnotationItem
