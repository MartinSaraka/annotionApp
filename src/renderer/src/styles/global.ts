import { globalCss, keyframes } from './theme'

const pulseKeyframes = keyframes({
  '0%': {
    boxShadow: 'rgb(12, 140, 233) 0 0 0 0'
  },
  '75%': {
    boxShadow: 'rgba(12, 140, 233, 0) 0 0 0 8px'
  }
})

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
    '-moz-osx-font-smoothing': 'grayscale',
    outline: 'none'
  },

  body: {
    position: 'relative',

    fontFamily: '$sans',
    backgroundColor: '$dark2',
    color: '$light',

    fontSize: '$5',
    lineHeight: '$5',
    fontWeight: 400,

    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
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
    cursor: 'pointer',

    outline: 'none',

    '&:focus:not(:disabled), &:active:not(:disabled), &:active:focus:not(:disabled)':
      {
        outline: '1px solid #0074FF',
        outlineOffset: 2
      }
  },

  a: {
    color: 'inherit',
    textDecoration: 'none'
  },

  'input, textarea': {
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

  // TreeView
  '.treeRoot': {
    height: '100%'
  },

  '.draggingSource': {
    opacity: 0.3
  },

  '.dropTarget': {
    backgroundColor: '$dark3'
  },

  // OpenSeadragon
  '.openseadragon-container': {
    '.navigator': {
      marginTop: '$4 !important',
      marginRight: '$4 !important'
    }
  },

  ':root:not([style*="--cursor-viewer:grab"]) .a9s-annotation': {
    '.a9s-outer, .a9s-inner': {
      pointerEvents: 'none'
    }
  },

  '#open-seadragon': {
    '.a9s-annotation': {
      '&[data-visibility="hidden"], *[data-visibility="hidden"]': {
        visibility: 'hidden !important',
        userSelect: 'none !important',
        pointerEvents: 'none !important',
        transform: 'scale(0) !important',
        overflow: 'hidden !important'
      }
    }
  },

  // Annotorious
  'svg.a9s-annotationlayer': {
    foreignObject: {
      overflow: 'visible',
      width: '1px',
      height: '1px'
    },

    '.a9s-non-scaling': {
      '.a9s-formatter-el g': {
        transform: 'scale(1) translateX(-12px) translateY(-12px)'
      }
    },

    // With icon
    'g[data-class-id="hard_negative_mitosis"], g[data-class-id="undetermined"]':
      {
        '.a9s-shape-label': {
          '&:before, &:after': {
            content: 'var(--class-warning, "⚠ ") var(--class-name)'
          }
        }
      },

    '.a9s-annotation:hover .a9s-shape-label, .a9s-annotation.hover .a9s-shape-label, .a9s-annotation.selected .a9s-shape-label, .a9s-shape-label:hover':
      {
        '&:before, &:after': {
          maxWidth: 'initial',
          textOverflow: 'initial'
        }
      },

    // START LABELS

    '.a9s-shape-label-wrapper': {
      display: 'flex',
      gap: 2,

      '&:hover': {
        ':before, :after, span': {
          transform: 'translateY(calc(-100% - $space$2)) translateX(-$space$1)'
        }
      }
    },

    '.a9s-shape-label, .a9s-shape-sublabel': {
      display: 'flex',

      whiteSpace: 'nowrap',

      paddingLeft: '$1',
      paddingTop: '$1',

      '&:before, &:after': {
        maxWidth: '15ch',
        overflow: 'hidden',
        textOverflow: 'ellipsis',

        flexShrink: 0,
        paddingInline: 'calc($1 + 2px)',
        paddingBlock: 'calc($1 + 1px)',

        fontSize: '$4',
        lineHeight: '92%',
        fontWeight: 600,

        borderRadius: '$4'
      },

      position: 'relative',

      '&:after': {
        position: 'absolute',
        left: '$1',
        top: '$1'
      }
    },

    '.a9s-shape-label': {
      '&:before': {
        content: 'var(--class-name)',
        backgroundColor: 'rgb(var(--class-color, 12, 140, 233))',
        filter: 'hue-rotate(-6deg) saturate(118%) brightness(22%)',
        color: 'rgb(var(--class-color, 12, 140, 233))'
      },

      '&:after': {
        content: 'var(--class-name)',
        color: 'rgb(var(--class-color, 12, 140, 233))'
      }
    },

    '.a9s-shape-sublabel': {
      fontSize: '$4',
      lineHeight: '92%',
      fontWeight: 600,

      paddingLeft: 0,

      span: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',

        paddingInline: 'calc($1 + 2px)',
        paddingBlock: 'calc($1 + 1px)',
        backgroundColor: '$blue2',
        borderRadius: '$4'
      }
    },

    // STOP LABELS

    '.a9s-selection ': {
      '.a9s-outer': {},
      '.a9s-inner': {}
    },

    // Generating status
    '.a9s-point[data-status="generating"]': {
      position: 'relative',
      borderRadius: '50%',

      circle: {
        fill: 'transparent',
        stroke: 'transparent'
      },

      g: {
        transform: 'scale(1) !important',
        inset: 0
      },

      '.a9s-formatter-el': {
        display: 'block',
        pointerEvents: 'none',
        position: 'absolute',
        borderRadius: '50%',
        inset: 0,
        width: '100% !important',
        height: '100% !important',

        foreignobject: {
          width: '100%',
          height: '100%',
          borderRadius: '50%'
        }
      },

      '.a9s-generating-wrapper': {
        borderRadius: '50%',
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'block',
        backgroundColor: 'rgb(12, 140, 233)',
        animation: `${pulseKeyframes} 1500ms infinite`
      }
    },

    '.a9s-annotation': {
      '.a9s-outer': {
        stroke: 'rgb(var(--class-color, 12, 140, 233))'
      },

      '.a9s-inner': {
        stroke: 'rgb(var(--class-color, 12, 140, 233))',

        '&:hover': {
          stroke: '$blue8'
        }
      },

      '&.highlight': {
        '.a9s-inner': {
          fill: 'rgba(var(--class-color, 12, 140, 233), 0.2)'
        }
      },

      '&.editable': {
        '.a9s-outer': {
          stroke: '$blueA8'
        },

        '.a9s-inner': {
          stroke: '$blueA8',
          fill: 'rgba(var(--class-color, 12, 140, 233), 0.1)'
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
