import { app, shell, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { fixPathForAsarUnpack } from 'electron-util'
import { join } from 'path'
import Route from 'route-parser'

import { ImageServer, Storage } from './core'
import { IN_MILLISECONDS, MINUTE } from '@common/constants/time'
import { ELECTRON_BROWSER_WINDOW_DEFAULT_OPTIONS } from '@common/constants/window'
import { PROTOCOL_NAME } from '@common/constants/global'

import {
  mainToRenderer,
  rendererToMain,
  rendererToMainAndBack
} from '@common/utils/event'

app.setAsDefaultProtocolClient(PROTOCOL_NAME)

// Auth Storage
type TAuthStorage = {
  accessToken: string
  csrfToken: string
}

const authStorage = new Storage<TAuthStorage>(
  process.env.MAIN_VITE_AUTH_STORAGE_NAME || 'auth',
  process.env.MAIN_VITE_AUTH_STORAGE_ENCRYPTION_KEY || ''
)

// Auth Route
const loginRoute = new Route<{ identityToken: string }>(
  `${PROTOCOL_NAME}://login/:identityToken`
)

// Hazel Updater
const server = process.env.MAIN_VITE_HAZEL_SERVER_URL || 'localhost:3001'
const url = join(server, '/update/', process.platform, app.getVersion())
autoUpdater.setFeedURL({ provider: 'generic', url })

// Image Server
const imageServer = new ImageServer(
  fixPathForAsarUnpack(__dirname),
  process.platform,
  process.arch
)

let mainWindow: BrowserWindow | null = null

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    ...ELECTRON_BROWSER_WINDOW_DEFAULT_OPTIONS,

    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // TODO: core
  app.on('open-url', (event, url) => {
    event.preventDefault()

    // Parse the URL and extract the access token
    const params = loginRoute.match(url)
    if (!params) return

    const identityToken = params.identityToken
    if (!identityToken) return

    const csrfToken = authStorage.get('csrfToken')
    if (!csrfToken) return

    if (!mainWindow) return
    // Send access and csrf token to the renderer process
    mainToRenderer('AUTH_TOKENS').main(mainWindow, {
      identityToken,
      csrfToken
    })

    setTimeout(() => {
      mainWindow?.focus()
    }, 200)
  })

  const updaterInterval = setInterval(() => {
    autoUpdater.checkForUpdates()
  }, 15 * MINUTE * IN_MILLISECONDS)

  mainWindow.on('closed', () => {
    mainWindow = null
    clearInterval(updaterInterval)
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.maximize()
    mainWindow?.show()
  })

  mainWindow.on('focus', () => {
    if (!mainWindow) return

    mainToRenderer('WINDOW_IS_FOCUSED').main(mainWindow)
  })

  mainWindow.webContents.on('did-finish-load', () => {
    // Call the function when the main window is ready.
    imageServer.run()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('sk.annotaid.app')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  autoUpdater.checkForUpdates()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  /* FROM RENDERER HANDLERS */
  rendererToMain('WINDOW_ACTION').main((_event, { action }) => {
    if (!mainWindow) return
    if (action === 'close') return mainWindow.close()
    if (action === 'minimize') return mainWindow.minimize()
    if (action === 'maximize') {
      if (mainWindow.isMaximized()) return mainWindow.unmaximize()
      return mainWindow?.maximize()
    }
  })

  rendererToMain('SET_CSRF_TOKEN').main((_event, { csrfToken }) => {
    authStorage.set('csrfToken', csrfToken)
  })

  rendererToMain('SET_ACCESS_TOKEN').main((_event, { accessToken }) => {
    authStorage.set('accessToken', accessToken)
    setTimeout(() => {
      mainWindow?.focus()
    }, 200)
  })

  rendererToMainAndBack('GET_ACCESS_TOKEN').main(() => {
    return { accessToken: authStorage.get('accessToken') }
  })

  rendererToMain('DELETE_ACCESS_TOKEN').main(() => {
    authStorage.delete('accessToken')
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

autoUpdater.on('error', (eventDetails) => {
  mainWindow?.webContents.send('electron-auto-updater', {
    eventName: 'error',
    eventDetails
  })
})

autoUpdater.on('checking-for-update', () => {
  mainWindow?.webContents.send('electron-auto-updater', {
    eventName: 'checking-for-update',
    eventDetails: null
  })
})

autoUpdater.on('update-available', () => {
  mainWindow?.webContents.send('electron-auto-updater', {
    eventName: 'update-available',
    eventDetails: null
  })
})

autoUpdater.on('update-not-available', () => {
  mainWindow?.webContents.send('electron-auto-updater', {
    eventName: 'update-not-available',
    eventDetails: null
  })
})

autoUpdater.on('download-progress', (eventDetails) => {
  mainWindow?.webContents.send('electron-auto-updater', {
    eventName: 'download-progress',
    eventDetails
  })
})

autoUpdater.on('update-downloaded', () => {
  mainWindow?.webContents.send('electron-auto-updater', {
    eventName: 'update-downloaded',
    eventDetails: null
  })
})
