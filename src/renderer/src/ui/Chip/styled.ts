import { motion } from 'framer-motion'

import { styled } from '@renderer/styles'

export const Root = styled(motion.span, {
  $$color: '$colors$blue3',

  position: 'relative',

  display: 'inline-flex',
  flexDirection: 'row',

  flexShrink: 0,
  alignSelf: 'center',

  alignItems: 'center',
  justifyContent: 'center',

  paddingInline: 'calc($1 + 2px)',
  paddingBlock: 'calc($1 + 1px)',

  fontSize: '$4',
  lineHeight: '92%',
  fontWeight: 600,

  isolation: 'isolate',

  '&:before': {
    content: '',
    display: 'inline-block',
    position: 'absolute',
    inset: 0,
    zIndex: '$down'
  },

  variants: {
    small: {
      true: {
        '&:before': {
          borderRadius: '$4'
        }
      },
      false: {
        '&:before': {
          borderRadius: '$2'
        }
      }
    },

    auto: {
      true: {
        '&:before': {
          backgroundColor: '$$color',
          filter: 'hue-rotate(-6deg) saturate(118%) brightness(22%)'
        },
        color: '$$color'
      },
      false: {
        '&:before': {
          backgroundColor: '$$color'
        },
        color: '$light'
      }
    },
    fromCss: {
      true: {
        padding: 0,

        '&:before': {
          position: 'relative',
          inset: 'unset',

          backgroundColor: 'rgb(var(--class-color, 12, 140, 233))',
          filter: 'hue-rotate(-6deg) saturate(118%) brightness(22%)',

          content: 'var(--class-name)',
          color: 'rgb(var(--class-color, 12, 140, 233))',

          paddingInline: 'calc($1 + 2px)',
          paddingBlock: 'calc($1 + 1px)'
        },

        '&:after': {
          position: 'absolute',
          content: 'var(--class-name)',

          paddingInline: 'calc($1 + 2px)',
          paddingBlock: 'calc($1 + 1px)',

          color: 'rgb(var(--class-color, 12, 140, 233))'
        }
      }
    },
    ellipsis: {
      true: {
        '&:hover:before, &:hover:after': {
          maxWidth: 'unset',
          overflow: 'unset',
          textOverflow: 'unset'
        },

        '&:before, &:after': {
          maxWidth: '12ch',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }
    }
  },

  defaultVariants: {
    small: false,
    auto: false
  }
})
