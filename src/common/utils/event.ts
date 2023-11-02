import { ElectronEvent, ElectronEventProps } from '@common/types/event'

export const toMain = (
  event: keyof typeof ElectronEvent,
  props: ElectronEventProps[(typeof ElectronEvent)[typeof event]]
) => {
  return [ElectronEvent[event], props] as const
}

export const fromRenderer = (
  event: keyof typeof ElectronEvent,
  cb: (
    _: unknown,
    args: ElectronEventProps[(typeof ElectronEvent)[typeof event]]
  ) => void
) => {
  return [ElectronEvent[event], cb] as const
}
