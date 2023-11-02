import { memo, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, Chip, Icon, List, Popover } from '@renderer/ui'
import { SelectClassPopover } from '@renderer/popovers'

import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { AnnotationHandler } from '@renderer/handlers'

const Class = () => {
  const { t } = useTranslation(['annotation'])

  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)
  const annotation = useImageStore((state) => state.getSelectedAnnotation())
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

    const data = AnnotationHandler.upsertBody(
      annotation,
      'TextualBody',
      'tagging',
      ''
    )

    update(data).catch(console.error)
  }, [annotation, update])

  return (
    <Popover.Root>
      <Popover.Anchor>
        <List
          title={t('annotation:sections.class')}
          actions={
            <>
              <Popover.Trigger asChild ref={triggerRef}>
                <Button ghost condensed css={{ margin: '-$1' }}>
                  <Icon name="TokensIcon" width={16} height={16} />
                </Button>
              </Popover.Trigger>

              <Popover.Close ref={closeRef} css={{ display: 'none' }} />
            </>
          }
        >
          {currentClass && (
            <List.Box>
              <List.Item
                css={{ $$firstWidth: 'auto' }}
                hoverOutline
                actions={
                  <Button ghost condensed onClick={handleRemoveClass}>
                    <Icon
                      name="MinusIcon"
                      css={{ color: '$light' }}
                      width={16}
                      height={16}
                    />
                  </Button>
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
