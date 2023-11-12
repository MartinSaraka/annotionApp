import React, { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'

import * as S from './styled'

type TRootBaseProps = {
  children: React.ReactNode
}

type TToolbarProps = ComponentProps<typeof S.ToolbarRoot> & TRootBaseProps

const Root = forwardRef(function Root(
  { children, ...rest }: TToolbarProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.ToolbarRoot ref={forwardedRef} {...rest}>
      {children}
    </S.ToolbarRoot>
  )
})

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
        '&[data-state="on"]': !isActiveControlled && {
          backgroundColor: '#3E63DD'
        },

        '&:hover:not(:disabled)[aria-checked="false"]': !isActive && {
          color: '#0074FF'
        },
        ...css
      }}
      {...rest}
    >
      {children}

      {isActiveControlled && isActive && (
        <S.ActiveItem
          key="active"
          layoutId={`toolbar-toggle-active-${group || 'default'}`}
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

type TSeparatorProps = ComponentProps<typeof S.ToolbarSeparator>

const Separator = forwardRef(function Separator(
  props: TSeparatorProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return <S.ToolbarSeparator ref={forwardedRef} {...props} />
})

const Toolbar = () => <React.Fragment />
Toolbar.Root = memo(Root) as typeof Root
Toolbar.Group = memo(Group) as typeof Group
Toolbar.Toggle = memo(Toggle) as typeof Toggle
Toolbar.Button = memo(Button) as typeof Button
Toolbar.Separator = memo(Separator) as typeof Separator

export default Toolbar
