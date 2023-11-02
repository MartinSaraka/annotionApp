import { forwardRef } from 'react'

import type { TIconProps } from './types'

const CircleToolIcon = forwardRef(function CircleToolIcon(
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
        d="M0.876953 7.49978C0.876953 3.8421 3.8421 0.876953 7.49978 0.876953C11.1574 0.876953 14.1226 3.8421 14.1226 7.49978C14.1226 11.1574 11.1574 14.1226 7.49978 14.1226C3.8421 14.1226 0.876953 11.1574 0.876953 7.49978ZM7.49978 1.82695C4.36677 1.82695 1.82695 4.36677 1.82695 7.49978C1.82695 10.6328 4.36677 13.1726 7.49978 13.1726C10.6328 13.1726 13.1726 10.6328 13.1726 7.49978C13.1726 4.36677 10.6328 1.82695 7.49978 1.82695Z"
        fill={color}
      />
    </svg>
  )
})

export default CircleToolIcon
