import { ipcMain, ipcRenderer } from 'electron'

import type {
  TElectronEvent,
  TElectronEventArgs,
  TElectronEventReturn
} from '@common/types/event'

export const rendererToMain = <TEvent extends keyof typeof TElectronEvent>(
  channel: TEvent
) => ({
  renderer: (
    args: TElectronEventArgs[(typeof TElectronEvent)[typeof channel]]
  ) => ipcRenderer.send(channel, args),
  main: (
    listener: (
      event: Electron.IpcMainEvent,
      args: TElectronEventArgs[(typeof TElectronEvent)[typeof channel]]
    ) => void
  ) => ipcMain.on(channel, listener)
})

export const rendererToMainAndBack = <
  TEvent extends keyof typeof TElectronEvent
>(
  channel: TEvent
) => ({
  renderer: (
    args: TElectronEventArgs[(typeof TElectronEvent)[typeof channel]]
  ): Promise<TElectronEventReturn[(typeof TElectronEvent)[typeof channel]]> =>
    ipcRenderer.invoke(channel, args),
  main: (
    listener: (
      event: Electron.IpcMainInvokeEvent,
      args: TElectronEventArgs[(typeof TElectronEvent)[typeof channel]]
    ) => TElectronEventReturn[(typeof TElectronEvent)[typeof channel]]
  ) => ipcMain.handle(channel, listener)
})

export const mainToRenderer = <TEvent extends keyof typeof TElectronEvent>(
  channel: TEvent
) => ({
  main: (
    window: Electron.BrowserWindow,
    args: TElectronEventArgs[(typeof TElectronEvent)[typeof channel]]
  ) => window.webContents.send(channel, args),
  renderer: (
    listener: (
      event: Electron.IpcRendererEvent,
      args: TElectronEventArgs[(typeof TElectronEvent)[typeof channel]]
    ) => void
  ) => ipcRenderer.on(channel, listener)
})
