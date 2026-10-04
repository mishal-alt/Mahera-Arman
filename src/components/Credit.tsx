import { invite } from '../data/invite'

/** Small company watermark at the very bottom of the page; links to Instagram. */
export function Credit() {
  const { label, name, url } = invite.credit
  return (
    <footer className="credit">
      <span className="credit-note">{label}</span>
      <a className="credit-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${name} on Instagram`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
        </svg>
        <span>{name}</span>
      </a>
    </footer>
  )
}
