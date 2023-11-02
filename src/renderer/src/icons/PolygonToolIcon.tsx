import { forwardRef } from 'react'

import type { TIconProps } from './types'

const PolygonToolIcon = forwardRef(function PolygonToolIcon(
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
        d="M14 1L11.7972 14L5.93928 12.4286L1 3.25167L8.49758 6.41227L14 1ZM12.593 3.68921L8.71187 7.50678L3.07244 5.12948L6.57838 11.6433L11.0424 12.8408L12.593 3.68921Z"
        fill={color}
      />
    </svg>
  )
})

export default PolygonToolIcon
