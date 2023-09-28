const sizeUnits = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB'] as const
const DEFAULT_DECIMALS = 4

export const convertBytes = (
  bytes: number,
  unit: (typeof sizeUnits)[number]
): number => {
  const base = 1024
  const exponent = sizeUnits.indexOf(unit) + 1
  return bytes / Math.pow(base, exponent)
}

export const roundNumber = (
  num: number,
  decimals: number = DEFAULT_DECIMALS
): number => {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
}
