import { memo, useMemo } from 'react'
import { ComponentProps } from '@stitches/react'

import { Kbd, Text } from '@renderer/ui'
import { useImageStore } from '@renderer/store'
import { ETool, EToolType } from '@common/constants/tools'

import * as S from './styled'
import { AnimatePresence } from 'framer-motion'

type THintsProps = ComponentProps<typeof S.Root>

const Hints = (props: THintsProps) => {
  const activeTool = useImageStore((state) => state.activeTool())

  const Message = useMemo(() => {
    switch (true) {
      case activeTool.value === ETool.ZOOM_IN:
        return (
          <>
            Hold <Kbd keys={['shift']} /> to zoom out
          </>
        )
      case activeTool.type === EToolType.ANNOTATION:
        return (
          <>
            Hold <Kbd keys={['shift']} /> to pan
          </>
        )
      default:
        return null
    }
  }, [activeTool])

  return (
    <S.Root {...props}>
      <AnimatePresence mode="wait">
        {Message && (
          <S.Content
            key={activeTool.value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            exit={{ y: 20, opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Text variant="base" css={{ fontWeight: 600 }}>
              {Message}
            </Text>
          </S.Content>
        )}
      </AnimatePresence>
    </S.Root>
  )
}

export default memo(Hints) as typeof Hints
