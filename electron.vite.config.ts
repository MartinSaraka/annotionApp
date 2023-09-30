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
    plugins: [react()],
    define: {
      'process.env': process.env
    },
    build: {
      rollupOptions: {
        external: ['openseadragon']
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
