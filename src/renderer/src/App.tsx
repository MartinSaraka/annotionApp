import { useCallback, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { Editor } from '@renderer/layouts'
import { Dashboard, Empty, Image, Login } from '@renderer/pages'
import { FullScreenLoading } from '@renderer/ui/loading'

import { identitySmartlook, initializeSmartlook } from '@common/utils/recording'
import { useAuthStore, useImageStore, useSettingsStore } from '@renderer/store'
import { useDidMount } from '@renderer/hooks'

import { GET_ME, TGetMeData } from '@renderer/apollo/queries'

import { globalStyles } from '@renderer/styles'
import '@recogito/annotorious-openseadragon/dist/annotorious.min.css'

globalStyles()

const App = () => {
  const isAuthenticated = useAuthStore((state) => !!state.user)
  const authenticate = useAuthStore((state) => state.authenticate)
  const deauthenticate = useAuthStore((state) => state.deauthenticate)

  const activePage = useImageStore((state) => state.selected)
  const smartlookConsent = useSettingsStore((state) => state.smartlookConsent)

  const { refetch, loading } = useQuery<TGetMeData>(GET_ME, {
    fetchPolicy: 'network-only'
  })

  const handleUserRefetch = useCallback(() => {
    refetch()
      .then(({ data }) => {
        identitySmartlook(import.meta.env.PROD, data.me)
        authenticate(data.me)
      })
      .catch(() => {
        // TODO: show toast
        deauthenticate()
      })
  }, [authenticate, deauthenticate, refetch])

  useEffect(() => {
    window.api.getAccessToken().then(handleUserRefetch)
    window.api.onWindowIsFocused(handleUserRefetch)
  }, [handleUserRefetch])

  useDidMount(() => {
    if (!smartlookConsent) return
    initializeSmartlook(
      import.meta.env.PROD,
      import.meta.env.RENDERER_VITE_SMARTLOOK_KEY
    )
  })

  // Show loading screen while fetching authenticated user
  if (loading) return <FullScreenLoading />

  // If user is not authenticated, show login page
  if (!isAuthenticated) return <Login />

  // If user is authenticated, show other pages
  if (activePage === 'dashboard') {
    return <Dashboard />
  }

  if (activePage === 'empty') {
    return <Empty />
  }

  return (
    <Editor>
      <Image />
    </Editor>
  )
}

export default App
