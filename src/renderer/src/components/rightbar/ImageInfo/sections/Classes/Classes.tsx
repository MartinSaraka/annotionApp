import { memo, useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { Button, Chip, Icon, List, Popover, Text, Tooltip } from '@renderer/ui'
import { UpsertClassPopover } from '@renderer/popovers'
import { useToggle } from '@renderer/hooks'

import { useImageStore } from '@renderer/store'
import { ClassHandler } from '@renderer/handlers'

import { isDefaultClass } from '@common/utils/classes'
import { type TAnnotationClass } from '@common/types/annotation'

import { DEFAULT_CLASSES } from '@common/constants/classes'

const Classes = () => {
  const { t } = useTranslation(['common', 'image'])
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const { visible: systemClasses, show: showSystemClasses } = useToggle()
  const [selected, setSelected] = useState<TAnnotationClass | undefined>()

  const classes = useImageStore((state) => state.getClasses())
  const deleteClass = useImageStore((state) => state.deleteClass)

  const areOnlySystemClasses = useMemo(
    () =>
      classes.length === Object.keys(DEFAULT_CLASSES).length &&
      classes.every(isDefaultClass),
    [classes]
  )

  const handleSelectClass = useCallback(
    (item: TAnnotationClass) => () => {
      setSelected(item)
      triggerRef.current?.click()
    },
    [triggerRef, setSelected]
  )

  const handleUnselectClass = useCallback(
    (state: boolean) => {
      if (!state) setSelected(undefined)
    },
    [setSelected]
  )

  const handleDeleteClass = useCallback(
    (item: TAnnotationClass) => () => {
      const deleted = deleteClass(item)
      if (deleted) ClassHandler.deleteClass(deleted)
    },
    [deleteClass]
  )

  const renderClasses = useCallback(
    (item: (typeof classes)[number]) => {
      const isSystemClass = isDefaultClass(item)
      const skipClass = isSystemClass && !systemClasses && !areOnlySystemClasses

      if (skipClass) return null

      return (
        <List.Item
          key={item.id}
          css={{ $$firstWidth: 'auto' }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          hoverOutline
          actions={
            <>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Button ghost condensed onClick={handleSelectClass(item)}>
                    <Icon
                      name="MixerVerticalIcon"
                      css={{ color: '$light' }}
                      width={16}
                      height={16}
                    />
                  </Button>
                </Tooltip.Trigger>

                <Tooltip.Content side="top" align="end">
                  <Text>{t('tooltips.class.edit')}</Text>
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Root>

              {!isSystemClass && (
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Button ghost condensed onClick={handleDeleteClass(item)}>
                      <Icon
                        name="TrashIcon"
                        css={{ color: '$crimson4' }}
                        width={16}
                        height={16}
                      />
                    </Button>
                  </Tooltip.Trigger>

                  <Tooltip.Content side="top" align="end">
                    <Text>{t('tooltips.class.delete')}</Text>
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Root>
              )}
            </>
          }
        >
          <Chip
            small
            auto
            css={{ $$color: item.color, cursor: 'pointer' }}
            data-class-id={item.id}
            onClick={handleSelectClass(item)}
          >
            {item.name}
          </Chip>
        </List.Item>
      )
    },
    [handleSelectClass, systemClasses, areOnlySystemClasses]
  )

  return (
    <Popover.Root onOpenChange={handleUnselectClass}>
      <Popover.Anchor>
        <List
          title={t('image:sections.classes')}
          actions={
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Popover.Trigger asChild ref={triggerRef}>
                  {classes.length ? (
                    <Button ghost condensed css={{ margin: '-$1' }}>
                      <Icon name="PlusIcon" width={16} height={16} />
                    </Button>
                  ) : (
                    <Button slim outlined css={{ marginBlock: '-$1' }}>
                      <Icon name="PlusIcon" width={12} height={12} />
                      {t('tooltips.class.createFirst')}
                    </Button>
                  )}
                </Popover.Trigger>
              </Tooltip.Trigger>

              <Tooltip.Content>
                <Text>{t('tooltips.class.createNew')}</Text>
                <Tooltip.Arrow />
              </Tooltip.Content>
            </Tooltip.Root>
          }
        >
          {!systemClasses && !areOnlySystemClasses && (
            <Text
              as="button"
              css={{ color: '$dark4', textAlign: 'left', fontWeight: 500 }}
              onClick={showSystemClasses}
            >
              {t('actions.class.showSystem', {
                count: Object.keys(DEFAULT_CLASSES).length
              })}
            </Text>
          )}

          <List.Box css={{ $$gap: 0 }}>
            <AnimatePresence>{classes.map(renderClasses)}</AnimatePresence>
          </List.Box>
        </List>
      </Popover.Anchor>

      <Popover.Content>
        <UpsertClassPopover data={selected} />
      </Popover.Content>
    </Popover.Root>
  )
}

export default memo(Classes)
