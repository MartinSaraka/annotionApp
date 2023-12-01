import { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'
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
  title?: React.ReactNode
  actions?: React.ReactNode
  children?: React.ReactNode
}

type TListProps = Omit<ComponentProps<typeof S.Root>, 'title'> & TBaseProps

const List = ({
  children,
  actions,
  title,
  collapsible,
  ...rest
}: TListProps) => {
  const { visible, set } = useToggle(true)

  return (
    <Collapsible.Root
      asChild
      open={collapsible ? visible : true}
      onOpenChange={collapsible ? set : undefined}
      disabled={!collapsible}
      {...rest}
    >
      <S.Root role="list">
        {title && (
          <Collapsible.Trigger asChild>
            <S.Trigger>
              <Text
                as="div"
                variant="md"
                capital
                css={{ flex: 1, fontWeight: 600 }}
              >
                {title}
              </Text>

              {actions && <Box>{actions}</Box>}

              {collapsible && (
                <Box as={motion.div} animate={{ rotate: visible ? 0 : -90 }}>
                  <Icon name="ChevronDownIcon" width={16} height={16} />
                </Box>
              )}
            </S.Trigger>
          </Collapsible.Trigger>
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
  { children, title, ...rest }: TListBoxProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Box role="listbox" ref={forwardedRef} {...rest}>
      {title && (
        <Text
          variant="md"
          css={{
            flex: 1,
            fontWeight: 600,
            textTransform: 'uppercase',
            color: '$dark4'
          }}
        >
          {title}
        </Text>
      )}

      {children}
    </S.Box>
  )
})

type TItemBaseProps = {
  children: React.ReactNode
  actions?: React.ReactNode
}

type TItemProps = ComponentProps<typeof S.Item> & TItemBaseProps

const Item = forwardRef(function Item(
  { children, actions, ...rest }: TItemProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.Item role="listitem" ref={forwardedRef} {...rest}>
      {children}

      {actions && <S.Actions>{actions}</S.Actions>}
    </S.Item>
  )
})

List.Box = memo(ListBox) as typeof ListBox
List.Item = memo(Item) as typeof Item

export default List
