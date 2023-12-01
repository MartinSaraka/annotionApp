import { memo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Dialog, Icon, Text } from '@renderer/ui'

type TTopBarRightSideProps = ComponentProps<typeof Box>

const RightSide = ({ css, ...rest }: TTopBarRightSideProps) => {
  const { t } = useTranslation('common')

  return (
    <Box
      aria-description={t('aria.description.imageActions')}
      css={{ flexDirection: 'row', alignItems: 'center', gap: '$4', ...css }}
      {...rest}
    >
      <Button outlined>
        <Icon name="Share2Icon" width={14} height={14} />
        {t('actions.share')}
      </Button>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>
            <Icon name="DownloadIcon" width={14} height={14} />
            {t('actions.export')}
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title asChild>
              <Text variant="lg" css={{ fontWeight: 500 }}>
                Export annotations
              </Text>
            </Dialog.Title>
          </Dialog.Header>

          <Box css={{ padding: '$4' }}>
            <Box
              css={{
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <Button>
                <Icon name="DownloadIcon" width={14} height={14} />
                Save and Export
              </Button>
            </Box>
          </Box>
        </Dialog.Content>
      </Dialog.Root>

      <Button ghost aria-label={t('aria.label.notifications')}>
        <Icon name="BellIcon" width={18} height={18} />
      </Button>

      <Button ghost aria-label={t('aria.label.settings')}>
        <Icon name="GearIcon" width={18} height={18} />
      </Button>
    </Box>
  )
}

export default memo(RightSide) as typeof RightSide
