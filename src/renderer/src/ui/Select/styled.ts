import { styled } from '@renderer/styles'

import * as Select from '@radix-ui/react-select'

export const Root = styled(Select.Root, {
  position: 'relative'
})

export const Trigger = styled(Select.Trigger, {
  display: 'inline-flex',
  cursor: 'pointer'
})

export const Value = styled(Select.Value, {})

export const Item = styled(Select.Item, {
  cursor: 'pointer'
})

export const Icon = styled(Select.Icon, {})

export const Content = styled(Select.Content, {})

export const Viewport = styled(Select.Viewport, {
  display: 'flex',
  flexDirection: 'column'
})
