import { memo, useCallback, useMemo } from 'react'
import { ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Icon, Text, Toggle } from '@renderer/ui'
import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler } from '@renderer/handlers'

import { AnnotationUtils } from '@common/utils'
import { TAnnotation } from '@common/types/annotation'
import {
  getAnnotationEditabilityIcon,
  getAnnotationVisibilityIcon,
  isAnnotationEditable,
  isAnnotationVisible
} from '@common/utils/annotation'

import * as S from './styled'

type TIcon = ComponentProps<typeof Icon>['name']

const Preview = () => {
  const { t } = useTranslation(['annotation'])

  // ANNOTATION
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

  // SAVE ANNOTATION
  const cancelSelected = useAnnotoriousStore((state) => state.cancelIfSelected)
  const saveAnnotation = useImageStore((state) => state.saveAnnotation)
  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)

  // ANNOTATION HANDLERS
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
          <Toggle
            pressed={!isAnnotationEditable(annotationBody.editability)}
            onPressedChange={handleToggleEditable}
          >
            <Button ghost toggle>
              <Icon
                name={getAnnotationEditabilityIcon(annotationBody.editability)}
                width={18}
                height={18}
                css={{ color: '$dark4' }}
              />
            </Button>
          </Toggle>

          <Toggle
            pressed={!isAnnotationVisible(annotationBody.visibility)}
            onPressedChange={handleToggleVisibility}
          >
            <Button ghost toggle>
              <Icon
                name={getAnnotationVisibilityIcon(annotationBody.visibility)}
                width={18}
                height={18}
                css={{ color: '$dark4' }}
              />
            </Button>
          </Toggle>

          <Button ghost variant="danger" onClick={handleDelete}>
            <Icon name="TrashIcon" width={18} height={18} />
          </Button>
        </Box>
      </Box>
    </S.Root>
  )
}

export default memo(Preview)
