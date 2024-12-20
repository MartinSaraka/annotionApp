import { forwardRef } from 'react'

import type { TIconProps } from './types'

const EllipseToolIcon = forwardRef(function EllipseToolIcon(
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
        d="M2.94684 4.28695C4.13035 3.48234 5.73878 3 7.49213 3C9.24545 3 10.8539 3.48234 12.0374 4.28695C13.2184 5.08985 14.0175 6.24856 14.0175 7.58832C14.0175 8.92808 13.2184 10.0868 12.0374 10.8897C10.8539 11.6943 9.24546 12.1766 7.49213 12.1766C5.73878 12.1766 4.13035 11.6943 2.94684 10.8897C1.76585 10.0868 0.966797 8.92807 0.966797 7.58832C0.966797 6.24856 1.76585 5.08985 2.94684 4.28695ZM3.48096 5.07258C2.47216 5.75841 1.9168 6.65636 1.9168 7.58832C1.9168 8.52027 2.47216 9.41822 3.48096 10.1041C4.48723 10.7882 5.90397 11.2266 7.49213 11.2266C9.08027 11.2266 10.497 10.7882 11.5033 10.1041C12.5121 9.41822 13.0675 8.52027 13.0675 7.58832C13.0675 6.65636 12.5121 5.75841 11.5033 5.07258C10.497 4.38846 9.08027 3.95 7.49213 3.95C5.90397 3.95 4.48723 4.38846 3.48096 5.07258Z"
        fill={color}
      />
    </svg>
  )
})

export default EllipseToolIcon
