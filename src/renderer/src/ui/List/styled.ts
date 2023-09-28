import { motion } from 'framer-motion'
import { styled } from '@renderer/styles'

import * as Collapsible from '@radix-ui/react-collapsible'

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  paddingBlock: '$1',

  $$firstWidth: '56px',

  '& + &': {
    borderTopWidth: '$1',
    borderTopStyle: '$solid',
    borderTopColor: '$dark3'
  }
})

export const Trigger = styled(Collapsible.Trigger, {
  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',
  gap: '$4',

  width: '100%',
  textAlign: 'left',

  paddingInline: '$4',
  paddingBlock: '$3',

  '&:focus, &:active, &:active:focus': {
    outline: '1px solid #0074FF',
    outlineOffset: -1
  }
})

export const Content = styled(motion(Collapsible.Content), {
  display: 'flex',
  flexDirection: 'column',

  paddingInline: '$4',
  overflow: 'hidden',

  [`${Trigger} + & > *:first-of-type`]: {
    paddingTop: '$1'
  }
})

export const Box = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  gap: '$3',
  paddingBlock: '$3',

  '& + &': {
    borderTopWidth: '$1',
    borderTopStyle: '$solid',
    borderTopColor: '$dark3'
  }
})

export const Item = styled('div', {
  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',
  gap: '$2',

  '& > *:not(:first-child)': {
    flex: 1
  },

  '& > *:first-child': {
    width: '$$firstWidth'
  }
})
