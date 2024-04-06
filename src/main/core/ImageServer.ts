import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { join } from 'path'

import {
  DEVELOPMENT_EXECUTABLE_PATHS,
  SERVER_EXECUTABLE_PATHS
} from '@common/constants/core'

class ImageServer {
  #child: ChildProcessWithoutNullStreams | null = null
  #command: string | null = null

  constructor(
    cwd: string,
    platform: NodeJS.Platform,
    arch: NodeJS.Architecture
  ) {
    const executablePaths =
      process.env.NODE_ENV === 'development'
        ? DEVELOPMENT_EXECUTABLE_PATHS
        : SERVER_EXECUTABLE_PATHS

    const serverPath: string | undefined = executablePaths[platform]?.[arch]

    if (!serverPath)
      throw Error(`Unsupported platform/architecture: ${platform}/${arch}`)

    this.#command =
      process.env.NODE_ENV === 'development'
        ? join('src/java/build', serverPath)
        : join(cwd, 'server', serverPath)
  }

  run() {
    if (this.#child) return

    const command = this.#command

    if (!command) throw Error('Missing command to start image server')

    this.#child = this.initChild(command)

    if (!this.#child) throw Error('Failed to start image server')

    this.#child = this.initListeners(this.#child)
  }

  stop() {
    if (!this.#child) return
    this.#child.kill()
    this.#child = null
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
