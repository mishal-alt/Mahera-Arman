import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { invite } from '../data/invite'
import { Artboard, El, Img, Txt } from './Artboard'

// Timeline geometry: the first dot sits at DOT_TOP, further dots follow every STEP px.
const DOT_TOP = 250
const STEP = 150
const FADE_DELAY = [0, 0.1, 0.3, 0.4, 0.4]

export function Schedule() {
  const ref = useRef<HTMLDivElement>(null)
  const events = invite.events
  const travel = STEP * (events.length - 1)
  // The rose slides down the timeline as the section scrolls past (Tilda "scroll" animation).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.5'] })
  const roseY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, 0.26, 0.54, 0.79, 1].map((f) => f * travel))

  return (
    <Artboard height={570}>
      <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
      <Img x={-177} y={-20} w={744} h={346} src="/media/noroot_12.png" />
      <Img x={-177} y={321} w={744} h={259} src="/media/noroot_1.png" />
      <Txt x={-85} y={45} w={560} h={64} font="script" size={41} lh={64} color="#b48c3d">
        {invite.scheduleTitle}
      </Txt>
      <Txt x={45} y={112} w={300} h={30} font="body" size={20} lh={24} color="#6c513f" anim={{ type: 'fadein', duration: 1.5 }}>
        {invite.dateLong}
      </Txt>

      {events.map((ev, i) => {
        const dot = DOT_TOP + i * STEP
        const fade = { type: 'fadein', duration: 1.5, delay: FADE_DELAY[i] ?? 0.4 } as const
        return (
          <div key={ev.key} style={{ display: 'contents' }}>
            <Txt x={36} y={dot - 19.5} w={136} h={47} font="ovo" size={30} lh={47} color="#846f61" anim={fade}>
              {ev.time}
            </Txt>
            <El x={212} y={dot - 29} w={150} h={66} anim={fade} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <span className="f-body" style={{ fontSize: 22, lineHeight: '26px', color: '#6c513f' }}>
                {ev.title}
              </span>
              <span className="f-body" style={{ fontSize: 16, lineHeight: '20px', color: '#846f61' }}>
                {ev.timeNote}
              </span>
            </El>
          </div>
        )
      })}

      <El x={193.5} y={DOT_TOP - 0.5} w={1} h={travel + 7} style={{ background: '#9c8575', opacity: 0.7 }} />
      {events.map((ev, i) => (
        <El key={ev.key} x={190} y={DOT_TOP + i * STEP} w={8} h={8} style={{ background: '#8c7666', transform: 'rotate(45deg)' }} />
      ))}

      <motion.div className="el" style={{ left: 167, top: DOT_TOP - 21, width: 55, height: 50.5, y: roseY }}>
        <img src="/media/rose_-_Copy.png" alt="" draggable={false} style={{ display: 'block', width: '100%', height: '100%', transform: 'rotate(-35deg)' }} />
      </motion.div>

      <Img x={312} y={56} w={78} h={41} src="/media/right-element_1.png" anim={{ type: 'fadeinright', duration: 2, distance: 40 }} />
      <Img x={1} y={56} w={79} h={41} src="/media/left-element_1.png" anim={{ type: 'fadeinleft', duration: 2, distance: 40 }} />
    </Artboard>
  )
}
