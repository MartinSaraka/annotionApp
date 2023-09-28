import { forwardRef, memo } from 'react'

import * as S from './styled'

type TBaseProps = {
  disabled?: boolean
  orientation?: 'vertical' | 'horizontal' | 'both'
  children: React.ReactNode
}

type TScrollAreaProps = React.ComponentProps<typeof S.ScrollAreaRoot> &
  TBaseProps

const ScrollArea = forwardRef(function ScrollArea(
  { disabled, children, orientation = 'both', ...rest }: TScrollAreaProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.ScrollAreaRoot
      ref={forwardedRef}
      data-orientation={orientation}
      {...rest}
    >
      <S.ScrollAreaViewport data-orientation={orientation}>
        {children}
      </S.ScrollAreaViewport>

      {!disabled && (
        <>
          {(orientation === 'vertical' || orientation === 'both') && (
            <S.ScrollAreaScrollbar orientation="vertical">
              <S.ScrollAreaThumb />
            </S.ScrollAreaScrollbar>
          )}
          {(orientation === 'horizontal' || orientation === 'both') && (
            <S.ScrollAreaScrollbar orientation="horizontal">
              <S.ScrollAreaThumb />
            </S.ScrollAreaScrollbar>
          )}
        </>
      )}
    </S.ScrollAreaRoot>
  )
})

export default memo(ScrollArea) as typeof ScrollArea
