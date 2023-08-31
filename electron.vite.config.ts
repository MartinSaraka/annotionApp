import { resolve } from 'path'
import {
  defineConfig,
  externalizeDepsPlugin,
  bytecodePlugin
} from 'electron-vite'

import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
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
    define: {
      'process.env': process.env
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@common': resolve('src/common'),
        path: 'path-browserify'
      }
    },
    plugins: [react()]
  }
})
