import { memo, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Box,
  Button,
  Chip,
  Icon,
  List,
  Popover,
  Text,
  Tooltip
} from '@renderer/ui'
import { SelectClassPopover } from '@renderer/popovers'

import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler } from '@renderer/handlers'

const Class = () => {
  const { t } = useTranslation(['annotation'])

  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)
  const annotation = useImageStore((state) => state.getSelectedAnnotation())

  const annotationBody = AnnotationHandler.getBody(annotation, ['subtagging'])
  const currentClass = useImageStore((state) =>
    state.getSelectedAnnotationClass()
  )

  const handleOpenPopover = useCallback(() => {
    triggerRef.current?.click()
  }, [triggerRef])

  const handleClosePopover = useCallback(() => {
    closeRef.current?.click()
  }, [closeRef])

  const handleRemoveClass = useCallback(() => {
    if (!annotation) return

    const withoutTagging = AnnotationHandler.upsertBody(
      annotation,
      'TextualBody',
      'tagging',
      ''
    )

    const withoutSubtagging = AnnotationHandler.upsertBody(
      withoutTagging,
      'TextualBody',
      'subtagging',
      ''
    )

    update(withoutSubtagging).catch(console.error)
  }, [annotation, update])

  const handleRemoveSubTag = useCallback(() => {
    if (!annotation) return

    const withoutSubtagging = AnnotationHandler.upsertBody(
      annotation,
      'TextualBody',
      'subtagging',
      ''
    )

    update(withoutSubtagging).catch(console.error)
  }, [annotation, update])

  return (
    <Popover.Root>
      <Popover.Anchor>
        <List
          title={t('annotation:sections.class')}
          actions={
            <>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Popover.Trigger asChild ref={triggerRef}>
                    <Button ghost condensed css={{ margin: '-$1' }}>
                      <Icon name="TokensIcon" width={16} height={16} />
                    </Button>
                  </Popover.Trigger>
                </Tooltip.Trigger>

                <Tooltip.Content>
                  <Text variant="base">Select class</Text>
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Root>

              <Popover.Close ref={closeRef} css={{ display: 'none' }} />
            </>
          }
        >
          {currentClass && (
            <List.Box css={{ $$gap: 0 }}>
              <List.Item
                css={{ $$firstWidth: 'auto' }}
                hoverOutline
                actions={
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Button ghost condensed onClick={handleRemoveClass}>
                        <Icon
                          name="MinusIcon"
                          css={{ color: '$light' }}
                          width={16}
                          height={16}
                        />
                      </Button>
                    </Tooltip.Trigger>

                    <Tooltip.Content>
                      <Text variant="base">Remove class</Text>
                      <Tooltip.Arrow />
                    </Tooltip.Content>
                  </Tooltip.Root>
                }
              >
                <Chip
                  small
                  auto
                  css={{ $$color: currentClass.color, cursor: 'pointer' }}
                  onClick={handleOpenPopover}
                >
                  {currentClass.name}
                </Chip>
              </List.Item>

              {annotationBody.subtagging && (
                <List.Item
                  css={{ $$firstWidth: 'auto' }}
                  actions={
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Button ghost condensed onClick={handleRemoveSubTag}>
                          <Icon
                            name="MinusIcon"
                            css={{ color: '$light' }}
                            width={16}
                            height={16}
                          />
                        </Button>
                      </Tooltip.Trigger>

                      <Tooltip.Content>
                        <Text variant="base">Remove tag</Text>
                        <Tooltip.Arrow />
                      </Tooltip.Content>
                    </Tooltip.Root>
                  }
                >
                  <Box
                    css={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: '$2',
                      gap: '$2'
                    }}
                  >
                    <Box
                      css={{
                        width: 1,
                        height: 15,
                        background: '$dark3'
                      }}
                    />

                    <Text css={{ color: '$dark4' }}>with confidence</Text>

                    <Chip small css={{ gap: 2 }}>
                      <Icon name="AiIcon" width={11} height={11} />
                      {annotationBody.subtagging}
                    </Chip>
                  </Box>
                </List.Item>
              )}
            </List.Box>
          )}
        </List>
      </Popover.Anchor>

      <Popover.Content>
        <SelectClassPopover
          selectedClass={currentClass}
          onClose={handleClosePopover}
        />
      </Popover.Content>
    </Popover.Root>
  )
}

export default memo(Class)
