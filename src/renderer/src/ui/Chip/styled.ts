import { motion } from 'framer-motion'

import { styled } from '@renderer/styles'

export const Root = styled(motion.span, {
  position: 'relative',

  display: 'inline-flex',
  flexDirection: 'row',

  flexShrink: 0,
  alignSelf: 'center',

  alignItems: 'center',
  justifyContent: 'center',

  paddingInline: 'calc($1 + 2px)',
  paddingBlock: 'calc($1 + 1px)',

  backgroundColor: '#3E63DD',
  color: '$light',

  fontSize: '$4',
  lineHeight: '92%',
  fontWeight: 600,

  variants: {
    small: {
      true: {
        borderRadius: '$4'
      },
      false: {
        borderRadius: '$2'
      }
    }
  },

  defaultVariants: {
    small: false
  }
})
