import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'
import { motion } from 'framer-motion'

import Box from '../Box'

import * as S from './styled'

type TRootBaseProps = {
  isPlain?: boolean
  children: React.ReactNode
}

type TToolbarProps = ComponentProps<typeof S.ToolbarRoot> & TRootBaseProps

const Toolbar = ({ children, isPlain, ...rest }: TToolbarProps) => (
  <S.ToolbarRoot
    {...rest}
    css={{ backgroundColor: !isPlain ? '$light' : undefined }}
  >
    {children}
  </S.ToolbarRoot>
)

type TBaseProps = {
  children: React.ReactNode
}

type TGroupProps = ComponentProps<typeof S.ToolbarGroup> & TBaseProps

const Group = forwardRef(function Group(
  { children, ...rest }: TGroupProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.ToolbarGroup ref={forwardedRef} {...rest}>
      {children}
    </S.ToolbarGroup>
  )
})

type TToggleBaseProps = {
  group?: string
  isActive?: boolean
}

type TToggleProps = ComponentProps<typeof S.ToolbarToggle> & TToggleBaseProps

const Toggle = forwardRef(function Toggle(
  { children, group, isActive, css, ...rest }: TToggleProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  const isActiveControlled = isActive !== undefined

  return (
    <S.ToolbarToggle
      ref={forwardedRef}
      css={{
        '&:hover': {
          backgroundColor: '$purple3'
        },

        '&[data-state="on"]': !isActiveControlled && {
          backgroundColor: '$purple5'
        },

        ...css
      }}
      {...rest}
    >
      {children}

      {isActiveControlled && isActive && (
        <Box
          as={motion.div}
          key="active"
          layoutId={`toolbar-toggle-active-${group || 'default'}`}
          transition={{
            layout: {
              duration: 0.2,
              ease: 'easeOut'
            }
          }}
          css={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '$purple5',
            borderRadius: '$2',
            zIndex: '$base'
          }}
        />
      )}
    </S.ToolbarToggle>
  )
})

type TButtonProps = ComponentProps<typeof S.ToolbarButton> & TBaseProps

const Button = forwardRef(function Button(
  { children, ...rest }: TButtonProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <S.ToolbarButton ref={forwardedRef} {...rest}>
      {children}
    </S.ToolbarButton>
  )
})

type TSeparatorProps = ComponentProps<typeof S.ToolbarSeparator> &
  Partial<TBaseProps>

const Separator = forwardRef(function Separator(
  { children, ...rest }: TSeparatorProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.ToolbarSeparator ref={forwardedRef} {...rest}>
      {children}
    </S.ToolbarSeparator>
  )
})

Toolbar.Group = memo(Group) as typeof Group
Toolbar.Toggle = memo(Toggle) as typeof Toggle
Toolbar.Button = memo(Button) as typeof Button
Toolbar.Separator = memo(Separator) as typeof Separator

export default Toolbar
