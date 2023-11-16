import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'

import * as S from './styled'

type TBaseProps = {
  keys: readonly string[]
}

type TKbdProps = ComponentProps<typeof S.Root> & TBaseProps

const Kbd = forwardRef(function Kbd(
  { keys, ...rest }: TKbdProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
  const platform =
    window.electron.process.platform === 'darwin' ? 'mac' : 'windows'

  // TODO: control
  const text = keys
    .join('+')
    .replace(/cmd|ctrl/gi, platform === 'mac' ? '⌘' : 'ctrl')
    .replace(/opt|alt/gi, platform === 'mac' ? '⌥' : 'alt')
    .replace(/shift/gi, platform === 'mac' ? '⇧' : 'shift')
    .replace(/backspace/gi, platform === 'mac' ? '⌫' : 'backspace')
    .replace(/enter/gi, platform === 'mac' ? '⏎' : 'enter')

  const title = keys
    .join('+')
    .replace(/cmd|ctrl/gi, platform === 'mac' ? 'cmd' : 'ctrl')
    .replace(/opt|alt/gi, platform === 'mac' ? 'alt' : 'alt')

  return (
    <S.Root ref={forwardedRef} title={title} aria-label="shortcut" {...rest}>
      {text}
    </S.Root>
  )
})

export default memo(Kbd) as typeof Kbd
