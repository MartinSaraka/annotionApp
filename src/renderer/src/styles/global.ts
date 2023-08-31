import { globalCss } from './theme'

export const globalStyles = globalCss({
  ':root': {
    '--cursor-viewer': 'grab'
  },

  '*, *:before, *:after': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    '-webkit-tap-highlight-color': 'transparent',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale'
  },

  body: {
    fontFamily: '$sans',
    backgroundColor: '$gray800',
    color: '$gray400',

    fontSize: '$3',
    lineHeight: '$3',
    fontWeight: 400,

    maxWidth: '100vw',
    overflowX: 'hidden'
  },

  'input, button, textarea, select': {
    fontFamily: 'inherit'
  },

  'h1, h2, h3, h4, h5, h6': {
    fontWeight: 'inherit',
    fontStyle: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit'
  },

  button: {
    padding: 0,
    appearance: 'none',
    background: 'none',
    border: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    cursor: 'pointer'
  },

  a: {
    color: 'inherit',
    textDecoration: 'none'
  },

  input: {
    background: 'transparent',
    border: 'none',
    fontFamily: 'inherit',
    fontSize: 'inherit'
  },

  'img, svg': {
    maxWidth: '100%',
    display: 'block'
  },

  iframe: {
    border: 'none',
    display: 'block'
  },

  ul: {
    listStyleType: 'none'
  },

  // Custom Window
  '.draggable-window': {
    '-webkit-app-region': 'drag'
  },

  '.non-draggable-window': {
    '-webkit-app-region': 'no-drag'
  },

  // React Grid Layout
  '.react-grid-item.react-grid-placeholder': {
    opacity: '0.7 !important',
    backgroundColor: '$purple5 !important',

    borderRadius: '$6',
    border: '1.5px dashed $purple10'
  },

  // Annotorious
  'svg.a9s-annotationlayer': {
    '.a9s-selection ': {
      '.a9s-outer': {},
      '.a9s-inner': {}
    },

    '.a9s-annotation': {
      '.a9s-outer': {
        stroke: '$blueA7'
      },

      '.a9s-inner': {
        '&:hover': {
          stroke: '$blueA8'
        }
      },

      '&.editable': {
        '.a9s-outer': {
          stroke: '$blueA8'
        },

        '.a9s-inner': {
          stroke: '$blueA8',
          fill: '$blueA4'
        },

        '&:hover': {
          '.a9s-outer': {
            stroke: '$blueA8'
          },

          '.a9s-inner': {
            stroke: '$blueA8',
            fill: '$blueA4'
          }
        }
      },

      '&.selected:hover': {
        '.a9s-outer': {},
        '.a9s-inner': {}
      },

      '&.hover:hover': {
        '.a9s-outer': {},
        '.a9s-inner': {}
      }
    },

    '.a9s-handle': {
      '.a9s-handle-outer': {
        fill: 'transparent',
        stroke: '$blueA7',
        strokeWidth: 3
      },

      '.a9s-handle-inner': {
        stroke: '$blueA7',
        fill: 'transparent'
      }
    },

    '.a9s-selection-mask': {}
  },

  // TODO: Dropzone
  ':root[data-dropzone-visible="true"]::before': {
    content: '',
    display: 'block',

    position: 'fixed',
    inset: 0,

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 99999
  }
})
