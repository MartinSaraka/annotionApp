import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'

import * as S from './styled'

type TBaseProps = {
  children: React.ReactNode
}

type TInputProps = ComponentProps<typeof S.InputRoot> & TBaseProps

const Input = ({ children, ...rest }: TInputProps) => (
  <S.InputRoot {...rest}>{children}</S.InputRoot>
)

type TFieldProps = ComponentProps<typeof S.FieldRoot>

const Field = forwardRef(function Field(
  props: TFieldProps,
  forwardedRef: React.ForwardedRef<HTMLInputElement>
) {
  return <S.FieldRoot ref={forwardedRef} {...props} />
})

type TTextAreaProps = ComponentProps<typeof S.TextAreaRoot>

const TextArea = forwardRef(function TextArea(
  props: TTextAreaProps,
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>
) {
  return <S.TextAreaRoot ref={forwardedRef} rows={2} {...props} />
})

type TElementProps = ComponentProps<typeof S.ElementRoot> & TBaseProps

const Element = forwardRef(function Element(
  { children, ...rest }: TElementProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.ElementRoot ref={forwardedRef} {...rest}>
      {children}
    </S.ElementRoot>
  )
})

Input.Field = memo(Field) as typeof Field
Input.TextArea = memo(TextArea) as typeof TextArea
Input.Element = memo(Element) as typeof Element

export default Input
