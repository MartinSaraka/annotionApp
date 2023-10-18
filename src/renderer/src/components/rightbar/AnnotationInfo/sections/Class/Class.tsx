import { memo, useCallback, useRef } from 'react'

import { Button, Chip, Icon, List, Popover } from '@renderer/ui'
import { useAnnotoriousStore, useImageStore } from '@renderer/store'
import { useTranslation } from 'react-i18next'
import { SelectClassPopover } from '@renderer/popovers'
import { AnnotationService } from '@renderer/services'

const Class = () => {
  const { t } = useTranslation(['annotation'])

  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const update = useAnnotoriousStore((state) => state.saveAndUpdateAnnotation)
  const annotation = useImageStore((state) => state.getSelectedAnnotation())
  const currentClass = useImageStore((state) =>
    state.getSelectedAnnotationClass()
  )

  const handleOpenPopover = useCallback(() => {
    triggerRef.current?.click()
  }, [triggerRef])

  const handleRemoveClass = useCallback(() => {
    if (!annotation) return

    const data = AnnotationService.annotation(annotation)
      .upsertBody({
        type: 'TextualBody',
        purpose: 'tagging',
        value: ''
      })
      .get()

    update(data).catch(console.error)
  }, [annotation, update])

  return (
    <Popover.Root>
      <Popover.Anchor>
        <List
          title={t('annotation:sections.class')}
          actions={
            <Popover.Trigger asChild ref={triggerRef}>
              <Button ghost condensed css={{ margin: '-$1' }}>
                <Icon name="TokensIcon" width={16} height={16} />
              </Button>
            </Popover.Trigger>
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
        <SelectClassPopover selectedClass={currentClass} />
      </Popover.Content>
    </Popover.Root>
  )
}

export default memo(Class)
