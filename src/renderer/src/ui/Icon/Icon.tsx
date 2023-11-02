import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'

import * as RadixIcons from '@radix-ui/react-icons'
import * as CustomIcons from '@renderer/icons'

import Box from '../Box'

type TBaseProps = {
  name: keyof typeof RadixIcons | keyof typeof CustomIcons
}

type TIconProps = ComponentProps<typeof Box> &
  React.ComponentProps<(typeof RadixIcons)['VercelLogoIcon']> &
  TBaseProps

const Icon = forwardRef(function Icon(
  { name, ...rest }: TIconProps,
  forwardedRef: React.ForwardedRef<SVGSVGElement>
) {
  return (
    <Box
      as={RadixIcons[name] || CustomIcons[name]}
      ref={forwardedRef}
      {...rest}
    />
  )
})

export default memo(Icon) as typeof Icon
