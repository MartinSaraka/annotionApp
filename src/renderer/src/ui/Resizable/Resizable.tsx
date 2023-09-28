import { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'
import {
  useMotionValue,
  useTransform,
  type HTMLMotionProps
} from 'framer-motion'

import * as S from './styled'

type TBaseProps = {
  minWidth?: number
  initialWidth?: number
  maxWidth?: number
  side?: 'left' | 'right'
  children?: React.ReactNode
}

type TResizableProps = ComponentProps<typeof S.Root> &
  HTMLMotionProps<'div'> &
  TBaseProps

const Resizable = forwardRef(function Resizable(
  {
    children,
    minWidth = 50,
    initialWidth = 100,
    maxWidth = 150,
    side = 'right',
    ...rest
  }: TResizableProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const x = useMotionValue(side === 'right' ? initialWidth : -initialWidth)
  const width = useTransform(x, Math.abs)

  return (
    <S.Root ref={forwardedRef} style={{ width }} {...rest}>
      {children}

      <S.Handle
        drag="x"
        style={{ x }}
        dragMomentum={false}
        dragElastic={0.000001}
        dragConstraints={{
          left: side === 'right' ? minWidth : -maxWidth,
          right: side === 'right' ? maxWidth : -minWidth
        }}
        css={{
          left: side === 'right' ? -2 : 'auto',
          right: side === 'left' ? -2 : 'auto'
        }}
      />
    </S.Root>
  )
})

export default memo(Resizable) as typeof Resizable
