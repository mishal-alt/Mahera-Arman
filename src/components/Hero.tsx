import { invite } from '../data/invite'
import { Artboard, El, Img, Txt } from './Artboard'

// React doesn't write `muted` into the DOM, and iOS only autoplays videos that carry the attribute.
const forceMuted = (el: HTMLVideoElement | null) => {
  if (!el) return
  el.muted = true
  el.defaultMuted = true
  el.setAttribute('muted', '')
  el.play().catch(() => {})
}

const GOLD = '#a67d2b'

export function Hero() {
  const { bride, groom } = invite
  const up = { type: 'fadeinup', duration: 2, delay: 3, distance: 30 } as const
  return (
    <Artboard height={1240}>
      <El x={-30} y={0} w={450} h={800}>
        <video
          ref={forceMuted}
          data-keep-playing
          src={invite.media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          onPause={(e) => {
            // Never stay paused: resume unless the tab is hidden.
            const v = e.currentTarget
            if (document.visibilityState === 'visible' && !v.ended) v.play().catch(() => {})
          }}
          style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
        />
      </El>
      <El
        x={-30}
        y={0}
        w={450}
        h={676}
        style={{ opacity: 0.5, background: 'radial-gradient(circle, rgb(255,249,235) 0%, rgba(255,231,192,0) 85%)' }}
      />
      <Img x={-177} y={763} w={744} h={477} lg={{ y: 753, h: 487 }} src="/media/623915249_2629494717_3.png" />

      <Txt x={-85} y={154} w={560} h={37} font="script" size={40} lh={20} color={GOLD} anim={up}>
        {invite.eyebrow}
      </Txt>
      <Txt x={-85} y={196} w={560} h={37} font="ovo" size={25} lh={13} color={GOLD} anim={up}>
        {invite.dateShort}
      </Txt>
      <Txt x={-85} y={294} w={560} h={168} font="names" size={80} lh={56} color={GOLD} anim={up}>
        {`${groom.name}\n\n${bride.name}`}
      </Txt>
      <Txt x={173} y={356} w={55} h={44} font="script" size={40} lh={44} color="#a07b33" anim={up}>
        &amp;
      </Txt>

      <Img
        x={-42}
        y={568}
        w={218}
        h={333.8}
        lg={{ x: -46, y: 566, w: 224, h: 342.9 }}
        src="/media/noroot_3.png"
        sbs={{ loop: true, steps: [{ ti: 0 }, { sx: 1.06, sy: 1.06, ro: 2, ti: 2000 }, { ti: 2000 }] }}
      />
      <Img
        x={233}
        y={586}
        w={210}
        h={319.2}
        lg={{ x: 200, y: 547, w: 236, h: 358.7 }}
        src="/media/noroot_2.png"
        sbs={{ loop: true, steps: [{ ti: 0 }, { sx: 1.04, sy: 1.04, ro: -2, ti: 2000 }, { ti: 2000 }] }}
      />

      <Txt x={37} y={518} w={316} h={35} font="script" size={32} lh={35} color={GOLD}>
        Scroll down
      </Txt>
      <El x={183} y={558} w={25} h={16} sbs={{ loop: true, steps: [{ ti: 0 }, { my: 5, ti: 600 }, { ti: 500 }] }}>
        <svg width="25" height="16" viewBox="0 0 25 16" fill="none" aria-hidden>
          <path d="M1.0092 1.008C4.3691 5.4431 9.1402 9.565 12.5 14C16.8007 9.565 19.6901 5.4431 23.9908 1.008" stroke="#937100" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </El>

      <Txt
        x={-85}
        y={899}
        w={560}
        h={129}
        font="script"
        size={41}
        lh={43}
        color={GOLD}
        anim={{ type: 'fadein', duration: 1 }}
      >
        {invite.tagline.join('\n')}
      </Txt>
      <Txt
        x={42}
        y={1050}
        w={307}
        h={104}
        font="body"
        size={21}
        lh={26}
        color="#6a5140"
        anim={{ type: 'fadein', duration: 2, delay: 0.2 }}
      >
        {`${invite.greeting}\n${invite.message}`}
      </Txt>
      <Img x={54} y={813} w={283} h={86.4} src="/media/noroot_8.png" alt="Bismillah" />
    </Artboard>
  )
}

