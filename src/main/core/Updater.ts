import { BrowserWindow, app } from 'electron'
import { autoUpdater } from 'electron-updater'
import { join } from 'path'

import { mainToRenderer } from '@common/utils/event'

import { IN_MILLISECONDS, MINUTE } from '@common/constants/time'

class Updater {
  private URL: string
  private INTERVAL: number

  private interval: NodeJS.Timeout | null = null

  constructor(
    url: string = 'http://localhost:3001',
    interval: number = 60 * MINUTE * IN_MILLISECONDS
  ) {
    this.URL = url
    this.INTERVAL = interval
  }

  initialize() {
    const url = this.getUrl()

    autoUpdater.setFeedURL({ provider: 'generic', url })

    this.interval = setInterval(() => {
      autoUpdater.checkForUpdates()
    }, this.INTERVAL)
  }

  checkForUpdates() {
    if (!autoUpdater.isUpdaterActive()) return
    autoUpdater.checkForUpdates()
  }

  stop() {
    if (!this.interval) return
    clearInterval(this.interval)
  }

  registerEvents(window: BrowserWindow) {
    autoUpdater.on('error', (error) => {
      mainToRenderer('UPDATER_ERROR').main(window, { error })
    })

    autoUpdater.on('checking-for-update', () => {
      mainToRenderer('UPDATER_CHECKING_FOR_UPDATE').main(window)
    })

    autoUpdater.on('update-available', () => {
      mainToRenderer('UPDATER_UPDATE_AVAILABLE').main(window)
    })

    autoUpdater.on('update-not-available', () => {
      mainToRenderer('UPDADER_UPDATE_NOT_AVAILABLE').main(window)
    })

    autoUpdater.on('download-progress', (info) => {
      mainToRenderer('UPDATER_DOWNLOAD_PROGRESS').main(window, { info })
    })

    autoUpdater.on('update-downloaded', () => {
      mainToRenderer('UPDATER_UPDATE_DOWNLOADED').main(window)
    })
  }

  private getUrl() {
    const version = app.getVersion()
    const platform = process.platform

    return join(this.URL, '/update/', platform, version)
  }
}

export default Updater
