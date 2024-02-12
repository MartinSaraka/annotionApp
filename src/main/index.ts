import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { fixPathForAsarUnpack } from 'electron-util'
import { join } from 'path'
import Route from 'route-parser'

import { ImageServer } from './core'
import { IN_MILLISECONDS, MINUTE } from '@common/constants/time'
import { ELECTRON_BROWSER_WINDOW_DEFAULT_OPTIONS } from '@common/constants/window'
import { PROTOCOL_NAME } from '@common/constants/global'

import { fromRenderer } from '@common/utils/event'

const loginRoute = new Route<{ token: string }>(
  `${PROTOCOL_NAME}://login/:token`
)

app.setAsDefaultProtocolClient(PROTOCOL_NAME)

app.on('open-url', (event, url) => {
  event.preventDefault()
  const params = loginRoute.match(url)
  if (!params) return
  console.log(params)
})

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

  ipcMain.on(
    ...fromRenderer('WINDOW_ACTION', (_, { action }) => {
      switch (action) {
        case 'close':
          mainWindow?.close()
          break
        case 'minimize':
          mainWindow?.minimize()
          break
        case 'maximize':
          if (mainWindow?.isMaximized()) mainWindow?.unmaximize()
          else mainWindow?.maximize()
          break
      }
    })
  )

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
