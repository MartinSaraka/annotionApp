import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box, Chip, Text } from '@renderer/ui'
import { useImageStore } from '@renderer/store'

type TTopBarLeftSideProps = ComponentProps<typeof Box>

const LeftSide = ({ css, ...rest }: TTopBarLeftSideProps) => {
  const data = useImageStore((state) => state.getData())

  return (
    <Box
      aria-describedby="image-info"
      css={{ flexDirection: 'row', alignItems: 'center', gap: '$3', ...css }}
      {...rest}
    >
      <Box css={{ flexDirection: 'row', gap: '$1' }}>
        <Text
          variant="lg"
          css={{ color: '$dark4' }}
          aria-describedby="image-project"
        >
          Personal
        </Text>

        <Text role="separator" variant="lg" css={{ color: '$dark4' }}>
          /
        </Text>

        <Text
          as="h1"
          variant="lg"
          css={{ color: '$light' }}
          aria-describedby="image-name"
        >
          {data?.filename}
        </Text>
      </Box>

      <Chip small aria-describedby="image-format">
        {data?.format}
      </Chip>
    </Box>
  )
}

export default memo(LeftSide) as typeof LeftSide
