import { forwardRef, memo, useMemo } from 'react'
import { ComponentProps } from '@stitches/react'
import { Property } from '@stitches/react/types/css'

import * as S from './styled'

type TBaseProps = {
  children: React.ReactNode
  cursor: Property.Cursor
  position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
  handleAxis?: string
}

type THandleProps = ComponentProps<typeof S.HandleRoot> & TBaseProps

const Handle = forwardRef(function Handle(
  { children, cursor, position, handleAxis, css, ...rest }: THandleProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const positions = useMemo(() => {
    if (!position)
      return {
        position: 'relative !important'
      }

    const isHorizontal = ['left', 'right'].includes(position)
    const isVertical = ['top', 'bottom'].includes(position)

    const isRight = position.includes('right')
    const isTop = position.includes('top')
    const isBottom = position.includes('bottom')
    const isLeft = position.includes('left')

    return {
      position: 'absolute !important',
      top: isTop || isHorizontal ? 0 : undefined,
      right: isRight || isVertical ? 0 : undefined,
      bottom: isBottom || isHorizontal ? 0 : undefined,
      left: isLeft || isVertical ? 0 : undefined
    }
  }, [position])

  return (
    <S.HandleRoot
      ref={forwardedRef}
      data-handle={cursor}
      data-handle-axis={handleAxis}
      className="react-resizable-handle"
      css={{
        cursor: cursor,
        ...positions,
        ...css
      }}
      {...rest}
    >
      {children}
    </S.HandleRoot>
  )
})

export default memo(Handle) as typeof Handle
