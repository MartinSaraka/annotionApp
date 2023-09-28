import { ComponentProps } from '@stitches/react'
import { MouseEventHandler } from 'react'

import { TImageInfo } from '@common/types/image'

import Text from '../Text'
import Chip from '../Chip'
import Icon from '../Icon'

import * as S from './styled'

type TBaseProps = {
  data?: TImageInfo
  name: string
  isActive?: boolean
  onSelect?: MouseEventHandler<HTMLDivElement>
  onClose?: () => void
}

type TFileTabProps = ComponentProps<typeof S.Root> & TBaseProps

const FileTab = ({
  data,
  name,
  isActive,
  onSelect,
  onClose,
  ...rest
}: TFileTabProps): JSX.Element => {
  const format = data?.extension.replace('.', '')

  return (
    <S.Root role="button" onClick={onSelect} {...rest}>
      {isActive && <S.Active layoutId="file-tab-active" />}

      <S.Content>
        {name === 'dashboard' && (
          <Icon name="HomeIcon" width={16} height={16} />
        )}

        {format && <Chip css={{ textTransform: 'uppercase' }}>{format}</Chip>}

        {name !== 'dashboard' && (
          <Text variant="base" css={{ fontWeight: isActive ? 600 : 500 }}>
            {data?.filename || 'New image'}
          </Text>
        )}

        {name !== 'dashboard' && (
          <S.Close
            ghost
            condensed
            onClick={onClose}
            aria-label="close-active-tab"
            css={{
              opacity: isActive ? 1 : undefined,
              color: isActive ? '$light' : '$dark4'
            }}
          >
            <Icon name="Cross2Icon" width={11} height={11} />
          </S.Close>
        )}
      </S.Content>
    </S.Root>
  )
}

export default FileTab
