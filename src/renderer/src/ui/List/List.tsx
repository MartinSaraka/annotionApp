import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'
import { motion } from 'framer-motion'
import * as Collapsible from '@radix-ui/react-collapsible'

import Text from '../Text'
import Icon from '../Icon'
import Box from '../Box'

import { useToggle } from '@renderer/hooks'

import * as S from './styled'

type TBaseProps = {
  as?: React.ElementType
  collapsible?: boolean
  title?: string
  children: React.ReactNode
}

type TListProps = ComponentProps<typeof S.Root> & TBaseProps

const List = ({ children, title, collapsible, ...rest }: TListProps) => {
  const { visible, set } = useToggle(true)

  return (
    <Collapsible.Root asChild open={visible} onOpenChange={set} {...rest}>
      <S.Root role="list">
        {title && (
          <S.Trigger disabled={!collapsible}>
            <Text variant="md" capital css={{ flex: 1, fontWeight: 600 }}>
              {title}
            </Text>

            {collapsible && (
              <Box as={motion.div} animate={{ rotate: visible ? 0 : -90 }}>
                <Icon name="ChevronDownIcon" width={16} height={16} />
              </Box>
            )}
          </S.Trigger>
        )}

        <S.Content forceMount animate={{ height: visible ? 'auto' : 0 }}>
          {children}
        </S.Content>
      </S.Root>
    </Collapsible.Root>
  )
}

type TListBoxProps = ComponentProps<typeof S.Box> & TBaseProps

const ListBox = forwardRef(function Box(
  { children, ...rest }: TListBoxProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Box role="listbox" ref={forwardedRef} {...rest}>
      {children}
    </S.Box>
  )
})

type TItemProps = ComponentProps<typeof S.Item> & TBaseProps

const Item = forwardRef(function Item(
  { children, ...rest }: TItemProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Item role="listitem" ref={forwardedRef} {...rest}>
      {children}
    </S.Item>
  )
})

List.Box = memo(ListBox) as typeof ListBox
List.Item = memo(Item) as typeof Item

export default List
