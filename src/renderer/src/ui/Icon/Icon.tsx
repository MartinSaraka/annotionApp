import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'
import * as RadixIcons from '@radix-ui/react-icons'

import Box from '../Box'

type TBaseProps = {
  name: keyof typeof RadixIcons
}

type TIconProps = ComponentProps<typeof Box> &
  React.ComponentProps<(typeof RadixIcons)['VercelLogoIcon']> &
  TBaseProps

const Icon = forwardRef(function Icon(
  { name, ...rest }: TIconProps,
  forwardedRef: React.ForwardedRef<SVGSVGElement>
) {
  return <Box as={RadixIcons[name]} ref={forwardedRef} {...rest} />
})

export default memo(Icon) as typeof Icon
