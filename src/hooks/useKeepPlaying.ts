import { useEffect } from 'react'

const SELECTOR = 'video[data-keep-playing]'

/** Start (or resume) every background video. Safe to call from a tap handler, which iOS requires in Low Power Mode. */
export function playBackgroundVideos() {
  document.querySelectorAll<HTMLVideoElement>(SELECTOR).forEach((v) => {
    v.muted = true
    if (v.paused) v.play().catch(() => {})
  })
}

/**
 * Background videos must never sit paused. Browsers (iOS Low Power Mode in particular) can block or
 * pause autoplay, so retry on any touch/click, when the tab returns, and on a slow timer.
 */
export function useKeepPlaying() {
  useEffect(() => {
    const kick = () => document.visibilityState === 'visible' && playBackgroundVideos()
    const events = ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'click', 'keydown'] as const
    events.forEach((e) => document.addEventListener(e, kick, { passive: true }))
    document.addEventListener('visibilitychange', kick)
    window.addEventListener('pageshow', kick)
    window.addEventListener('focus', kick)
    const timer = setInterval(kick, 1500)
    kick()
    return () => {
      events.forEach((e) => document.removeEventListener(e, kick))
      document.removeEventListener('visibilitychange', kick)
      window.removeEventListener('pageshow', kick)
      window.removeEventListener('focus', kick)
      clearInterval(timer)
    }
  }, [])
}
