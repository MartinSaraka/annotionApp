import { ComponentProps, memo, useCallback } from 'react'
import { NodeModel } from '@minoru/react-dnd-treeview'

import { Button, Chip, Icon, Shape, Text, Toggle, TreeView } from '@renderer/ui'
import { TNodeData } from '@renderer/adapters/TreeAdapter'

import { AnnotationHandler, AnnotoriousHandler } from '@renderer/handlers'
import { useAnnotoriousStore, useImageStore } from '@renderer/store'

import {
  ANNOTATION_EDITABILITY_ICON_MAP,
  ANNOTATION_VISIBILITY_ICON_MAP
} from '@common/constants/annotation'

type TBaseProps = {
  node: NodeModel<TNodeData>
}

type TStyledProps = Omit<ComponentProps<typeof TreeView.Node>, 'children'>

type TAnnotationItemProps = TStyledProps & TBaseProps

const AnnotationItem = ({
  node,
  isSelected,
  ...rest
}: TAnnotationItemProps) => {
  const id = node.id as TID
  const tag = (node.data?.tag || 'path') as React.ElementType
  const editability = node.data?.editability || 'editable'
  const visibility = node.data?.visibility || 'visible'

  const anno = useAnnotoriousStore((state) => state.anno)
  const cancelSelected = useAnnotoriousStore((state) => state.cancelIfSelected)
  const annotoriousHandler = AnnotoriousHandler.instance(anno)

  const annotation = useImageStore((state) => state.getAnnotation(id))
  const saveAnnotation = useImageStore((state) => state.saveAnnotation)
  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)

  const handleToggleEditable = useCallback(
    async (pressed: boolean) => {
      if (!annotation) return
      const data = AnnotationHandler.setEditability(annotation, !pressed)
      saveAnnotation(data, false)
      await update(data)
      if (!isSelected || pressed) cancelSelected(data)
    },
    [annotation, isSelected]
  )

  const handleToggleVisibility = useCallback(
    async (pressed: boolean) => {
      if (!annotation) return
      const data = AnnotationHandler.setVisibility(annotation, !pressed)
      saveAnnotation(data, false)
      await update(data)
      if (!isSelected || pressed) cancelSelected(data)
    },
    [annotation, isSelected]
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
      isSelected={isSelected}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      actions={
        <>
          <Toggle
            pressed={editability === 'locked'}
            onPressedChange={handleToggleEditable}
          >
            <Button ghost condensed>
              <Icon
                name={ANNOTATION_EDITABILITY_ICON_MAP[editability]}
                width={12}
                height={12}
                css={{ color: '$dark4' }}
              />
            </Button>
          </Toggle>

          <Toggle
            pressed={visibility === 'hidden'}
            onPressedChange={handleToggleVisibility}
          >
            <Button ghost condensed>
              <Icon
                name={ANNOTATION_VISIBILITY_ICON_MAP[visibility]}
                width={12}
                height={12}
                css={{ color: '$dark4' }}
              />
            </Button>
          </Toggle>
        </>
      }
      {...rest}
    >
      <Button ghost condensed onDoubleClick={handleZoomToAnnotation}>
        <Shape tag={tag} props={node.data?.shape || {}} />
      </Button>

      <Text variant="md">{node.text}</Text>

      <Chip small fromCss data-class-id={node.data?.class} />
    </TreeView.Node>
  )
}

export default memo(AnnotationItem) as typeof AnnotationItem
