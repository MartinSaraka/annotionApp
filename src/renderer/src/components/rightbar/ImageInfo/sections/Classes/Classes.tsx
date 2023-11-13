import { memo, useCallback, useRef, useState } from 'react'

import { Button, Chip, Icon, List, Popover } from '@renderer/ui'
import { useImageStore } from '@renderer/store'
import { UpsertClassPopover } from '@renderer/popovers'
import { TAnnotationClass } from '@common/types/annotation'
import { ClassHandler } from '@renderer/handlers'
import { isDefaultClass } from '@common/utils/classes'

const Classes = () => {
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const [selected, setSelected] = useState<TAnnotationClass | undefined>()

  const classes = useImageStore((state) => state.getClasses())
  const deleteClass = useImageStore((state) => state.deleteClass)

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
    (item: (typeof classes)[number]) => (
      <List.Item
        key={item.id}
        css={{ $$firstWidth: 'auto' }}
        hoverOutline
        actions={
          <>
            <Button ghost condensed onClick={handleSelectClass(item)}>
              <Icon
                name="MixerVerticalIcon"
                css={{ color: '$light' }}
                width={16}
                height={16}
              />
            </Button>

            {!isDefaultClass(item) && (
              <Button ghost condensed onClick={handleDeleteClass(item)}>
                <Icon
                  name="TrashIcon"
                  css={{ color: '$crimson4' }}
                  width={16}
                  height={16}
                />
              </Button>
            )}
          </>
        }
      >
        <Chip small auto css={{ $$color: item.color }} data-class-id={item.id}>
          {item.name}
        </Chip>
      </List.Item>
    ),
    [handleSelectClass]
  )

  return (
    <Popover.Root onOpenChange={handleUnselectClass}>
      <Popover.Anchor>
        <List
          title="Classes"
          actions={
            <Popover.Trigger asChild ref={triggerRef}>
              {classes.length ? (
                <Button ghost condensed css={{ margin: '-$1' }}>
                  <Icon name="PlusIcon" width={16} height={16} />
                </Button>
              ) : (
                <Button slim outlined css={{ marginBlock: '-$1' }}>
                  <Icon name="PlusIcon" width={12} height={12} />
                  Create first class
                </Button>
              )}
            </Popover.Trigger>
          }
        >
          {!!classes.length && (
            <List.Box css={{ $$gap: 0 }}>{classes.map(renderClasses)}</List.Box>
          )}
        </List>
      </Popover.Anchor>

      <Popover.Content>
        <UpsertClassPopover data={selected} />
      </Popover.Content>
    </Popover.Root>
  )
}

export default memo(Classes)
