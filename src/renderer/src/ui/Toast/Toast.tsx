import { forwardRef, memo } from 'react'
import { ComponentProps } from '@stitches/react'
import { Cross1Icon } from '@radix-ui/react-icons'
import * as PrimitiveToast from '@radix-ui/react-toast'

import Box from '../Box'
import Text from '../Text'
import Button from '../Button'

import { TToast } from '@common/types/toast'

import * as S from './styled'

type TBaseProps = {
  data: TToast
}

type TToastProps = ComponentProps<typeof PrimitiveToast.Root> &
  ComponentProps<typeof S.ToastRoot> &
  TBaseProps

const Toast = forwardRef(function Toast(
  { data, ...rest }: TToastProps,
  forwardedRef: React.ForwardedRef<HTMLLIElement>
) {
  return (
    <PrimitiveToast.Root forceMount asChild ref={forwardedRef} {...rest}>
      <S.ToastRoot
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: '100%' }}
      >
        <Box>
          <Box>
            <Box css={{ flexDirection: 'row' }}>
              <S.ToastTitle asChild>
                <Text>{data.title}</Text>
              </S.ToastTitle>

              <S.ToastClose asChild>
                <Button>
                  <Cross1Icon />
                </Button>
              </S.ToastClose>
            </Box>

            <S.ToastDescription asChild>
              <Text>A new software version is available for download.</Text>
            </S.ToastDescription>
          </Box>

          <Box css={{ flexDirection: 'row' }}>
            <S.ToastAction altText="action-1" asChild>
              <Button>Update</Button>
            </S.ToastAction>

            <S.ToastAction altText="action-w" asChild>
              <Button>Not now</Button>
            </S.ToastAction>
          </Box>
        </Box>

        <S.ToastProgress
          initial={{ right: '100%' }}
          animate={{ right: 0 }}
          transition={{ duration: 2 }}
        >
          <div />
        </S.ToastProgress>
      </S.ToastRoot>
    </PrimitiveToast.Root>
  )
})

export default memo(Toast) as typeof Toast
