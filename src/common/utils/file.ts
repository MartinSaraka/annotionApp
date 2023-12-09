export const saveFile = <TData>(
  data: TData,
  filename: string,
  type: BlobPropertyBag['type'] = 'application/json'
) => {
  const stringData = JSON.stringify(data, null, 2)

  const blob = new Blob([stringData], { type })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')

  a.href = url
  a.download = filename

  a.click()
  URL.revokeObjectURL(url)
}
