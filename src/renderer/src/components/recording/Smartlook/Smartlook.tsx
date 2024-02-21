import { memo, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'

import { Alert, Box, Button, Text } from '@renderer/ui'

import { useSettingsStore } from '@renderer/store'
import { initializeSmartlook } from '@common/utils/recording'

type TSmartlookProps = ComponentProps<typeof Box>

// TODO: translation
const Smartlook = (props: TSmartlookProps) => {
  const consent = useSettingsStore((state) => state.smartlookConsent)
  const setConsent = useSettingsStore((state) => state.setSmartlookConsent)

  const handleDeny = useCallback(() => {
    window.api.mainWindowAction({ action: 'close' })
  }, [])

  const handleAllow = useCallback(() => {
    setConsent()
    initializeSmartlook()
  }, [setConsent])

  return (
    <Alert.Root open={!consent} {...props}>
      <Alert.Content>
        <Alert.Header>
          <Alert.Title asChild>
            <Text variant="lg" css={{ fontWeight: 500 }}>
              Can we use Smartlook to record your screen?
            </Text>
          </Alert.Title>
        </Alert.Header>

        <Box css={{ padding: '$4', gap: '$4' }}>
          <Text>TODO</Text>

          <Box
            css={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: '$3'
            }}
          >
            <Button onClick={handleAllow}>Allow, and continue</Button>

            <Button outlined onClick={handleDeny}>
              Deny, and close app
            </Button>
          </Box>
        </Box>
      </Alert.Content>
    </Alert.Root>
  )
}

export default memo(Smartlook) as typeof Smartlook
