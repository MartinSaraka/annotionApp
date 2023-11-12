import { styled } from '@renderer/styles'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export const Root = styled(DropdownMenu.Root, {
  position: 'relative'
})

export const Trigger = styled(DropdownMenu.Trigger, {})

export const Content = styled(DropdownMenu.Content, {})

export const Item = styled(DropdownMenu.Item, {})
