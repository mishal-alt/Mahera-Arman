import { invite } from '../data/invite'
import { Artboard, El, Img, Txt } from './Artboard'

const HEIGHT = 740
const up = { type: 'fadeinup', duration: 2, distance: 40 } as const

/** Parents' names, then a closing line — laid out like the reference's Dress Code / Gift panel. */
export function Families() {
  const [bride, groom] = invite.families
  const block = (f: (typeof invite.families)[number], y: number) => (
    <>
      <Txt x={20} y={y} w={350} h={44} font="script" size={34} lh={40} color="#a67d2b" anim={up}>
        {f.name}
      </Txt>
      <Txt x={45} y={y + 46} w={300} h={22} font="body" size={17} lh={22} color="#846f61" anim={up}>
        {f.relation}
      </Txt>
      <Txt x={35} y={y + 72} w={320} h={72} font="body" size={20} lh={24} color="#6c513f" anim={up}>
        {f.parents.join('\n')}
      </Txt>
    </>
  )
  return (
    <Artboard height={HEIGHT}>
      <El x={-177} y={20} w={744} h={HEIGHT - 40}>
        <img src="/media/623915249_2629494717_2.png" alt="" draggable={false} style={{ width: '100%', height: '100%' }} />
      </El>
      <Txt x={-85} y={80} w={560} h={64} font="script" size={41} lh={64} color="#a67d2b">
        {invite.familiesTitle}
      </Txt>
      {block(bride, 165)}
      <Img x={147} y={335} w={96} h={30} src="/media/acomm-decor.png" />
      {block(groom, 385)}
      <Txt x={-85} y={565} w={560} h={64} font="script" size={41} lh={64} color="#a67d2b">
        {invite.closing.title}
      </Txt>
      <Txt x={80} y={632} w={230} h={52} font="body" size={20} lh={24} color="#6c513f" anim={up}>
        {invite.closing.text}
      </Txt>
      <Img
        x={190}
        y={-1}
        w={276}
        h={363}
        lg={{ x: 253, y: 9, w: 305, h: 401.1 }}
        src="/media/noroot_10.png"
        sbs={{ loop: true, steps: [{ ti: 0 }, { sx: 1.02, sy: 1.02, ro: 1, ti: 2000 }, { ti: 2000 }, { sx: 0.98, sy: 0.98, ro: -1, ti: 2000 }, { ti: 2000 }] }}
      />
      <Img
        x={-45}
        y={HEIGHT - 227}
        w={251}
        h={239.7}
        lg={{ x: -100 }}
        rotate={-86}
        src="/media/noroot_14.png"
        sbs={{ loop: true, steps: [{ ti: 0 }, { sx: 1.04, sy: 1.04, ro: 1, ti: 1500 }, { sx: 0.98, sy: 0.98, ti: 1500 }, { sx: 0.98, sy: 0.98, ro: -2, ti: 1500 }, { ti: 1500 }] }}
      />
    </Artboard>
  )
}
