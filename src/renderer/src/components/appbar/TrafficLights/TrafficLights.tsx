import { memo, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'
import SVG from 'react-inlinesvg'

import { Box } from '@renderer/ui'

import trafficLightRed from '../../../../../../resources/icons/traffic-lights/red.svg'
import trafficLightOrange from '../../../../../../resources/icons/traffic-lights/orange.svg'
import trafficLightGreen from '../../../../../../resources/icons/traffic-lights/green.svg'

type TAppBarTrafficLightsProps = ComponentProps<typeof Box>

const TrafficLights = ({ css, ...rest }: TAppBarTrafficLightsProps) => {
  const { t } = useTranslation('common')

  const isDarwin = window.electron.process.platform === 'darwin'

  /* Reserved space for window controls on MacOS */
  if (isDarwin)
    return (
      <Box
        aria-label={t('aria.label.trafficLights')}
        css={{ width: 54, height: 12, _appRegion: 'no-drag' }}
      />
    )

  const handleAction = useCallback(
    (action: 'close' | 'minimize' | 'maximize') => () => {
      window.api.mainWindowAction({ action })
    },
    []
  )

  return (
    <Box
      aria-label={t('aria.label.trafficLights')}
      css={{
        width: 54,
        height: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
        _appRegion: 'no-drag',
        zIndex: '$trafficLights',

        '#icon': {
          visibility: 'hidden'
        },

        '&:hover #icon': {
          visibility: 'visible'
        },

        ...css
      }}
      {...rest}
    >
      {/* CLOSE WINDOW */}
      <Box
        as={SVG}
        src={trafficLightRed}
        role="button"
        aria-label={t('tooltips.window.close')}
        width={12}
        height={12}
        title={t('tooltips.window.close')}
        css={{ _appRegion: 'no-drag' }}
        onClick={handleAction('close')}
      />
      {/* MINIMIZE WINDOW */}
      <Box
        as={SVG}
        src={trafficLightOrange}
        role="button"
        aria-label={t('tooltips.window.minimize')}
        width={12}
        height={12}
        title={t('tooltips.window.minimize')}
        css={{ _appRegion: 'no-drag' }}
        onClick={handleAction('minimize')}
      />
      {/* MAXIMIZE WINDOW */}
      <Box
        as={SVG}
        src={trafficLightGreen}
        role="button"
        aria-label={t('tooltips.window.maximize')}
        width={12}
        height={12}
        title={t('tooltips.window.maximize')}
        css={{ _appRegion: 'no-drag' }}
        onClick={handleAction('maximize')}
      />
    </Box>
  )
}

export default memo(TrafficLights) as typeof TrafficLights
