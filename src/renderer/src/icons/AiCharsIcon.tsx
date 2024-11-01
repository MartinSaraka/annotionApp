import { forwardRef } from 'react'

import type { TIconProps } from './types'

const AiCharsIcon = forwardRef(function AiCharsIcon(
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
        d="M4.96905 3.3159C4.89648 3.1196 4.70935 2.98926 4.50006 2.98926C4.29078 2.98926 4.10364 3.1196 4.03108 3.3159L1.02065 11.4598C0.924909 11.7188 1.05726 12.0064 1.31628 12.1021C1.57529 12.1979 1.86288 12.0655 1.95862 11.8065L2.94346 9.14229H6.05667L7.04151 11.8065C7.13725 12.0655 7.42484 12.1979 7.68385 12.1021C7.94286 12.0064 8.07522 11.7188 7.97947 11.4598L4.96905 3.3159ZM5.74246 8.29229L4.50006 4.93133L3.25767 8.29229H5.74246Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 3.45C9 3.20147 9.20147 3 9.45 3H13.95C14.1985 3 14.4 3.20147 14.4 3.45C14.4 3.69853 14.1985 3.9 13.95 3.9H12.3V10.9999H13.95C14.1985 10.9999 14.4 11.2014 14.4 11.4499C14.4 11.6984 14.1985 11.8999 13.95 11.8999H9.45002C9.20149 11.8999 9.00002 11.6984 9.00002 11.4499C9.00002 11.2014 9.20149 10.9999 9.45002 10.9999H11.1V3.9H9.45C9.20147 3.9 9 3.69853 9 3.45Z"
        fill={color}
      />
    </svg>
  )
})

export default AiCharsIcon
