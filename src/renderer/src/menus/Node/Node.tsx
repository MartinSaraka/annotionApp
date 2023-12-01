import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { type NodeModel } from '@minoru/react-dnd-treeview'

import { Box, ContextMenu, Icon, Kbd, Text } from '@renderer/ui'

import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler, AnnotoriousHandler } from '@renderer/handlers'
import { type TNodeData } from '@renderer/adapters/TreeAdapter'

import { type TAnnotation } from '@common/types/annotation'
import {
  isAnnotationEditable,
  isAnnotationVisible
} from '@common/utils/annotation'

import { HOTKEYS } from '@common/constants/hotkeys'

type TNodeProps = {
  node: NodeModel<TNodeData>
}

const Node = ({ node }: TNodeProps) => {
  const { t } = useTranslation('common')

  const annotationId = node.id as TID
  const editability = node.data?.editability
  const visibility = node.data?.visibility

  const annotorious = useAnnotoriousStore((state) => state.anno)
  const cancelSelected = useAnnotoriousStore((state) => state.cancelIfSelected)
  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)
  const removeAnnotationFromAnnotorious = useAnnotoriousStore(
    (state) => state.removeAnnotation
  )

  const saveAnnotation = useImageStore((state) => state.saveAnnotation)
  const getSelected = useImageStore((state) => state.getSelectedAnnotation)
  const annotation = useImageStore((state) => state.getAnnotation(annotationId))
  const removeAnnotationFromStore = useImageStore(
    (state) => (annotation: TAnnotation) => {
      state.deselectAnnotations()
      state.removeAnnotation(annotation.id)
    }
  )

  const annotoriousHandler = AnnotoriousHandler.instance(annotorious)

  const handleZoomToAnnotation = useCallback(() => {
    if (!annotation) return
    annotoriousHandler.zoomToAnnotation(annotation)
  }, [annotation, annotoriousHandler])

  const handleToggleEditable = useCallback(async () => {
    if (!annotation || !node.data) return
    const pressed = isAnnotationEditable(node.data?.editability)
    const data = AnnotationHandler.setEditability(annotation, !pressed)

    saveAnnotation(data, false)
    await update(data)

    const isSelected = getSelected()?.id === annotation.id
    if (!isSelected || pressed) cancelSelected(data)
  }, [annotation])

  const handleToggleVisibility = useCallback(async () => {
    if (!annotation || !node.data) return
    const pressed = isAnnotationVisible(node.data?.visibility)
    const data = AnnotationHandler.setVisibility(annotation, !pressed)

    saveAnnotation(data, false)
    await update(data)

    const isSelected = getSelected()?.id === annotation.id
    if (!isSelected || pressed) cancelSelected(data)
  }, [annotation])

  const handleDelete = useCallback(() => {
    if (!annotation) return
    removeAnnotationFromStore(annotation)
    removeAnnotationFromAnnotorious(annotation)
  }, [annotation])

  return (
    <>
      <ContextMenu.Item onSelect={handleZoomToAnnotation}>
        <Text>{t('actions.zoomToAnnotation')}</Text>
      </ContextMenu.Item>

      <ContextMenu.Separator />

      <ContextMenu.Item onSelect={handleToggleEditable}>
        <Text>
          {t(`actions.editability.${isAnnotationEditable(editability)}`)}
        </Text>

        <Kbd keys={HOTKEYS.editability} />
      </ContextMenu.Item>

      <ContextMenu.Item onSelect={handleToggleVisibility}>
        <Text>
          {t(`actions.visibility.${isAnnotationVisible(visibility)}`)}
        </Text>

        <Kbd keys={HOTKEYS.visibility} />
      </ContextMenu.Item>

      <ContextMenu.Separator />

      <ContextMenu.Item
        css={{ $$bg: '$colors$crimson1', $$fg: '$colors$crimson4' }}
        onSelect={handleDelete}
      >
        <Box css={{ flexDirection: 'row', alignItems: 'center', gap: '$2' }}>
          <Icon name="TrashIcon" width={12} height={12} />

          <Text>{t('actions.deleteAnnotation')}</Text>
        </Box>

        <Kbd keys={HOTKEYS.delete} />
      </ContextMenu.Item>
    </>
  )
}

export default memo(Node) as typeof Node
