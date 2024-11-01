import { createStitches, PropertyValue } from '@stitches/react'

import {
  blackA,
  gray,
  purple,
  red,
  blueA,
  green,
  yellow,
  violet
} from '@radix-ui/colors'

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config
} = createStitches({
  theme: {
    palette: {
      white: '#FFFFFF',
      black: '#000000',

      gray200: '#F9F8FC',
      gray400: '#CCCDD0',
      gray800: '#25252D',
      gray900: '#1F1E20',

      dark1: '#101021',
      dark2: '#212134',
      dark3: '#2D2D42',
      dark4: '#6A6A8C',
      dark5: '#4B4B68',

      blue1: '#006CEB',
      blue2: '#0074FF',
      blue3: '#3E63DD',
      blue4: '#0C8CE9',

      crimson1: '#3A1B27',
      crimson4: '#FF85AC'
    },

    colors: {
      light: '$palette$white',
      dark: '$palette$black',

      dark1: '$palette$dark1',
      dark2: '$palette$dark2',
      dark3: '$palette$dark3',
      dark4: '$palette$dark4',
      dark5: '$palette$dark5',

      gray200: '$palette$gray200',
      gray400: '$palette$gray400',
      gray800: '$palette$gray800',
      gray900: '$palette$gray900',

      blue1: '$palette$blue1',
      blue2: '$palette$blue2',
      blue3: '$palette$blue3',
      blue4: '$palette$blue4',

      crimson1: '$palette$crimson1',
      crimson4: '$palette$crimson4',

      ...blackA,
      ...gray,

      ...purple,
      ...violet,

      ...red,
      ...green,
      ...yellow,
      ...blueA
    },

    space: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      13: '52px',
      14: '56px',
      15: '60px',
      16: '64px',
      17: '68px',
      18: '72px'
    },

    fonts: {
      sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },

    fontSizes: {
      1: '4px',
      2: '6px',
      3: '8px',
      4: '10px',
      5: '12px',
      6: '14px',
      7: '22px',
      8: '24px',
      9: '26px',
      10: '28px',
      11: '32px',
      12: '34px',
      13: '36px',
      14: '40px',
      15: '48px'
    },

    lineHeights: {
      none: 1,
      1: '8px',
      2: '12px',
      3: '16px',
      4: '20px',
      5: '18px',
      6: '28px',
      7: '32px',
      8: '36px',
      9: '40px',
      10: '44px',
      11: '48px',
      12: '52px'
    },

    radii: {
      1: '2px',
      2: '4px',
      3: '6px',
      4: '8px',
      5: '10px',
      6: '12px',
      7: '14px',
      8: '16px',
      9: '18px',
      10: '20px',
      11: '22px',
      12: '24px',
      13: '26px',
      14: '28px',
      15: '30px',
      ellipse: '50%',
      pill: '99999px'
    },

    borderWidths: {
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px'
    },

    borderStyles: {
      solid: 'solid',
      dashed: 'dashed',
      dotted: 'dotted'
    },

    zIndices: {
      down: -100,
      base: 0,
      up: 100,
      upper: 200,
      header: 1000,
      popover: 1500,
      modal: 2000,
      toast: 2500,
      loading: 3000,
      trafficLights: 4000
    }
  },

  media: {
    largePhone: '(min-width: 390px)',
    smallTablet: '(min-width: 600px)',
    largeTablet: '(min-width: 1024px)',
    smallLaptop: '(min-width: 1366px)',
    largeLaptop: '(min-width: 1440px)',
    desktop: '(min-width: 1920px)'
  },

  utils: {
    _appRegion: (value: 'drag' | 'no-drag') => ({
      '-webkit-app-region': value
    }),

    _bgAlpha: ([color, opacity]: [
      PropertyValue<'backgroundColor'>,
      string
    ]) => ({
      backgroundColor: `color-mix(in srgb, ${color}, transparent ${opacity}%)`
    }),

    _colorAlpha: ([color, opacity]: [PropertyValue<'color'>, string]) => ({
      color: `color-mix(in srgb, ${color}, transparent ${opacity}%)`
    }),

    _size: (value: PropertyValue<'width'>) => ({
      width: value,
      height: value
    })
  }
})
