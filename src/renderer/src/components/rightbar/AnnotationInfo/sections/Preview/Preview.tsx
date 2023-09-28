import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Icon, Text } from '@renderer/ui'
import { useImageStore } from '@renderer/store'
import { AnnotationUtils } from '@common/utils'

import * as S from './styled'

const Preview = () => {
  const { t } = useTranslation(['annotation'])
  const annotation = useImageStore((state) => state.getSelectedAnnotation())

  const type = useMemo(() => {
    if (!annotation) return null

    const utils = AnnotationUtils.from(annotation)

    return {
      value: utils.type,
      icon: utils.icon
    } as const
  }, [annotation])

  return (
    <S.Root>
      <Box
        css={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '$2'
        }}
      >
        <Box>
          {type && (
            <Box
              css={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 'calc($1 + 2px)'
              }}
            >
              <Icon name={type.icon} width={16} height={16} />

              <Text variant="md" capital>
                {t(`annotation:properties.type.${type.value}`)}
              </Text>
            </Box>
          )}
        </Box>

        <Box css={{ flexDirection: 'row', gap: '$2' }}>
          <Button ghost>
            <Icon
              name="LockOpen1Icon"
              width={18}
              height={18}
              css={{ color: '$dark4' }}
            />
          </Button>

          <Button ghost>
            <Icon
              name="EyeOpenIcon"
              width={18}
              height={18}
              css={{ color: '$dark4' }}
            />
          </Button>

          <Button ghost>
            <Icon
              name="TrashIcon"
              width={18}
              height={18}
              css={{ color: '$dark4' }}
            />
          </Button>
        </Box>
      </Box>
    </S.Root>
  )
}

export default memo(Preview)
