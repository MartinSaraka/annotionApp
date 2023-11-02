export const ELECTRON_BROWSER_WINDOW_DEFAULT_OPTIONS: Electron.BrowserWindowConstructorOptions =
  {
    width: 900,
    height: 670,

    show: false,
    frame: false,
    autoHideMenuBar: true,

    titleBarStyle: 'hidden',

    ...(process.platform === 'darwin' && {
      trafficLightPosition: { x: 16, y: 13 }
    })
  }
