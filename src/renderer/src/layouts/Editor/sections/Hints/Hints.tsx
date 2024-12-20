import { memo, useMemo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { AnimatePresence } from 'framer-motion'
import { Trans } from 'react-i18next'

import { Kbd, Text } from '@renderer/ui'
import { useImageStore } from '@renderer/store'

import { ETool, EToolType } from '@common/constants/tools'
import { HOTKEYS } from '@common/constants/hotkeys'

import * as S from './styled'

type THintsProps = ComponentProps<typeof S.Root>

const Hints = (props: THintsProps) => {
  const activeTool = useImageStore((state) => state.activeTool())

  const Message = useMemo(() => {
    switch (true) {
      case activeTool.value === ETool.ZOOM_IN:
        return (
          <Trans ns="hints" i18nKey={ETool.ZOOM_IN}>
            <Kbd keys={HOTKEYS.viewer} />
          </Trans>
        )
      case activeTool.type === EToolType.ANNOTATION:
        return (
          <Trans ns="hints" i18nKey={EToolType.ANNOTATION}>
            <Kbd keys={HOTKEYS.viewer} />
          </Trans>
        )
      default:
        return null
    }
  }, [activeTool])

  return (
    <S.Root {...props} role="tooltip">
      <AnimatePresence mode="wait">
        {Message && (
          <S.Content
            key={activeTool.value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            exit={{ y: 20, opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Text css={{ fontWeight: 600 }}>{Message}</Text>
          </S.Content>
        )}
      </AnimatePresence>
    </S.Root>
  )
}

export default memo(Hints) as typeof Hints
