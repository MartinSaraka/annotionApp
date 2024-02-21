import { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { type HTMLMotionProps, motion } from 'framer-motion'

import { Box } from '@renderer/ui'

import logo from '../../../../../../resources/logo-dark.svg'

type TFullScreenProps = ComponentProps<typeof Box> & HTMLMotionProps<'div'>

const FullScreen = forwardRef(function FullScreen(
  props: TFullScreenProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <Box
      as={motion.div}
      ref={forwardedRef}
      css={{
        _appRegion: 'no-drag',
        position: 'fixed',
        inset: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '$dark1',
        zIndex: '$loading',

        userSelect: 'none',
        cursor: 'progress'
      }}
      {...props}
    >
      <Box as={motion.img} src={logo} height={50} alt="AnnotAid Logo" />
    </Box>
  )
})

export default memo(FullScreen) as typeof FullScreen
