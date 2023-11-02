import { forwardRef } from 'react'

import type { TIconProps } from './types'

const PointToolIcon = forwardRef(function PointToolIcon(
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
        d="M7.49993 9.4999C8.6045 9.4999 9.49993 8.60447 9.49993 7.4999C9.49993 6.39533 8.6045 5.4999 7.49993 5.4999C6.39536 5.4999 5.49993 6.39533 5.49993 7.4999C5.49993 8.60447 6.39536 9.4999 7.49993 9.4999Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.49978 0.876953C3.8421 0.876953 0.876953 3.8421 0.876953 7.49978C0.876953 11.1574 3.8421 14.1226 7.49978 14.1226C11.1574 14.1226 14.1226 11.1574 14.1226 7.49978C14.1226 3.8421 11.1574 0.876953 7.49978 0.876953ZM1.82695 7.49978C1.82695 4.36677 4.36677 1.82695 7.49978 1.82695C10.6328 1.82695 13.1726 4.36677 13.1726 7.49978C13.1726 10.6328 10.6328 13.1726 7.49978 13.1726C4.36677 13.1726 1.82695 10.6328 1.82695 7.49978Z"
        fill={color}
      />
    </svg>
  )
})

export default PointToolIcon
