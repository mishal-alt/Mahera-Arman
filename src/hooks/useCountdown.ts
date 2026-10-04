import { useEffect, useState } from 'react'

export type Remaining = { days: string; hours: string; minutes: string; seconds: string } | null

const pad = (n: number) => String(n).padStart(2, '0')

function compute(target: number): Remaining {
  const dist = target - Date.now()
  if (dist < 0) return null
  return {
    days: String(Math.floor(dist / 86400000)),
    hours: pad(Math.floor((dist % 86400000) / 3600000)),
    minutes: pad(Math.floor((dist % 3600000) / 60000)),
    seconds: pad(Math.floor((dist % 60000) / 1000)),
  }
}

/** Ticks once a second; returns null once the target has passed. */
export function useCountdown(targetDate: Date): Remaining {
  const target = targetDate.getTime()
  const [left, setLeft] = useState(() => compute(target))
  useEffect(() => {
    const id = setInterval(() => setLeft(compute(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return left
}
