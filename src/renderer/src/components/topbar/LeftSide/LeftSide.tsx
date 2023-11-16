import { memo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Box, Chip, DropdownMenu, Icon, Text } from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import logo from '../../../../../../resources/logo-icon.svg'

type TTopBarLeftSideProps = ComponentProps<typeof Box>

const LeftSide = ({ css, ...rest }: TTopBarLeftSideProps) => {
  const data = useImageStore((state) => state.getData())

  return (
    <Box
      aria-describedby="image-info"
      css={{ flexDirection: 'row', alignItems: 'center', gap: '$3', ...css }}
      {...rest}
    >
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '$1',
            userSelect: 'none'
          }}
        >
          <Box
            css={{
              _size: 34,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '$dark2',
              borderRadius: '$5'
            }}
          >
            <Box
              as="img"
              src={logo}
              width={15}
              height={15}
              alt="AnnotAid Logo"
              css={{ filter: 'drop-shadow(0 0 1px $colors$dark1)' }}
            />
          </Box>

          <Icon
            name="ChevronDownIcon"
            width={15}
            height={15}
            css={{ color: '$dark4' }}
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>TODO</DropdownMenu.Content>
      </DropdownMenu.Root>

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
