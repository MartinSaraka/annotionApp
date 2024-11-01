/* eslint-disable react/no-unescaped-entities */
import { memo, useState, useEffect } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'
import Dialog from '@renderer/ui/Dialog' // Ensure the import path is correct

import { Box, Button, Icon } from '@renderer/ui'
import { TrafficLights } from '@renderer/components/appbar'

import * as S from './styled'

type TAppBarProps = ComponentProps<typeof Box>

const AppBar = (props: TAppBarProps) => {
  const { t } = useTranslation('common')
  const [isReportDialogOpen, setReportDialogOpen] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = () => {
    setShowAlert(true)
    setReportDialogOpen(false) // Close the dialog after submission
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 3000) // Show alert for 3000 ms or 3 seconds
      return () => clearTimeout(timer)
    }
  }, [showAlert])

  return (
    <S.Root {...props}>
      <TrafficLights />

      {showAlert && (
        <Box
          css={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: '#4CAF50',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            fontSize: '16px',
            zIndex: 1000
          }}
        >
          Report submitted successfully!
        </Box>
      )}

      <S.Aside css={{ position: 'absolute', right: 0 }}>
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
              <Icon name="ExclamationTriangleIcon" width={15} height={15} />
              <span
                style={{
                  visibility: 'hidden',
                  width: '120px',
                  backgroundColor: 'black',
                  color: '#fff',
                  textAlign: 'center',
                  borderRadius: '6px',
                  padding: '5px 0',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: '125%', // Adjust the position accordingly
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: '0px 2px 5px rgba(0,0,0,0.2)'
                }}
              >
                Click to provide feedback
              </span>
            </Button>
          </Dialog.Trigger>

          <Dialog.Content
            css={{
              maxWidth: '600px', // Limiting the width of the dialog
              padding: '20px', // More padding for better layout
              backgroundColor: '#202020', // Dialog background color
              borderRadius: '8px', // Rounded corners
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Soft shadow for better depth
            }}
          >
            <Dialog.Header css={{ borderBottom: '1px solid #ccc' }}>
              <Dialog.Title css={{ color: '#fff' }}>Feedback</Dialog.Title>
            </Dialog.Header>
            <Dialog.Description css={{ margin: '20px 0', color: '#aaa' }}>
              If you're having problems, please report them here. Provide as
              much detail as possible:
            </Dialog.Description>

            <textarea
              aria-label="Describe your issue"
              placeholder="Describe the issue..."
              style={{
                width: '100%',
                minHeight: '100px',
                margin: '10px 0',
                padding: '10px',
                borderRadius: '5px',
                borderColor: '#ccc',
                backgroundColor: '#333',
                color: '#fff',
                outline: 'none'
              }}
            />

            <Box
              css={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}
            >
              <Button
                onClick={handleSubmit}
                css={{ backgroundColor: '#4CAF50' }}
              >
                Submit
              </Button>
            </Box>
          </Dialog.Content>
        </Dialog.Root>
      </S.Aside>
    </S.Root>
  )
}

export default memo(AppBar) as typeof AppBar
