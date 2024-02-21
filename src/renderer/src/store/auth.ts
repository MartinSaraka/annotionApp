import { User } from '@common/types/datamodel'
import { create } from 'zustand'

export type TAuthState = {
  user: User | null

  getMe: () => User | null

  authenticate: (user: User) => void
  deauthenticate: () => void
}

const useAuthStore = create<TAuthState>()((set, get) => ({
  user: null,

  getMe: () => get().user,

  authenticate: (user: User) => set({ user }),

  deauthenticate: () => set({ user: null })
}))

export default useAuthStore
