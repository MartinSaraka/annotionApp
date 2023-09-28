/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_HAZEL_SERVER_URL: string
  readonly RENDERER_VITE_API_URI: string
  readonly RENDERER_VITE_SERVICE_URI: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}