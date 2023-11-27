import { MouseEventHandler, memo, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box, Button, Icon, Text } from '@renderer/ui'

import { ProcessType, TProcessStatus } from '@common/types/process'
import { PROCESS_ICON_MAP } from '@common/constants/processes'

import * as S from './styled'

type TBaseProps = {
  type: ProcessType
  title: string
  description: string
  isActive?: boolean
  status?: TProcessStatus['type']
  onStart?: () => void
  onStop?: () => void
}

type TIconType = ComponentProps<typeof Icon>['name']
type TStyledProps = ComponentProps<typeof S.Root>

type TProcessItemProps = TStyledProps & TBaseProps

const ProcessItem = ({
  type,
  title,
  description,
  onStart,
  onStop,
  status,
  ...rest
}: TProcessItemProps) => {
  const isActive = status && ['STARTED', 'PENDING', 'RETRY'].includes(status)

  const handleStart: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      if (isActive) return
      event.stopPropagation()
      onStart?.()
    },
    [onStart, isActive]
  )

  const handleStop: MouseEventHandler<HTMLElement> = useCallback(
    (event) => {
      if (!isActive) return
      event.stopPropagation()
      onStop?.()
    },
    [onStop, isActive]
  )

  return (
    <S.Root
      role="button"
      active={isActive}
      onClick={isActive ? undefined : handleStart}
      {...rest}
    >
      <Icon name={PROCESS_ICON_MAP[type] as TIconType} width={24} height={24} />

      <S.Content>
        <Box css={{ flexDirection: 'row', alignItems: 'center', gap: '$1' }}>
          <Icon
            name="AiIcon"
            width={13}
            height={13}
            css={{ color: '$blue2' }}
          />

          <Text variant="md" css={{ fontWeight: 500 }}>
            {title}
          </Text>
        </Box>

        <Text
          css={{
            color:
              status === 'SUCCESS'
                ? '$green9'
                : status === 'FAILURE'
                ? '$crimson4'
                : '$dark4'
          }}
        >
          {description}
        </Text>
      </S.Content>

      {status && ['SUCCESS', 'FAILURE'].includes(status) && (
        <Box css={{ padding: '$1', marginLeft: 'auto', marginRight: 0 }}>
          <Icon
            name={
              status === 'SUCCESS' ? 'CheckCircledIcon' : 'CrossCircledIcon'
            }
            css={{ color: status === 'SUCCESS' ? '$green9' : '$crimson4' }}
            width={13}
            height={13}
          />
        </Box>
      )}

      {status && ['PENDING', 'RETRY'].includes(status) && (
        <Button
          ghost
          condensed
          onClick={handleStop}
          css={{ marginLeft: 'auto', marginRight: 0 }}
        >
          <Icon
            name="StopIcon"
            width={13}
            height={13}
            css={{ color: '$blue2' }}
          />
        </Button>
      )}

      {!status && (
        <Button
          ghost
          condensed
          onClick={handleStart}
          css={{ marginLeft: 'auto', marginRight: 0 }}
        >
          <Icon
            name="PlayIcon"
            width={13}
            height={13}
            css={{ color: '$blue2' }}
          />
        </Button>
      )}
    </S.Root>
  )
}

export default memo(ProcessItem) as typeof ProcessItem
