import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { join } from 'path'

import { SERVER_EXECUTABLE_PATHS } from '@common/constants/core'

class ImageServer {
  #DEFAULT_EXECUTABLE_PATH =
    'src/java/build/mac-arm/Contents/MacOS/AnnotAidReader' as const

  #child: ChildProcessWithoutNullStreams | null = null
  #command: string | null = null

  constructor(
    cwd: string,
    platform: NodeJS.Platform,
    arch: NodeJS.Architecture
  ) {
    const serverPath: string | undefined =
      SERVER_EXECUTABLE_PATHS[platform]?.[arch]

    if (!serverPath)
      throw Error(`Unsupported platform/architecture: ${platform}/${arch}`)

    this.#command =
      process.env.NODE_ENV === 'development'
        ? this.#DEFAULT_EXECUTABLE_PATH
        : join(cwd, 'server', serverPath)
  }

  run() {
    const command = this.#command

    if (!command) throw Error('Missing command to start image server')

    this.#child = this.initChild(command)

    if (!this.#child) throw Error('Failed to start image server')

    this.#child = this.initListeners(this.#child)
  }

  private initChild(command: string, args?: string[]) {
    return spawn(command, args)
  }

  private initListeners(child: ChildProcessWithoutNullStreams) {
    child.stdout.on('data', (data) => {
      if (process.env.NODE_ENV === 'development')
        console.log(`Executable stdout: ${data}`)
    })

    child.stderr.on('data', (data) => {
      if (process.env.NODE_ENV === 'development')
        console.error(`Executable stderr: ${data}`)
    })

    child.on('close', (code) => {
      if (process.env.NODE_ENV === 'development')
        console.log(`Executable exited with code ${code}`)
    })

    return child
  }
}

export default ImageServer
