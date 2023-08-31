export type TToastType = 'info' | 'success' | 'danger' | 'warning'

export type TToast = {
  id: TID
  title: string
  message?: string
  type?: TToastType
  duration?: number
  action?: {
    text: string
    onClick: () => void
  }
}
