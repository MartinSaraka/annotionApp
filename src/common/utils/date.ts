import dayjs from 'dayjs'

export const formatTimeAgo = (date: string): string => {
  return dayjs(date).fromNow()
}

export const formatDate = (date: string): string => {
  return dayjs(date).format('LLL')
}
