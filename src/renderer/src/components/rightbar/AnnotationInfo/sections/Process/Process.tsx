import { memo, useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Icon, List, Popover } from '@renderer/ui'
import { ProcessItem } from '@renderer/components'
import { SelectProcessPopover } from '@renderer/popovers'

import { useImageStore, useProcessStore } from '@renderer/store'
import { TProcess } from '@common/types/process'

const Process = () => {
  const { t } = useTranslation(['process'])

  const closeRef = useRef<HTMLButtonElement | null>(null)

  const annotation = useImageStore((state) => state.getSelectedAnnotation())
  const activeProcesses = useProcessStore((state) =>
    annotation ? state.getAnnotationProcesses(annotation.id) : []
  )

  const handleClosePopover = useCallback(() => {
    closeRef.current?.click()
  }, [closeRef])

  const renderActiveProcess = useCallback(
    (process: TProcess) => (
      <ProcessItem
        key={`${process.type}-${process.annotationId}`}
        type={process.type}
        isActive={!['SUCCESS', 'FINISHED'].includes(process.status.type)}
        title={t(`process:processes.${process.type}.title`)}
        description={process.status.message}
      />
    ),
    [t]
  )

  return (
    <Popover.Root>
      <Popover.Anchor>
        <List
          title={
            <Box
              css={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '$1'
              }}
            >
              <Icon
                name="AiIcon"
                width={13}
                height={13}
                css={{ color: '$blue2' }}
              />

              <span>Processes</span>
            </Box>
          }
          actions={
            <>
              <Popover.Trigger asChild>
                <Button ghost condensed css={{ margin: '-$1' }}>
                  <Icon name="TokensIcon" width={16} height={16} />
                </Button>
              </Popover.Trigger>

              <Popover.Close ref={closeRef} css={{ display: 'none' }} />
            </>
          }
        >
          {!!activeProcesses.length && (
            <List.Box css={{ flex: 1 }}>
              {activeProcesses?.map(renderActiveProcess)}
            </List.Box>
          )}
        </List>
      </Popover.Anchor>

      <Popover.Content>
        <SelectProcessPopover onClose={handleClosePopover} />
      </Popover.Content>
    </Popover.Root>
  )
}

export default memo(Process)
