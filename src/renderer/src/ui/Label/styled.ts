import { styled } from '@renderer/styles'

import * as Label from '@radix-ui/react-label'

export const Root = styled(Label.Root, {
  display: 'inline-flex',
  flexShrink: 0,

  fontSize: '$5',
  fontWeight: 400,
  lineHeight: '$none',

  color: '$dark4',
  textTransform: 'capitalize',

  variants: {
    small: {
      true: {
        fontSize: '$4'
      }
    }
  }
})
