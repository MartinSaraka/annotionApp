export const hexToRgb = (hex: string) => {
  const value = hex.replace(/^#/, '')

  const r = parseInt(value.substring(0, 2), 16)
  const g = parseInt(value.substring(2, 4), 16)
  const b = parseInt(value.substring(4, 6), 16)

  return { r, g, b }
}
