import { resolve } from 'path'
import {
  defineConfig,
  externalizeDepsPlugin,
  bytecodePlugin
} from 'electron-vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'
import react from '@vitejs/plugin-react'

const SERVER_PATHS: Partial<
  Record<NodeJS.Platform, Partial<Record<NodeJS.Architecture, string>>>
> = {
  darwin: {
    arm: 'mac-arm/Contents',
    arm64: 'mac-arm/Contents',
    x64: 'mac-intel/Contents'
  },
  win32: {
    x64: 'win'
  }
}

const getServerPath = () =>
  `src/java/build/${
    SERVER_PATHS[process.platform]?.[process.arch] || 'not-supported'
  }`

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      bytecodePlugin(),
      viteStaticCopy({
        targets: [
          {
            src: getServerPath(),
            dest: 'server'
          }
        ]
      })
    ],
    resolve: {
      alias: {
        '@common': resolve('src/common')
      }
    }
  },

  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    resolve: {
      alias: {
        '@common': resolve('src/common')
      }
    }
  },

  renderer: {
    plugins: [react()],
    define: {
      'process.env': process.env
    },
    build: {
      rollupOptions: {
        //external: ['openseadragon']
      }
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@common': resolve('src/common'),
        path: 'path-browserify'
      }
    }
  }
})
