import { memo, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'
import SVG from 'react-inlinesvg'

import { Box } from '@renderer/ui'
import { toMain } from '@common/utils/event'

import trafficLightRed from '../../../../../../resources/icons/traffic-lights/red.svg'
import trafficLightOrange from '../../../../../../resources/icons/traffic-lights/orange.svg'
import trafficLightGreen from '../../../../../../resources/icons/traffic-lights/green.svg'

type TAppBarTrafficLightsProps = ComponentProps<typeof Box>

const TrafficLights = ({ css, ...rest }: TAppBarTrafficLightsProps) => {
  const isDarwin = window.electron.process.platform === 'darwin'

  /* Reserved space for window controls on MacOS */
  if (isDarwin)
    return (
      <Box
        aria-label="traffic-lights"
        css={{ width: 54, height: 12, _appRegion: 'no-drag' }}
      />
    )

  const handleAction = useCallback(
    (action: 'close' | 'minimize' | 'maximize') => () => {
      window.electron.ipcRenderer.send(...toMain('WINDOW_ACTION', { action }))
    },
    []
  )

  return (
    <Box
      aria-label="traffic-lights"
      css={{
        width: 54,
        height: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
        _appRegion: 'no-drag',

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
        aria-label="Close window"
        width={12}
        height={12}
        title="Close window"
        css={{ _appRegion: 'no-drag' }}
        onClick={handleAction('close')}
      />
      {/* MINIMIZE WINDOW */}
      <Box
        as={SVG}
        src={trafficLightOrange}
        role="button"
        aria-label="Minimize window"
        width={12}
        height={12}
        title="Minimize window"
        css={{ _appRegion: 'no-drag' }}
        onClick={handleAction('minimize')}
      />
      {/* MAXIMIZE WINDOW */}
      <Box
        as={SVG}
        src={trafficLightGreen}
        role="button"
        aria-label="Maximize window"
        width={12}
        height={12}
        title="Maximize window"
        css={{ _appRegion: 'no-drag' }}
        onClick={handleAction('maximize')}
      />
    </Box>
  )
}

export default memo(TrafficLights) as typeof TrafficLights
