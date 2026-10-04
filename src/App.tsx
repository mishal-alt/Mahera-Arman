import { useEffect } from 'react'
import { invite } from './data/invite'
import { Credit } from './components/Credit'
import { Countdown } from './components/Countdown'
import { EnvelopeIntro } from './components/EnvelopeIntro'
import { Families } from './components/Families'
import { Hero } from './components/Hero'
import { LocationCard, LocationText } from './components/Location'
import { Schedule } from './components/Schedule'
import { useKeepPlaying } from './hooks/useKeepPlaying'

const ARTBOARD = 390

export default function App() {
  useKeepPlaying()

  // On phones narrower than the 390px artboard, scale the whole stage down.
  useEffect(() => {
    const fit = () =>
      document.documentElement.style.setProperty('--zoom', String(Math.min(1, document.documentElement.clientWidth / ARTBOARD)))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <>
      <EnvelopeIntro />
      <main>
        <Hero />
        <Countdown />
        <Schedule />
        {invite.events.map((event) => (
          <div key={event.key} style={{ display: 'contents' }}>
            <LocationText event={event} />
            <LocationCard event={event} />
          </div>
        ))}
        <Families />
        <Credit />
      </main>
    </>
  )
}
