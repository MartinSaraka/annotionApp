import { styled } from '@renderer/styles'

import * as Popover from '@radix-ui/react-popover'

export const Root = styled(Popover.Root, {
  position: 'relative'
})

export const Trigger = styled(Popover.Trigger, {})

export const Anchor = styled(Popover.Anchor, {})

export const Close = styled(Popover.Close, {})

export const Content = styled(Popover.Content, {
  borderWidth: '$1',
  borderStyle: '$solid',
  borderColor: '$dark3',

  backgroundColor: '$dark1',
  borderTopLeftRadius: '$2',
  borderBottomLeftRadius: '$2',

  $$width: '280px',
  minWidth: '$$width'
})
