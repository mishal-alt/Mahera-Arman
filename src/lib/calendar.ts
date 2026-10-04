import type { EventInfo } from '../data/invite'

export function calendarUrl({ calendar }: Pick<EventInfo, 'calendar'>) {
  const { title, dates, details, location } = calendar
  const params = new URLSearchParams({ action: 'TEMPLATE', text: title, dates, details, location })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}
