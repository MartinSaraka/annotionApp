import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, ContextMenu, Icon, Text } from '@renderer/ui'
import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler } from '@renderer/handlers'

import {
  isAnnotationEditable,
  isAnnotationVisible
} from '@common/utils/annotation'

import { EToolType } from '@common/constants/tools'
import {
  type TAnnotation,
  type TAnnotationClass
} from '@common/types/annotation'

type TViewerProps = {
  annotationId?: TID
}

const Viewer = ({ annotationId }: TViewerProps) => {
  const { t } = useTranslation(['common', 'annotation'])

  const annotorious = useAnnotoriousStore((state) => state.anno)
  const cancelSelected = useAnnotoriousStore((state) => state.cancelIfSelected)
  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)

  const saveAnnotation = useImageStore((state) => state.saveAnnotation)
  const getSelected = useImageStore((state) => state.getSelectedAnnotation)
  const annotation = useImageStore(
    (state) => !!annotationId && state.getAnnotation(annotationId)
  )

  const classes = useImageStore((state) => state.getClasses())
  const setActiveClass = useImageStore((state) => state.setActiveClass)
  const resetActiveClass = useImageStore((state) => state.resetActiveClass)
  const activeTool = useImageStore((state) => state.activeTool())

  const body =
    !!annotation &&
    AnnotationHandler.getBody(annotation, ['editability', 'visibility'])

  // REMOVE ANNOTATION
  const removeAnnotationFromAnnotorious = useAnnotoriousStore(
    (state) => state.removeAnnotation
  )
  const removeAnnotationFromStore = useImageStore(
    (state) => (annotation: TAnnotation) => {
      state.deselectAnnotations()
      state.removeAnnotation(annotation.id)
    }
  )

  const setInitialZoom = useCallback(() => {
    if (!annotorious._app.current.__v.props.viewer.viewport) return
    annotorious._app.current.__v.props.viewer.viewport.goHome()
  }, [annotorious])

  const handleZoom = useCallback(
    (direction: 'in' | 'out') => () => {
      if (!annotorious._app.current.__v.props.viewer.viewport) return
      const viewport = annotorious._app.current.__v.props.viewer.viewport
      const maxZoom = viewport.maxZoomPixelRatio
      const minZoom = viewport.minZoomImageRatio
      const currentZoom = viewport.getZoom()
      if (currentZoom * 2 <= maxZoom && direction === 'in') {
        viewport.zoomBy(2)
      } else if (currentZoom * 0.5 >= minZoom && direction === 'out') {
        viewport.zoomBy(0.5)
      }
    },
    [annotorious]
  )

  const handleToggleEditable = useCallback(async () => {
    if (!annotation || body === false) return
    const pressed = isAnnotationEditable(body?.editability)
    const data = AnnotationHandler.setEditability(annotation, !pressed)

    saveAnnotation(data, false)
    await update(data)

    const isSelected = getSelected()?.id === annotation.id
    if (!isSelected || pressed) cancelSelected(data)
  }, [annotation])

  const handleToggleVisibility = useCallback(async () => {
    if (!annotation || body === false) return
    const pressed = isAnnotationVisible(body?.visibility)
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

  const handleActiveClass = useCallback(
    (value: string) => () => {
      if (value === '-') return resetActiveClass()
      setActiveClass(value)
    },
    [resetActiveClass, setActiveClass]
  )

  const renderClass = useCallback(
    (item: TAnnotationClass) => (
      <ContextMenu.Item
        key={`contextMenu-${item.id}`}
        onSelect={handleActiveClass(item.id)}
        css={{ $$fg: item.color }}
      >
        <Text>{item.name}</Text>
      </ContextMenu.Item>
    ),
    [handleActiveClass]
  )

  return (
    <>
      <ContextMenu.Item onSelect={setInitialZoom}>
        <Text>{t('tooltips.fitToScreen')}</Text>
      </ContextMenu.Item>

      <ContextMenu.Separator />

      <ContextMenu.Item onSelect={handleZoom('in')}>
        <Box css={{ flexDirection: 'row', alignItems: 'center', gap: '$2' }}>
          <Icon name="ZoomInIcon" width={12} height={12} />

          <Text>{t('actions.zoomIn')}</Text>
        </Box>
      </ContextMenu.Item>

      <ContextMenu.Item onSelect={handleZoom('out')}>
        <Box css={{ flexDirection: 'row', alignItems: 'center', gap: '$2' }}>
          <Icon name="ZoomOutIcon" width={12} height={12} />

          <Text>{t('actions.zoomOut')}</Text>
        </Box>
      </ContextMenu.Item>

      {activeTool.type === EToolType.ANNOTATION && (
        <>
          <ContextMenu.Separator />

          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>
              <Text>{t('tooltips.class.select')}</Text>
            </ContextMenu.SubTrigger>

            <ContextMenu.SubContent sideOffset={2} alignOffset={-5}>
              <ContextMenu.Item onSelect={handleActiveClass('-')}>
                <Text>{t('annotation:properties.class.empty')}</Text>
              </ContextMenu.Item>

              {classes.map(renderClass)}
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </>
      )}

      {annotation && body !== false && (
        <>
          <ContextMenu.Separator />

          <ContextMenu.Item onSelect={handleToggleEditable}>
            <Text>
              {t(
                `actions.editability.${isAnnotationEditable(body.editability)}`
              )}
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Item onSelect={handleToggleVisibility}>
            <Text>
              {t(`actions.visibility.${isAnnotationVisible(body.visibility)}`)}
            </Text>
          </ContextMenu.Item>

          <ContextMenu.Separator />

          <ContextMenu.Item
            css={{ $$bg: '$colors$crimson1', $$fg: '$colors$crimson4' }}
            onSelect={handleDelete}
          >
            <Box
              css={{ flexDirection: 'row', alignItems: 'center', gap: '$2' }}
            >
              <Icon name="TrashIcon" width={12} height={12} />

              <Text>{t('actions.deleteAnnotation')}</Text>
            </Box>
          </ContextMenu.Item>
        </>
      )}
    </>
  )
}

export default memo(Viewer) as typeof Viewer
