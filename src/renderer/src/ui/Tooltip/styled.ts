import { styled } from '@renderer/styles'

import * as Tooltip from '@radix-ui/react-tooltip'

export const Root = styled(Tooltip.Root, {
  position: 'relative'
})

export const Trigger = styled(Tooltip.Trigger, {})

export const Content = styled(Tooltip.Content, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  gap: '$2',
  paddingBlock: '2px',
  paddingInline: '$2',

  backgroundColor: '$dark1',
  borderRadius: '$6',

  borderWidth: '$1',
  borderStyle: '$solid',
  borderColor: '$dark3'
})

export const Arrow = styled(Tooltip.Arrow, {})
