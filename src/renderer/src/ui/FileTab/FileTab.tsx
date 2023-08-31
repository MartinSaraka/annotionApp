import { ComponentProps } from '@stitches/react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

import { TImageInfo } from '@common/types/image'

import Box from '../Box'
import Text from '../Text'

import * as S from './styled'

type TBaseProps = {
  data?: TImageInfo
  isActive?: boolean
  onSelect?: () => void
  onClose?: () => void
}

type TFileTabProps = ComponentProps<typeof S.Root> & TBaseProps

const FileTab = ({
  data,
  isActive,
  onSelect,
  onClose,
  ...rest
}: TFileTabProps): JSX.Element => {
  const format = data?.extension.replace('.', '')

  return (
    <S.Root {...rest} onClick={onSelect}>
      {format && <S.Badge>{format}</S.Badge>}

      <Text css={{ fontWeight: 600, color: isActive ? '$light' : '$gray400' }}>
        {data?.filename || 'New image'}
      </Text>

      <S.Close
        onClick={onClose}
        data-active={isActive}
        aria-label="close-active-tab"
        role="button"
        css={{
          opacity: isActive ? 1 : 0,
          color: isActive ? '$light' : '$gray400'
        }}
      >
        <Cross2Icon width={13} height={13} />
      </S.Close>

      {isActive && (
        <Box
          as={motion.div}
          layoutId="file-tab-active"
          transition={{
            layout: {
              duration: 0.2,
              ease: 'easeOut'
            }
          }}
          css={{
            position: 'absolute',
            height: 2,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '$purple9',
            borderRadius: '$pill',
            zIndex: '$base'
          }}
        />
      )}
    </S.Root>
  )
}

export default FileTab
