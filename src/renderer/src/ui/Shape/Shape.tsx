import { forwardRef, memo, useEffect, useRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { useForwardRef } from '@renderer/hooks'

import * as S from './styled'

type TBaseProps = {
  tag?: React.ElementType
  props: Record<PropertyKey, PropertyKey | null | undefined>
}

type TShapeProps = ComponentProps<typeof S.Root> & TBaseProps

const Shape = forwardRef(function Shape(
  { tag, props, ...rest }: TShapeProps,
  forwardedRef: React.ForwardedRef<SVGSVGElement>
) {
  const ref = useForwardRef(forwardedRef)
  const refElement = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    if (!ref.current || !refElement.current) return

    const bbox = refElement.current.getBBox()
    const viewBox = [bbox.x, bbox.y, bbox.width, bbox.height].join(' ')

    ref.current.setAttribute('viewBox', viewBox)
  }, [ref, refElement])

  return (
    <S.Root role="img" ref={ref} width={16} height={16} {...rest}>
      <S.Element
        ref={refElement}
        vectorEffect="non-scaling-stroke"
        as={tag}
        {...props}
      />
    </S.Root>
  )
})

export default memo(Shape) as typeof Shape
