export enum ElectronEvent {
  WINDOW_ACTION = 'electron:window'
}

export type ElectronEventProps = {
  [ElectronEvent.WINDOW_ACTION]: {
    action: 'close' | 'minimize' | 'maximize'
  }
}
