import { forwardRef } from 'react'

import type { TIconProps } from './types'

const RectToolIcon = forwardRef(function RectToolIcon(
  { color = 'currentColor', ...props }: TIconProps,
  forwardedRef: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={forwardedRef}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 1H14V14H1V1ZM2 2V13H13V2H2Z"
        fill={color}
      />
    </svg>
  )
})

export default RectToolIcon
