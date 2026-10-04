import { useEffect, useRef, useState } from 'react'
import { invite } from '../data/invite'

type Stage = 'closed' | 'playing' | 'revealed'

/**
 * Tap the envelope → it fades out, the intro video plays with music, the video fades
 * 0.8s before its end, then a floating play/pause button controls the music.
 */
export function EnvelopeIntro() {
  const [stage, setStage] = useState<Stage>('closed')
  const [overlayGone, setOverlayGone] = useState(false)
  const [videoGone, setVideoGone] = useState(false)
  const [fading, setFading] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const video = useRef<HTMLVideoElement>(null)
  const audio = useRef<HTMLAudioElement>(null)

  // Keep the page still until the intro has finished.
  useEffect(() => {
    document.body.style.overflow = stage === 'revealed' ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [stage])

  useEffect(() => video.current?.load(), [])

  useEffect(() => {
    const a = audio.current
    if (!a) return
    const on = () => setMusicOn(true)
    const off = () => setMusicOn(false)
    a.addEventListener('play', on)
    a.addEventListener('pause', off)
    return () => {
      a.removeEventListener('play', on)
      a.removeEventListener('pause', off)
    }
  }, [])

  const open = () => {
    if (stage !== 'closed') return
    setStage('playing')
    setTimeout(() => setOverlayGone(true), 1400)
    video.current?.play().catch(() => end())
    if (audio.current) {
      audio.current.volume = 1
      audio.current.play().catch(() => {})
    }
  }

  const end = () => {
    if (fading) return
    setFading(true)
    setStage('revealed')
    setTimeout(() => setVideoGone(true), 1400)
  }

  const onTime = () => {
    const v = video.current
    if (v && v.duration && v.currentTime >= v.duration - 0.8) end()
  }

  const toggleMusic = () => {
    const a = audio.current
    if (!a) return
    if (a.paused) a.play().catch(() => {})
    else a.pause()
  }

  return (
    <>
      <audio ref={audio} loop src={invite.media.music} preload="auto" />

      {!overlayGone && (
        <div
          className="wei-overlay"
          role="button"
          aria-label="Tap to open the invitation"
          tabIndex={0}
          style={stage === 'closed' ? undefined : { opacity: 0, pointerEvents: 'none' }}
          onClick={open}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
        >
          <img className="wei-img" src={invite.media.introCover} alt="Open your invitation" draggable={false} />
          <div className="wei-tap">
            <div className="wei-chevron" />
            <div className="wei-label">Tap to open</div>
          </div>
        </div>
      )}

      {!videoGone && (
        <div className={`wei-video-wrap ${stage === 'playing' ? 'in' : ''} ${stage === 'revealed' ? 'out' : ''}`}>
          <video ref={video} className="wei-video" src={invite.media.introVideo} muted playsInline preload="auto" onTimeUpdate={onTime} onEnded={end} />
        </div>
      )}

      <button
        type="button"
        className="wei-audio"
        aria-label={musicOn ? 'Pause music' : 'Play music'}
        onClick={toggleMusic}
        style={{ visibility: stage === 'revealed' ? 'visible' : 'hidden', opacity: stage === 'revealed' ? 1 : 0 }}
      >
        {musicOn ? (
          <svg viewBox="0 0 24 24" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden>
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </>
  )
}
