import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import getPort from 'get-port'

class ImageServer {
  #DEFAULT_EXECUTABLE_PATH = 'src/java/out/mac/Contents/MacOS/Server' as const
  #DEFAULT_PORT = 9090 as const

  #child: ChildProcessWithoutNullStreams | null = null

  constructor(path?: string) {
    const command = path || this.#DEFAULT_EXECUTABLE_PATH

    this.#getAvailablePort(this.#DEFAULT_PORT)
      .then((port) => {
        this.#child = this.#initChild(command, [`--port ${port}`])

        if (!this.#child) throw Error('Failed to start image server')

        this.#child = this.#initListeners(this.#child)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  #initChild = (command: string, args?: string[]) => {
    return spawn(command, args)
  }

  #getAvailablePort = async (port: number) => {
    return await getPort({ port })
  }

  #initListeners = (child: ChildProcessWithoutNullStreams) => {
    child.stdout.on('data', (data) => {
      console.log(`Executable stdout: ${data}`)
    })

    child.stderr.on('data', (data) => {
      console.error(`Executable stderr: ${data}`)
    })

    child.on('close', (code) => {
      console.log(`Executable exited with code ${code}`)
    })

    return child
  }
}

export default ImageServer
