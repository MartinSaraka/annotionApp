import { memo, useState } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'
import Dialog from '@renderer/ui/Dialog' // Adjust the import path as necessary

import { Box, Button, Icon } from '@renderer/ui'
import { TabList } from '@renderer/components'
import { TrafficLights } from '@renderer/components/appbar'

import { useAuthStore } from '@renderer/store'

import * as S from './styled'

type TAppBarProps = ComponentProps<typeof Box>

const AppBar = (props: TAppBarProps) => {
  const { t } = useTranslation('common')
  const [isReportDialogOpen, setReportDialogOpen] = useState(false)

  const isAuthenticated = useAuthStore((state) => !!state.user)

  return (
    <S.Root {...props}>
      <TrafficLights />

      <S.Content>
        {isAuthenticated && <TabList css={{ _appRegion: 'no-drag' }} />}
      </S.Content>

      <S.Aside>
        {/* ... other buttons ... */}

        <Dialog.Root
          open={isReportDialogOpen}
          onOpenChange={setReportDialogOpen}
        >
          <Dialog.Trigger asChild>
            <Button
              ghost
              aria-label={t('aria.label.report')}
              css={{ _appRegion: 'no-drag' }}
            >
              <Icon name="QuestionMarkCircledIcon" width={15} height={15} />
            </Button>
          </Dialog.Trigger>

          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Report Issue</Dialog.Title>
            </Dialog.Header>
            <Dialog.Description>
              If you re having problems, please report them here. Provide as
              much detail as possible:
            </Dialog.Description>

            {/* Text input field for the description */}
            <textarea
              aria-label="Describe your issue"
              placeholder="Describe the issue..."
              style={{
                color: 'white',
                width: '100%', // You may want to create a styled component for this
                minHeight: '100px', // Set the height you find suitable for your design
                margin: '10px 0',
                padding: '10px',
                boxSizing: 'border-box',
                borderRadius: '5px',
                borderColor: '#ccc' // Use your theme's borderColor
                // Add more styling as needed or use a styled component instead
              }}
            />

            {/* Add any additional content and buttons here */}
            <Button onClick={() => setReportDialogOpen(false)}>Submit</Button>
            <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
          </Dialog.Content>
        </Dialog.Root>
      </S.Aside>
    </S.Root>
  )
}

export default memo(AppBar) as typeof AppBar
