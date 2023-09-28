import { memo } from 'react'
import { ComponentProps } from '@stitches/react'
import { motion } from 'framer-motion'

import { Box } from '@renderer/ui'
import { OPEN_SEADRAGON_ID } from '@common/constants/viewer'

type TOpenSeadragonMainProps = ComponentProps<typeof Box> &
  React.ComponentProps<typeof motion.div>

const OpenSeadragonMain = ({ css, ...rest }: TOpenSeadragonMainProps) => (
  <Box
    as={motion.div}
    id={OPEN_SEADRAGON_ID}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    css={{
      isolation: 'isolate',
      zIndex: '$base',

      position: 'absolute',
      inset: 0,

      cursor: 'var(--cursor-viewer)',
      backgroundColor: 'var(--page-color)',

      ...css
    }}
    {...rest}
  />
)

export default memo(OpenSeadragonMain) as typeof OpenSeadragonMain
