export type TSupportedPlatforms = Extract<NodeJS.Platform, 'win32' | 'darwin'>

export type TSupportedArchitectures = Extract<
  NodeJS.Architecture,
  'arm' | 'arm64' | 'x64'
>

export const SERVER_PATHS: Record<
  TSupportedPlatforms,
  Partial<Record<TSupportedArchitectures, string>>
> = {
  darwin: {
    arm: 'mac-arm/Contents',
    arm64: 'mac-arm/Contents',
    x64: 'mac-intel/Contents'
  },
  win32: {
    x64: 'win'
  }
}

export const SERVER_EXECUTABLE_PATHS: Record<
  TSupportedPlatforms,
  Partial<Record<TSupportedArchitectures, string>>
> = {
  darwin: {
    arm: 'Contents/MacOS/AnnotAidReader',
    arm64: 'Contents/MacOS/AnnotAidReader',
    x64: 'Contents/MacOS/AnnotAidReader'
  },
  win32: {
    x64: 'win/AnnotAidReader.exe'
  }
}

export const DEVELOPMENT_EXECUTABLE_PATHS: Record<
  TSupportedPlatforms,
  Partial<Record<TSupportedArchitectures, string>>
> = {
  darwin: {
    arm: 'mac-arm/Contents/MacOS/AnnotAidReader',
    arm64: 'mac-arm/Contents/MacOS/AnnotAidReader',
    x64: 'mac-intel/Contents/MacOS/AnnotAidReader'
  },
  win32: {
    x64: 'win/AnnotAidReader.exe'
  }
}
