import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'

import * as S from './styled'

type TBaseProps = {
  keys: string[]
}

type TKbdProps = ComponentProps<typeof S.KbdRoot> & TBaseProps

const Kbd = forwardRef(function Kbd(
  { keys, ...rest }: TKbdProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const platform =
    window.electron.process.platform === 'darwin' ? 'mac' : 'windows'

  const text = keys
    .join('')
    .replace(/cmd|ctrl/gi, platform === 'mac' ? '⌘' : 'ctrl')
    .replace(/opt|alt/gi, platform === 'mac' ? '⌥' : 'alt')
    .replace(/shift/gi, platform === 'mac' ? '⇧' : 'shift')

  return (
    <S.KbdRoot ref={forwardedRef} {...rest}>
      {text}
    </S.KbdRoot>
  )
})

export default memo(Kbd) as typeof Kbd
