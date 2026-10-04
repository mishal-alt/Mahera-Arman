import { useEffect, useRef, useState } from 'react'
import { invite } from '../data/invite'
import { useCountdown } from '../hooks/useCountdown'
import { Artboard, El, Txt } from './Artboard'

/** One digit group. When the value changes the old number slides out, the new one slides in. */
function FlipNumber({ value, revealed, delay }: { value: string; revealed: boolean; delay: number }) {
  const [shown, setShown] = useState(value)
  const [phase, setPhase] = useState<'' | 'flip-out' | 'flip-in'>('')
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setPhase('flip-out')
    const t1 = setTimeout(() => {
      setShown(value)
      setPhase('flip-in')
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('')))
    }, 520)
    return () => clearTimeout(t1)
  }, [value])

  return (
    <div className="cd-wrap">
      <div
        className={`cd-num ${revealed ? 'revealed' : ''} ${phase}`}
        style={revealed ? { animationDelay: `${delay}s, ${delay + 1.1}s` } : undefined}
      >
        {shown}
      </div>
    </div>
  )
}

export function Countdown() {
  const left = useCountdown(invite.countdownTarget)
  const box = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el || revealed) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [revealed, left === null])

  const r = revealed ? 'revealed' : ''
  const units = left
    ? ([
        ['Days', left.days],
        ['Hours', left.hours],
        ['Minutes', left.minutes],
        ['Seconds', left.seconds],
      ] as const)
    : null

  return (
    <Artboard height={277}>
      <Txt x={-85} y={44} w={560} h={64} font="script" size={41} lh={64} color="#a67d2b">
        {invite.countdownTitle}
      </Txt>
      <El x={-40} y={39} w={470} h={245} anim={{ type: 'fadeinup', duration: 1, distance: 100 }}>
        {units ? (
          <div className="cd" ref={box}>
            {units.map(([label, val], i) => (
              <div key={label} style={{ display: 'contents' }}>
                {i > 0 && <div className={`cd-sep ${r}`} style={{ transitionDelay: `${0.25 + (i - 1) * 0.18}s` }}>:</div>}
                <div className="cd-block">
                  <FlipNumber value={val} revealed={revealed} delay={i * 0.18} />
                  <div className={`cd-label ${r}`} style={{ transitionDelay: revealed ? `${0.9 + i * 0.18}s` : undefined }}>
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cd f-script" style={{ fontSize: 41, color: '#a67d2b', margin: '60px 20px' }}>
            {invite.countdownDone}
          </div>
        )}
      </El>
    </Artboard>
  )
}
