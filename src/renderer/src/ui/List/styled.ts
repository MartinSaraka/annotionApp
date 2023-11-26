import { motion } from 'framer-motion'
import { styled } from '@renderer/styles'

import * as Collapsible from '@radix-ui/react-collapsible'

export const Trigger = styled('header', {
  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',
  gap: '$4',

  cursor: 'pointer',
  userSelect: 'none',

  width: '100%',
  textAlign: 'left',

  paddingInline: '$4',
  paddingBlock: '$3',

  '&&:focus, &&:active, &&:active:focus': {
    outlineWidth: 1,
    outlineOffset: '-2px'
  },

  '&[data-disabled]': {
    cursor: 'default'
  }
})

export const Box = styled('div', {
  $$gap: '$space$3',

  display: 'flex',
  flexDirection: 'column',

  gap: '$$gap',
  paddingBlock: '$3',

  '& + &': {
    borderTopWidth: '$1',
    borderTopStyle: '$solid',
    borderTopColor: '$dark3'
  }
})

export const Content = styled(motion(Collapsible.Content), {
  display: 'flex',
  flexDirection: 'column',

  paddingInline: '$4',
  overflow: 'hidden',

  [`${Trigger} + & > ${Box}:first-of-type`]: {
    paddingTop: '$1'
  }
})

export const Actions = styled('div', {
  display: 'none',
  alignItems: 'center',

  marginLeft: 'auto',
  marginRight: '-$1'
})

export const Item = styled(motion.div, {
  display: 'flex',
  flexDirection: 'row',

  alignItems: 'center',
  gap: '$2',

  minHeight: 30,

  [`& > *:not(:first-child):not(${Actions})`]: {
    flex: 1
  },

  '& > *:first-child': {
    width: '$$firstWidth'
  },

  [`&:hover ${Actions}`]: {
    display: 'inline-flex'
  },

  variants: {
    hoverOutline: {
      true: {
        marginInline: '-$4',
        paddingInline: '$4',

        '&:hover': {
          outlineWidth: 1,
          outlineStyle: 'solid',
          outlineColor: '$dark3',
          outlineOffset: 0
        }
      }
    },

    hoverActive: {
      true: {
        position: 'relative',
        cursor: 'pointer',

        '&:hover': {
          '&:before': {
            content: '',
            position: 'absolute',
            inset: 0,
            marginInline: '-$4',
            backgroundColor: '$dark2'
          }
        }
      }
    },

    checkable: {
      true: {
        '&[data-state="checked"]:before': {
          content: '',
          position: 'absolute',
          inset: 0,
          marginInline: '-$4',
          backgroundColor: '$dark2'
        }
      }
    }
  }
})

export const Root = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',
  paddingBlock: '$1',

  $$firstWidth: '56px',

  '& + *': {
    borderTopWidth: '$1',
    borderTopStyle: '$solid',
    borderTopColor: '$dark3'
  },

  variants: {
    borderTop: {
      true: {
        borderTopWidth: '$1',
        borderTopStyle: '$solid',
        borderTopColor: '$dark3'
      }
    }
  }
})
