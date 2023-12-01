import { memo, useCallback, useEffect, useMemo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Icon, Kbd, Text, Toggle, Tooltip } from '@renderer/ui'

import {
  useAnnotoriousStore,
  useHotkeysStore,
  useImageStore
} from '@renderer/store'
import { AnnotationHandler } from '@renderer/handlers'

import { type TAnnotation } from '@common/types/annotation'

import { AnnotationUtils } from '@common/utils'
import {
  getAnnotationEditabilityIcon,
  getAnnotationVisibilityIcon,
  isAnnotationEditable,
  isAnnotationVisible
} from '@common/utils/annotation'

import { HOTKEYS } from '@common/constants/hotkeys'

import * as S from './styled'

type TIcon = ComponentProps<typeof Icon>['name']

const Preview = () => {
  const { t } = useTranslation(['common', 'annotation'])

  const { addShortcut, removeShortcut } = useHotkeysStore()

  const annotation = useImageStore((state) => state.getSelectedAnnotation())
  const annotationBody = AnnotationHandler.getBody(annotation, [
    'editability',
    'visibility'
  ])

  const type = useMemo(() => {
    if (!annotation) return null
    const utils = AnnotationUtils.from(annotation)
    return { value: utils.type, icon: utils.icon as TIcon } as const
  }, [annotation])

  const removeAnnotationFromAnnotorious = useAnnotoriousStore(
    (state) => state.removeAnnotation
  )
  const removeAnnotationFromStore = useImageStore(
    (state) => (annotation: TAnnotation) => {
      state.deselectAnnotations()
      state.removeAnnotation(annotation.id)
    }
  )

  const cancelSelected = useAnnotoriousStore((state) => state.cancelIfSelected)
  const saveAnnotation = useImageStore((state) => state.saveAnnotation)
  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)

  const handleToggleEditable = useCallback(
    async (pressed: boolean) => {
      if (!annotation) return
      const data = AnnotationHandler.setEditability(annotation, !pressed)
      saveAnnotation(data, false)
      await update(data)
      if (pressed) cancelSelected(data)
    },
    [annotation]
  )

  const handleToggleVisibility = useCallback(
    async (pressed: boolean) => {
      if (!annotation) return
      const data = AnnotationHandler.setVisibility(annotation, !pressed)
      saveAnnotation(data, false)
      await update(data)
      cancelSelected(data)
      if (pressed) cancelSelected(data)
    },
    [annotation]
  )

  const handleDelete = useCallback(() => {
    if (!annotation) return
    removeAnnotationFromStore(annotation)
    removeAnnotationFromAnnotorious(annotation)
  }, [annotation])

  const switchEditability = useCallback(async () => {
    if (!annotation) return
    const pressed = isAnnotationEditable(annotationBody.editability)
    const data = AnnotationHandler.setEditability(annotation, !pressed)
    saveAnnotation(data, false)
    await update(data)
    if (pressed) cancelSelected(data)
  }, [annotation, annotationBody.editability])

  const switchVisibility = useCallback(async () => {
    if (!annotation) return
    const pressed = isAnnotationVisible(annotationBody.visibility)
    const data = AnnotationHandler.setVisibility(annotation, !pressed)
    saveAnnotation(data, false)
    await update(data)
    cancelSelected(data)
    if (pressed) cancelSelected(data)
  }, [annotation, annotationBody.visibility])

  useEffect(() => {
    addShortcut(HOTKEYS.editability, switchEditability)
    addShortcut(HOTKEYS.visibility, switchVisibility)
    addShortcut(HOTKEYS.delete, handleDelete)

    return () => {
      removeShortcut(HOTKEYS.editability)
      removeShortcut(HOTKEYS.visibility)
      removeShortcut(HOTKEYS.delete)
    }
  }, [
    addShortcut,
    removeShortcut,
    switchEditability,
    switchVisibility,
    handleDelete
  ])

  return (
    <S.Root>
      <Box
        css={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '$2'
        }}
      >
        <Box>
          {type && (
            <Box
              css={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 'calc($1 + 2px)'
              }}
            >
              <Icon name={type.icon} width={16} height={16} />

              <Text variant="md" capital>
                {t(`annotation:properties.type.${type.value}`)}
              </Text>
            </Box>
          )}
        </Box>

        <Box css={{ flexDirection: 'row', gap: '$2' }}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toggle
                pressed={!isAnnotationEditable(annotationBody.editability)}
                onPressedChange={handleToggleEditable}
              >
                <Button ghost toggle>
                  <Icon
                    name={getAnnotationEditabilityIcon(
                      annotationBody.editability
                    )}
                    width={18}
                    height={18}
                    css={{ color: '$dark4' }}
                  />
                </Button>
              </Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text>
                {t(
                  `actions.editability.${isAnnotationEditable(
                    annotationBody.editability
                  )}`
                )}
              </Text>
              <Kbd keys={HOTKEYS.editability} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Toggle
                pressed={!isAnnotationVisible(annotationBody.visibility)}
                onPressedChange={handleToggleVisibility}
              >
                <Button ghost toggle>
                  <Icon
                    name={getAnnotationVisibilityIcon(
                      annotationBody.visibility
                    )}
                    width={18}
                    height={18}
                    css={{ color: '$dark4' }}
                  />
                </Button>
              </Toggle>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text>
                {t(
                  `actions.visibility.${isAnnotationVisible(
                    annotationBody.visibility
                  )}`
                )}
              </Text>
              <Kbd keys={HOTKEYS.visibility} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>

          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button ghost variant="danger" onClick={handleDelete}>
                <Icon name="TrashIcon" width={18} height={18} />
              </Button>
            </Tooltip.Trigger>

            <Tooltip.Content side="bottom" align="center">
              <Text>{t('actions.deleteAnnotation')}</Text>
              <Kbd keys={HOTKEYS.delete} css={{ color: '$dark4' }} />
              <Tooltip.Arrow />
            </Tooltip.Content>
          </Tooltip.Root>
        </Box>
      </Box>
    </S.Root>
  )
}

export default memo(Preview)
