import { format } from 'date-fns'

export const formatClock = (): string => {
  return format(new Date(), 'hh-mm-aaaa')
}

export const getTimezoneOffset = (): string => {
  const timezoneOffset = new Date().getTimezoneOffset()

  const offsetHours = timezoneOffset / 60
  const sign = offsetHours > 0 ? '-' : '+'

  return `GMT${sign}${Math.abs(offsetHours)}`
}
