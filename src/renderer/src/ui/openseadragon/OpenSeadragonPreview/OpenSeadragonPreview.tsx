import { memo } from 'react'
import { ComponentProps } from '@stitches/react'
import { motion } from 'framer-motion'

import { Box } from '@renderer/ui'
import { OPEN_SEADRAGON_PREVIEW_ID } from '@common/constants/viewer'

type TBaseProps = {
  visible: boolean
}

type TOpenSeadragonPreviewProps = ComponentProps<typeof Box> &
  React.ComponentProps<typeof motion.div> &
  TBaseProps

const OpenSeadragonPreview = ({
  visible = false,
  css,
  ...rest
}: TOpenSeadragonPreviewProps) => (
  <Box
    as={motion.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    data-visible={visible}
    tabIndex={-1}
    css={{
      paddingTop: '$4',
      paddingInline: '$4',

      '&[data-visible="false"]': {
        position: 'absolute',
        left: '100%',
        width: '100%'
      },

      ...css
    }}
    {...rest}
  >
    <Box
      id={OPEN_SEADRAGON_PREVIEW_ID}
      css={{
        aspectRatio: '16/10',
        pointerEvents: 'none',
        userSelect: 'none',
        borderRadius: '$7',
        overflow: 'hidden'
      }}
    />
  </Box>
)

export default memo(OpenSeadragonPreview) as typeof OpenSeadragonPreview
