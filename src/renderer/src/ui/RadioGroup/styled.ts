import { styled } from '@renderer/styles'

import * as RadioGroup from '@radix-ui/react-radio-group'

export const Root = styled(RadioGroup.Root, {
  position: 'relative'
})

export const Item = styled(RadioGroup.Item, {})

export const Indicator = styled(RadioGroup.Indicator, {})
