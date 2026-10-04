import type { EventInfo } from '../data/invite'
import { invite } from '../data/invite'
import { calendarUrl } from '../lib/calendar'
import { Artboard, El, Img, Txt } from './Artboard'

const petal = (x: number, y: number, w: number, h: number, src: string, steps: { mx?: number; my?: number; op?: number; ro?: number; ti: number }[], rotate?: number) => (
  <Img key={src} x={x} y={y} w={w} h={h} src={`/media/${src}`} rotate={rotate} sbs={{ steps }} />
)

export function LocationText({ event }: { event: EventInfo }) {
  const { venue } = event
  const lines = event.summary.split('\n').length
  return (
    <Artboard height={457}>
      <Img x={145} y={111} w={96} h={30} src="/media/acomm-decor.png" anim={{ type: 'zoomin', duration: 3, scale: 0.9 }} />
      <El x={5} y={lines === 2 ? 204 : 216} w={380} h={253.3} anim={{ type: 'zoomin', duration: 1, scale: 0.9 }}>
        <img src={invite.media.venue} alt={venue.name} style={{ display: 'block', width: '100%', height: '100%' }} />
      </El>

      {petal(330, 50, 41, 32.8, 'noroot_4.png', [{ ti: 0 }, { mx: 27, my: 163, ro: -6, ti: 3000 }, { mx: 60, my: 341, op: 0.8, ro: -7, ti: 3000 }, { mx: 77, my: 381, op: 0, ro: 2, ti: 2000 }])}
      {petal(72, 41, 43, 35.9, 'noroot_5.png', [{ ti: 0 }, { mx: -39, my: 163, ro: -6, ti: 3000 }, { mx: -69, my: 341, op: 0.8, ro: 2, ti: 3000 }, { mx: -77, my: 381, op: 0, ro: 2, ti: 2000 }], 217)}
      {petal(1, 157, 42, 33.4, 'noroot_9.png', [{ ti: 0 }, { mx: 29, my: 73, ro: -6, ti: 3000 }, { mx: 57, my: 204, ro: -6, ti: 4000 }, { mx: 67, my: 224, op: 0, ro: -6, ti: 2000 }])}
      {petal(362, 174, 38, 34.3, 'noroot_13.png', [{ ti: 0 }, { mx: -39, my: 133, ro: -6, ti: 3000 }, { mx: -69, my: 221, ro: 2, ti: 3000 }, { mx: -99, my: 251, op: 0, ro: 2, ti: 2000 }])}
      {petal(20, 290, 38, 35.5, 'noroot.png', [{ ti: 0 }, { mx: 39, my: 83, op: 0, ro: -12, ti: 3000 }])}
      {petal(285, 314, 42, 34.3, 'noroot_7.png', [{ ti: 0 }, { mx: -39, my: 73, op: 0, ro: -6, ti: 2000 }])}

      <Txt x={39} y={141} w={312} h={31} font="body" size={20} lh={31} color="#6c513f" anim={{ type: 'fadeinup', duration: 2, distance: 40 }}>
        {venue.name}
      </Txt>
      <Txt x={lines === 2 ? 41 : 25} y={179} w={lines === 2 ? 308 : 340} h={lines === 2 ? 42 : 63} font="body" size={17} lh={21} color="#6c513f" anim={{ type: 'fadeinup', duration: 2, distance: 40 }}>
        {event.summary}
      </Txt>
      <Txt x={-85} y={58} w={560} h={64} font="script" size={41} lh={64} color="#a67d2b">
        {event.title}
      </Txt>
    </Artboard>
  )
}

export function LocationCard({ event }: { event: EventInfo }) {
  const { venue } = event
  return (
    <Artboard height={433}>
      <Img x={25} y={32} w={341} h={341} src="/media/Rectangle_270.svg" rotate={180} opacity={0.8} />
      <El x={0} y={31} w={390} h={343} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loc-card">
          <div style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: 18, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#a67d2b', marginBottom: 18 }}>
            Location
          </div>
          <div style={{ fontSize: 20, lineHeight: 1.4, color: '#5a0f1b', marginBottom: 14 }}>
            {venue.cardName[0]}
            <br />
            {venue.cardName[1]}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: '#6a5140', marginBottom: 22 }}>
            {event.cardLines[0]}
            <br />
            {event.cardLines[1]}
          </div>
          <a className="loc-btn" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ background: '#5a0f1b', color: '#f6f1e8' }}>
            Open in Maps
          </a>
          <a
            className="loc-btn"
            href={calendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 12, background: 'transparent', color: '#a67d2b', border: '1.5px solid #a67d2b' }}
          >
            Add to Calendar
          </a>
        </div>
      </El>
      <Img x={100} y={4} w={190} h={42.4} src="/media/noroot_6.png" />
      <Img x={100} y={358} w={190} h={42.4} src="/media/noroot_11.png" />
    </Artboard>
  )
}
