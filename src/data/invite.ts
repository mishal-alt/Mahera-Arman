// All page content lives here. Layout lives in the components.
export type EventInfo = {
  key: 'nikah' | 'valima'
  title: string
  /** Shown on the schedule timeline. */
  time: string
  timeNote: string
  venue: {
    name: string
    /** Two-line version used inside the card. */
    cardName: [string, string]
    mapsUrl: string
  }
  /** Lines under the venue name in the Location section. */
  summary: string
  /** Two lines shown inside the card. */
  cardLines: [string, string]
  calendar: { title: string; dates: string; details: string; location: string }
}

export const invite = {
  groom: { name: 'Arman', fullName: 'Arman Shahnawaz Karamali' },
  bride: { name: 'Mahera', fullName: 'Mahera Sadaf' },

  eyebrow: 'Nikah & Valima',
  dateShort: '01.11.26',
  dateLong: 'Sunday, 1 November 2026',
  tagline: ['Two Souls', 'One destiny', 'A Lifetime written by Allah'],
  greeting: 'Dear Friends and Family',
  message:
    'Join us for an evening of love, laughter, duas, and unforgettable memories as we begin our forever.',

  // The celebration begins with the Nikah (5:30 PM IST, 1 Nov 2026).
  countdownTarget: new Date('2026-11-01T17:30:00+05:30'),
  countdownTitle: 'The Celebration Begins In',
  countdownDone: 'See you there!',

  scheduleTitle: 'Schedule of Events',

  events: [
    {
      key: 'nikah',
      title: 'Nikah',
      time: '5:30 PM',
      timeNote: 'After Asr ki Namaz',
      venue: {
        name: 'Masjid e Mohammed Mustafa',
        cardName: ['Masjid e Mohammed', 'Mustafa'],
        mapsUrl: 'https://maps.app.goo.gl/inHa8KDJXFNTM1RZA?g_st=ic',
      },
      summary: 'Sunday, 1 November 2026 at 5:30 PM\n(After Asr ki Namaz)',
      cardLines: ['Sunday, 1 November 2026', '5:30 PM (After Asr ki Namaz)'],
      calendar: {
        title: 'Nikah of Arman & Mahera',
        dates: '20261101T173000/20261101T193000',
        details: 'Nikah of Arman Shahnawaz Karamali and Mahera Sadaf, after Asr ki Namaz.',
        location: 'Masjid e Mohammed Mustafa',
      },
    },
    {
      key: 'valima',
      title: 'Valima',
      time: '8 PM',
      timeNote: 'Onwards',
      venue: {
        name: 'Star Palace Function Hall',
        cardName: ['Star Palace', 'Function Hall'],
        mapsUrl: 'https://maps.app.goo.gl/4MTDwb3wfP53tkMDA?g_st=ic',
      },
      summary:
        'Address: Star Palace, 308, Thanisandra Main Rd, Saraipalya, Ashwath Nagar, HBR Layout, Bengaluru, Karnataka 560077',
      cardLines: ['Sunday, 1 November 2026', '8:00 PM Onwards'],
      calendar: {
        title: 'Valima of Arman & Mahera',
        dates: '20261101T200000/20261101T230000',
        details: 'Valima of Arman Shahnawaz Karamali and Mahera Sadaf, 8 PM onwards.',
        location:
          'Star Palace Function Hall, 308, Thanisandra Main Rd, Saraipalya, Ashwath Nagar, HBR Layout, Bengaluru, Karnataka 560077',
      },
    },
  ] satisfies EventInfo[],

  familiesTitle: 'Our Families',
  families: [
    {
      name: 'Arman Shahnawaz Karamali',
      relation: 'Son of',
      parents: ['Late Shahnawaz Mohemed', 'Sadruddin Karmali', '& Taslim Shahnawaz Karamli'],
    },
    {
      name: 'Mahera Sadaf',
      relation: 'Daughter of',
      parents: ['Late Janab Abdul Wahid', '(Urf) Salim Saheb', '& Nikath Sulthan'],
    },
  ],
  closing: { title: 'With Love', text: 'We humbly request your presence and duas.' },

  credit: { label: 'Crafted by', name: 'Zetron Tech', url: 'https://www.instagram.com/zetron.tech/' },

  media: {
    introCover: '/media/seal.png',
    introVideo: '/media/intro.mp4',
    music: '/media/music.mp3',
    heroVideo: '/media/swans.mp4',
    venue: '/media/venue.png',
  },
}
