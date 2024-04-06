import { app, shell, BrowserWindow } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { fixPathForAsarUnpack } from 'electron-util'
import { join, resolve } from 'path'

import { ELECTRON_BROWSER_WINDOW_DEFAULT_OPTIONS } from '@common/constants/window'
import { IN_MILLISECONDS, MINUTE } from '@common/constants/time'
import { PROTOCOL_NAME } from '@common/constants/global'

import { ImageServer, Router, Storage, Updater } from './core'

import {
  mainToRenderer,
  rendererToMain,
  rendererToMainAndBack
} from '@common/utils/event'

type TAuthStorage = {
  accessToken: string
  csrfToken: string
}

/**
 * Main class for the Electron application
 */
class Main {
  // Main BrowserWindow
  private window: BrowserWindow | null = null

  // Storage for authentication data
  private authStorage = new Storage<TAuthStorage>(
    process.env.MAIN_VITE_AUTH_STORAGE_NAME,
    process.env.MAIN_VITE_AUTH_STORAGE_ENCRYPTION_KEY
  )

  // Image server for handling image reading
  private imageReader = new ImageServer(
    fixPathForAsarUnpack(__dirname),
    process.platform,
    process.arch
  )

  // Updater for handling application updates
  private updater = new Updater(
    process.env.MAIN_VITE_HAZEL_SERVER_URL,
    15 * MINUTE * IN_MILLISECONDS
  )

  private startupUrl: string | null = null

