import { forwardRef, HTMLProps, memo, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'
import { Layout } from 'react-grid-layout'
import { SizeMe } from 'react-sizeme'
import {
  ArrowBottomRightIcon,
  DragHandleDots2Icon
} from '@radix-ui/react-icons'

import { Handle } from '@renderer/ui'
import { useLayoutStore } from '@renderer/store'
import {
  getBannedBottomMargin,
  getFixedWidthColsCount,
  getModifiedCellGap
} from '@common/utils/layout'

import { OPEN_SEA_DRAGON_ID } from '@common/constants/viewer'
import {
  GRID_LAYOUT_DEFAULT_OPTIONS,
  GRID_LAYOUT_DRAGGABLE_HANDLE_CLASS
} from '@common/constants/layout'

import * as S from './styled'

type TRootBaseProps = {
  children?: React.ReactNode
}

type TGridOverlayProps = ComponentProps<typeof S.GridLayoutRoot> &
  HTMLProps<HTMLDivElement> &
  TRootBaseProps

const GridOverlay = ({ children, ...rest }: TGridOverlayProps) => {
  const layout = useLayoutStore((state) => state.layout)
  const setLayout = useLayoutStore((state) => state.setLayout)

  const onLayoutChangeHandler = useCallback(
    (layout: Layout[]) => setLayout(layout),
    [setLayout]
  )

  return (
    <SizeMe noPlaceholder>
      {({ size }) => {
        const viewer = document.getElementById(OPEN_SEA_DRAGON_ID)
        const parentSize = viewer?.getBoundingClientRect()

        const width = size.width || parentSize?.width
        const height = size.height || parentSize?.height

        const cols = getFixedWidthColsCount(width)
        const gap = getModifiedCellGap(cols, width)
        const margin = getBannedBottomMargin(gap, height)

        return (
          <S.GridLayoutRoot
            {...GRID_LAYOUT_DEFAULT_OPTIONS}
            width={width}
            margin={[gap, gap]}
            cols={{ default: cols }}
            layouts={{ default: layout }}
            css={{ marginBottom: margin }}
            onLayoutChange={onLayoutChangeHandler}
            resizeHandle={
              <Handle
                cursor="se-resize"
                data-visibility="hover"
                css={{
                  marginTop: 'auto',
                  paddingBottom: '$2 !important',
                  paddingRight: '$2 !important',
                  paddingLeft: '$2 !important',
                  paddingTop: '0 !important',
                  alignSelf: 'flex-end'
                }}
              >
                <ArrowBottomRightIcon width={10} height={10} />
              </Handle>
            }
            {...rest}
          >
            {children}
          </S.GridLayoutRoot>
        )
      }}
    </SizeMe>
  )
}

type TItemBaseProps = {
  children: React.ReactNode
}

type TItemProps = ComponentProps<typeof S.GridLayoutItem> & TItemBaseProps

const Item = forwardRef(function Item(
  { children, ...rest }: TItemProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <S.GridLayoutItem
      ref={forwardedRef}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.2
        }
      }}
      {...rest}
    >
      <Handle
        cursor="move"
        className={GRID_LAYOUT_DRAGGABLE_HANDLE_CLASS}
        css={{
          paddingTop: '$2 !important',
          paddingBottom: '0 !important'
        }}
      >
        <DragHandleDots2Icon transform="rotate(90)" />
      </Handle>

      {children}
    </S.GridLayoutItem>
  )
})

GridOverlay.Item = memo(Item) as typeof Item

export default GridOverlay
