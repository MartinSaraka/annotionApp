import { styled } from '@renderer/styles'

import * as Select from '@radix-ui/react-select'

export const Root = styled(Select.Root, {
  position: 'relative'
})

export const Trigger = styled(Select.Trigger, {})

export const Value = styled(Select.Value, {})

export const Item = styled(Select.Item, {})

export const Icon = styled(Select.Icon, {
  position: 'absolute',
  bottom: 1.5,
  right: 1.5
})

export const Content = styled(Select.Content, {
  backgroundColor: '$dark2',
  paddingBlock: '$1',
  paddingInline: '$1',
  borderRadius: '$7'
})

export const Viewport = styled(Select.Viewport, {
  display: 'flex',
  gap: '$1'
})