  async execute() {
    // Prevent private URI scheme notifications on Windows + Linux from creating a new instance of the application
    const primaryInstance = app.requestSingleInstanceLock()
    if (!primaryInstance) return app.quit()

    // Initialize the updater
    this.updater.initialize()

    // Attempting to start a second instance will fire the following event to the running instance
    app.on('second-instance', (event, argv) =>
      this.onSecondInstance(event, argv)
    )

    // Default open or close DevTools by F12 in development
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window)
    })

    // Register IPC events
    this.registerIpcEvents()

    // This method will be called when Electron has finished initialization and is ready to create browser windows
    // Some APIs can only be used after this event occurs
    app.whenReady().then(() => this.onReady())

    // Quit when all windows are closed, except on macOS
    app.on('window-all-closed', () => this.onAllWindowsClosed())

    // Handle reactivation
    app.on('activate', () => this.onActivate())

    // Handle login responses or deep linking requests against the running app on Mac OS
    app.on('open-url', (event, url) => this.onOpenUrl(event, url))

    // Handle deep link url against the closed app
    this.startupUrl = this.getDeepLinkUrl(process.argv)
  }

  /**
   * Method to be called when Electron is ready to create browser windows
   */
  private async onReady() {
    // Set the app user model ID for Windows notifications
    electronApp.setAppUserModelId('sk.annotaid.app')

    // Create the main window
    this.window = new BrowserWindow({
      ...ELECTRON_BROWSER_WINDOW_DEFAULT_OPTIONS,

      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false
      }
    })

    // Register the private URI scheme
    this.registerPrivateUriScheme()

    // Handle window close event
    this.window.on('closed', () => this.onClosed())

    // Handle window ready to show event
    this.window.on('ready-to-show', () => this.onReadyToShow())

    // Handle window focus event
    this.window.on('focus', () => this.onFocus())

    // Handle window did finish load event
    this.window.webContents.on('did-finish-load', () => this.onDidFinishLoad())

    // Handle window open handler
    this.window.webContents.setWindowOpenHandler((details) =>
      this.handleSetWindowOpenHandler(details)
    )

    // Register updater events
    this.updater.registerEvents(this.window)

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.window.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.window.loadFile(join(__dirname, '../renderer/index.html'))
    }

    // Handle startup url
    this.handleStartupUrl()

    // Check for updates
    this.updater.checkForUpdates()
  }

  /**
   * Register IPC events
   */
  private registerIpcEvents() {
    // Handle window actions
    rendererToMain('WINDOW_ACTION').main((_event, { action }) => {
      if (!this.window) return
      if (action === 'close') return this.window.close()
      if (action === 'minimize') return this.window.minimize()
      if (action === 'maximize') {
        if (this.window.isMaximized()) return this.window.unmaximize()
        return this.window.maximize()
      }
    })

    //Set the CSRF token to the auth storage
    rendererToMain('SET_CSRF_TOKEN').main((_event, { csrfToken }) => {
      this.authStorage.set('csrfToken', csrfToken)
    })

    // Set the access token to the auth storage
    rendererToMain('SET_ACCESS_TOKEN').main((_event, { accessToken }) => {
      this.authStorage.set('accessToken', accessToken)
      if (!this.window) return
      if (this.window.isMinimized()) this.window.restore()
      this.window.focus()
    })

    //Get the access token from the auth storage
    rendererToMainAndBack('GET_ACCESS_TOKEN').main(() => {
      return { accessToken: this.authStorage.get('accessToken') }
    })

    // Delete the access token from the auth storage
    rendererToMain('DELETE_ACCESS_TOKEN').main(() => {
      this.authStorage.delete('accessToken')
    })
  }

  /**
   * Handle the startup URL
   */
  private handleStartupUrl() {
    if (!this.startupUrl) return
    this.handleDeepLink(this.startupUrl)
    this.startupUrl = null
  }

  /**
   * Handle the window open handler
   * @param details - The handler details
   * @returns action to deny
   */
  private handleSetWindowOpenHandler(details: Electron.HandlerDetails): {
    action: 'deny'
  } {
    shell.openExternal(details.url)
    return { action: 'deny' }
  }

  /**
   * Handle the second instance
   * @param _ - The event
   * @param argv - The arguments
   */
  private onSecondInstance(_: Electron.Event, argv: string[]) {
    const url = this.getDeepLinkUrl(argv)
    if (url) this.handleDeepLink(url)
  }

  /**
   * Get the deep link URL
   * @param argv - The arguments
   * @returns the deep link URL
   */
  private getDeepLinkUrl(argv: string[]) {
    for (const arg of argv) {
      if (arg.startsWith(PROTOCOL_NAME)) {
        return arg
      }
    }

    return null
  }

  /**
   * Handle the deep link
   * @param url - The URL
   * @returns the deep link URL
   */
  private handleDeepLink(url: string) {
    if (!this.window) return

    if (this.window.isMinimized()) this.window.restore()
    this.window.focus()

    Router.loginHandler(this.authStorage, this.window)(url)
  }

  /**
   * Handle the open URL
   * @param event - The event
   * @param url - The URL
   */
  private onOpenUrl(event: Electron.Event, url: string) {
    event.preventDefault()

    if (this.window) {
      this.handleDeepLink(url)
    } else {
      this.startupUrl = url
    }
  }

  /**
   * Handle the ready to show event
   */
  private onReadyToShow() {
    if (!this.window) return
    this.window.maximize()
    this.window.show()
  }

  /**
   * Handle the focus event
   */
  private onFocus() {
    if (!this.window) return
    mainToRenderer('WINDOW_IS_FOCUSED').main(this.window)
  }

  /**
   * Handle the did finish load event
   */
  private onDidFinishLoad() {
    this.imageReader.run()
  }

  /**
   * Handle the closed event
   */
  private onClosed() {
    this.window = null
    this.imageReader.stop()
    this.updater.stop()
  }

  /**
   * Handle the all windows closed event
   */
  private onAllWindowsClosed() {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  }

  /**
   * Handle the activate event
   */
  private onActivate() {
    if (this.window) return
    this.onReady()
  }

  /**
   * Register the private URI scheme
   */
  private registerPrivateUriScheme() {
    app.removeAsDefaultProtocolClient(PROTOCOL_NAME)
    if (app.isDefaultProtocolClient(PROTOCOL_NAME)) return
    if (
      process.env.NODE_ENV === 'development' &&
      process.platform === 'win32'
    ) {
      if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient(PROTOCOL_NAME, process.execPath, [
          resolve(process.argv[1])
        ])
      }
    } else {
      app.setAsDefaultProtocolClient(PROTOCOL_NAME)
    }
  }
}

try {
  const main = new Main()
  main.execute()
} catch (error) {
  console.log(JSON.stringify(error, null, 2))
  app.exit()
}
