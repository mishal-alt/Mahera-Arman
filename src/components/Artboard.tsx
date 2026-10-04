import { motion, type TargetAndTransition } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

/** A 390px-wide stage; children are absolutely positioned like the reference's Zero Blocks. */
export function Artboard({ height, children }: { height: number; children: ReactNode }) {
  return (
    <section className="artboard" style={{ height }}>
      {children}
    </section>
  )
}

// Entrance animations, matching the reference's data-animate-* attributes.
export type Anim = {
  type: 'fadein' | 'fadeinup' | 'fadeinleft' | 'fadeinright' | 'zoomin'
  duration?: number
  delay?: number
  distance?: number
  scale?: number
}

// One step of a Tilda "step-by-step" path animation (offset/rotation/scale/opacity over `ti` ms).
export type Step = { mx?: number; my?: number; sx?: number; sy?: number; op?: number; ro?: number; ti: number }
export type Sbs = { steps: Step[]; loop?: boolean }

const ease = [0.25, 0.1, 0.25, 1] as const

function entrance(a: Anim): { initial: TargetAndTransition; animate: TargetAndTransition } {
  const d = a.distance ?? 100
  const initial: TargetAndTransition = { opacity: 0 }
  if (a.type === 'fadeinup') initial.y = d
  if (a.type === 'fadeinleft') initial.x = -d
  if (a.type === 'fadeinright') initial.x = d
  if (a.type === 'zoomin') initial.scale = a.scale ?? 0.9
  return {
    initial,
    animate: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: a.duration ?? 1, delay: a.delay ?? 0, ease } },
  }
}

function path({ steps, loop }: Sbs): TargetAndTransition {
  const total = steps.reduce((s, p) => s + p.ti, 0)
  let acc = 0
  const times = steps.map((p) => (acc += p.ti) / total)
  return {
    x: steps.map((p) => p.mx ?? 0),
    y: steps.map((p) => p.my ?? 0),
    scaleX: steps.map((p) => p.sx ?? 1),
    scaleY: steps.map((p) => p.sy ?? 1),
    rotate: steps.map((p) => p.ro ?? 0),
    opacity: steps.map((p) => p.op ?? 1),
    transition: { duration: total / 1000, times, ease: 'linear', repeat: loop ? Infinity : 0 },
  }
}

type Box = { x?: number; y?: number; w?: number; h?: number }

type ElProps = {
  x: number
  y: number
  w: number
  h?: number
  /** Position/size overrides for screens >= 960px, where the reference uses a separate layout. */
  lg?: Box
  anim?: Anim
  sbs?: Sbs
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

/** Absolutely positioned layer. Animations start once the layer scrolls into view. */
export function El({ x, y, w, h, lg, anim, sbs, className: cls = '', style, children }: ElProps) {
  const px = (n?: number) => (n === undefined ? 'auto' : `${n}px`)
  const vars = lg
    ? ({ '--lx': px(lg.x ?? x), '--ly': px(lg.y ?? y), '--lw': px(lg.w ?? w), '--lh': px(lg.h ?? h) } as CSSProperties)
    : undefined
  const className = lg ? `${cls} el-lg` : cls
  const box: CSSProperties = { left: x, top: y, width: w, height: h, ...vars, ...style }
  if (!anim && !sbs) {
    return (
      <div className={`el ${className}`} style={box}>
        {children}
      </div>
    )
  }
  if (sbs) {
    const first = sbs.steps[0]
    return (
      <motion.div
        className={`el ${className}`}
        style={box}
        initial={{ x: first.mx ?? 0, y: first.my ?? 0, opacity: first.op ?? 1 }}
        whileInView={path(sbs)}
        viewport={{ once: true, amount: 0.3 }}
      >
        {children}
      </motion.div>
    )
  }
  const { initial, animate } = entrance(anim!)
  return (
    <motion.div
      className={`el ${className}`}
      style={box}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

type TxtProps = ElProps & { font: 'names' | 'script' | 'body' | 'ovo'; size: number; lh: number; color: string; ls?: number }

/** Text layer: vertically centred in its box, like Tilda's `vertical-align: middle` atoms. */
export function Txt({ font, size, lh, color, ls, className = '', style, ...rest }: TxtProps) {
  return (
    <El
      {...rest}
      className={`txt f-${font} ${className}`}
      style={{ fontSize: size, lineHeight: `${lh}px`, color, letterSpacing: ls, ...style }}
    />
  )
}

/** Image layer. `rotate` (deg) and `opacity` are static styles from the reference, separate from entrance animations. */
export function Img({
  src,
  alt = '',
  rotate,
  opacity,
  ...rest
}: Omit<ElProps, 'children'> & { src: string; alt?: string; rotate?: number; opacity?: number }) {
  return (
    <El {...rest}>
      <img src={src} alt={alt} draggable={false} style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, opacity }} />
    </El>
  )
}
