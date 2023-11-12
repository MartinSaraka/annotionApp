import { forwardRef } from 'react'

import type { TIconProps } from './types'

const AiIcon = forwardRef(function AiIcon(
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
        d="M2.68626 7.01592C2.18286 7.18178 1.84326 7.30138 1.84326 7.49963C1.84326 7.69815 2.18278 7.81787 2.68608 7.98373C2.70735 7.99074 2.72891 7.99783 2.75075 8.00501C2.77226 8.01209 2.79404 8.01925 2.81607 8.02651C3.57683 8.27718 4.64521 8.64472 5.50012 9.49963C6.35505 10.3546 6.72275 11.423 6.97346 12.1837C6.98076 12.2059 6.98797 12.2278 6.99508 12.2494C7.00221 12.2711 7.00924 12.2925 7.0162 12.3136C7.1821 12.8169 7.30178 13.1565 7.50012 13.1565C7.69844 13.1565 7.81816 12.8169 7.98408 12.3136C7.99105 12.2924 7.99811 12.271 8.00527 12.2492C8.01236 12.2277 8.01954 12.2059 8.02682 12.1838C8.27758 11.423 8.64529 10.3545 9.50012 9.49963C10.3549 8.64484 11.4234 8.27728 12.1842 8.02656C12.2061 8.01932 12.2278 8.01218 12.2493 8.00513C12.2712 7.99792 12.2928 7.9908 12.3142 7.98377C12.8175 7.81789 13.157 7.69813 13.157 7.49963C13.157 7.30139 12.8174 7.1818 12.3139 7.01597C12.293 7.00907 12.2717 7.00208 12.2502 6.99501C12.2284 6.98785 12.2064 6.9806 12.1841 6.97325C11.4232 6.72263 10.3547 6.35498 9.49974 5.5C8.64487 4.64512 8.27728 3.57678 8.02669 2.81595C8.01934 2.79362 8.01208 2.77155 8.00492 2.74976C7.99782 2.72817 7.99081 2.70685 7.98388 2.68581C7.81806 2.18239 7.69846 1.84277 7.50012 1.84277C7.30179 1.84277 7.18211 2.18235 7.01623 2.68572C7.00927 2.70685 7.00222 2.72826 6.99509 2.74995C6.98795 2.77165 6.98072 2.79363 6.97339 2.81587C6.72268 3.57673 6.35497 4.64515 5.50012 5.5C4.64523 6.35489 3.57687 6.72255 2.81611 6.97319C2.79381 6.98054 2.77177 6.98779 2.75001 6.99494C2.72848 7.00202 2.70723 7.00901 2.68626 7.01592ZM4.26475 7.49985C4.88904 7.77473 5.58857 8.17387 6.20722 8.79252C6.82598 9.41128 7.22521 10.1109 7.50015 10.7353C7.77509 10.1109 8.1743 9.41123 8.79301 8.79252C9.41158 8.17394 10.1111 7.77483 10.7354 7.49996C10.111 7.22504 9.41136 6.82583 8.79264 6.20711C8.174 5.58847 7.77485 4.88895 7.49997 4.26463C7.22503 4.88895 6.82584 5.58849 6.20722 6.20711C5.58858 6.82575 4.88905 7.22494 4.26475 7.49985Z"
        fill={color}
      />
    </svg>
  )
})

export default AiIcon