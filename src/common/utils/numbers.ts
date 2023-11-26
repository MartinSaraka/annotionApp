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

export const toInteger = (value: string | number) => {
  return +(+value).toFixed(0)
}

export const toPercent = (value: string | number, postfix = '%') => {
  return `${(+value * 100).toFixed(0)}${postfix}`
}
