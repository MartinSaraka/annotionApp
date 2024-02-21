export const getAuthorization = (accessToken?: string | null) => {
  return accessToken ? `Bearer ${accessToken}` : ''
}
