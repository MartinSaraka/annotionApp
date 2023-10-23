import { app, shell, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'

import childProcess from 'child_process'
import { fixPathForAsarUnpack } from 'electron-util'

import icon from '../../resources/icon.png?asset'

import { IN_MILLISECONDS, MINUTE } from '@common/constants/time'
import { ELECTRON_BROWSER_WINDOW_DEFAULT_OPTIONS } from '@common/constants/window'

const fixedDirname = fixPathForAsarUnpack(__dirname)

// Hazel Updater
const server = process.env.MAIN_VITE_HAZEL_SERVER_URL || 'localhost:3001'
const url = join(server, '/update/', process.platform, app.getVersion())
autoUpdater.setFeedURL({ provider: 'generic', url })

// Image server
const SERVER_PATHS: Partial<
  Record<NodeJS.Platform, Partial<Record<NodeJS.Architecture, string>>>
> = {
  darwin: {
    arm: 'server/Contents/MacOS/Server',
    arm64: 'server/Contents/MacOS/Server',
    x64: 'server/Contents/MacOS/Server'
  },
  win32: {
    x64: 'server/win/Server.exe'
  }
}

const SERVER_PATH =
  process.env.NODE_ENV === 'development'
    ? 'src/java/build/mac-arm/Contents/MacOS/Server'
    : join(
        fixedDirname,
        SERVER_PATHS[process.platform]?.[process.arch] || 'server/not-supported'
      )

let mainWindow: BrowserWindow | null = null

const runServer = () => {
  const child = childProcess.spawn(SERVER_PATH)

  child.stdout.on('data', (data) => {
    console.log(`Executable stdout: ${data}`)
  })

  child.stderr.on('data', (data) => {
    console.error(`Executable stderr: ${data}`)
  })

  child.on('close', (code) => {
    console.log(`Executable exited with code ${code}`)
  })
}

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    ...ELECTRON_BROWSER_WINDOW_DEFAULT_OPTIONS,

    ...(process.platform === 'linux' ? { icon } : {}),

    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
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

  mainWindow.webContents.on('did-finish-load', () => {
    // Call the function when the main window is ready.
    runServer()
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
  electronApp.setAppUserModelId('sk.hiat.app')

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
