import { join, resolve } from 'path'
import {
  defineConfig,
  externalizeDepsPlugin,
  bytecodePlugin
} from 'electron-vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'
import react from '@vitejs/plugin-react'

import { SERVER_PATHS } from './src/common/constants/core'

const getServerPath = (platform?: string, arch?: string) => {
  if (!platform) throw new Error('No platform specified.')
  if (!arch) throw new Error('No architecture specified.')

  const serverPath: string | undefined = SERVER_PATHS[platform]?.[arch]

  if (!serverPath)
    throw new Error(`Unsupported platform/architecture: ${platform}/${arch}.`)

  return join('src/java/build', serverPath)
}

export default defineConfig(({ mode }) => ({
  main: {
    plugins: [
      externalizeDepsPlugin(),
      bytecodePlugin(),
      ...(mode === 'production'
        ? [
            viteStaticCopy({
              targets: [
                {
                  src: getServerPath(
                    process.env.PLATFORM || process.platform,
                    process.env.ARCH || process.arch
                  ),
                  dest: 'server'
                }
              ]
            })
          ]
        : [])
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
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@common': resolve('src/common'),
        path: 'path-browserify'
      }
    }
  }
}))
