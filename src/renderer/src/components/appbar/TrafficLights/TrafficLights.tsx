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

  /* Reserved space for window controls */
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
      <Box
        as={SVG}
        src={trafficLightRed}
        width={12}
        height={12}
        title="Close window"
        css={{ _appRegion: 'no-drag' }}
        onClick={handleAction('close')}
      />
      <Box
        as={SVG}
        src={trafficLightOrange}
        width={12}
        height={12}
        title="Minimize window"
        css={{ _appRegion: 'no-drag' }}
        onClick={handleAction('minimize')}
      />
      <Box
        as={SVG}
        src={trafficLightGreen}
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
