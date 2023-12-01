import { forwardRef, memo } from 'react'
import { type ComponentProps } from '@stitches/react'

import * as PrimitiveToggle from '@radix-ui/react-toggle'

type TBaseProps = {
  children: React.ReactNode
}

type TToggleProps = ComponentProps<typeof PrimitiveToggle.Root> & TBaseProps

const Toggle = forwardRef(function Toggle(
  { children, ...rest }: TToggleProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <PrimitiveToggle.Root ref={forwardedRef} asChild {...rest}>
      {children}
    </PrimitiveToggle.Root>
  )
})

export default memo(Toggle) as typeof Toggle
