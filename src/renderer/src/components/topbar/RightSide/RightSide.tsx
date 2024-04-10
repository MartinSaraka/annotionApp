import { memo } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Dialog, Icon, Popover } from '@renderer/ui'
import { ExportAnnotationsDialog } from '@renderer/dialogs'
import { SettingsPopover } from '@renderer/popovers'

type TTopBarRightSideProps = ComponentProps<typeof Box>

const RightSide = ({ css, ...rest }: TTopBarRightSideProps) => {
  const { t } = useTranslation('common')

  return (
    <Box
      aria-description={t('aria.description.imageActions')}
      css={{ flexDirection: 'row', alignItems: 'center', gap: '$4', ...css }}
      {...rest}
    >


      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>
            <Icon name="DownloadIcon" width={14} height={14} />
            {t('actions.export')}
          </Button>
        </Dialog.Trigger>

        <Dialog.Content>
          <ExportAnnotationsDialog />
        </Dialog.Content>
      </Dialog.Root>


      <Popover.Root>
        <Popover.Anchor>
          <Popover.Trigger asChild>
            <Button ghost toggle aria-label={t('aria.label.settings')}>
              <Icon name="GearIcon" width={18} height={18} />
            </Button>
          </Popover.Trigger>
        </Popover.Anchor>

        <Popover.Content
          side="bottom"
          align="end"
          sideOffset={8}
          closeOnClickOutside
          dialog
          css={{ $$width: '400px' }}
        >
          <SettingsPopover />
        </Popover.Content>
      </Popover.Root>
    </Box>
  )
}

export default memo(RightSide) as typeof RightSide
