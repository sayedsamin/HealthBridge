export type TopicAccent = {
  frame: string
  card: string
  panel: string
  arrow: string
}

const TOPIC_ACCENTS = {
  healthcare: {
    frame:
      'border-cyan-300 bg-cyan-100 text-cyan-800 shadow-cyan-200/70 dark:border-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-200 dark:shadow-none',
    card: 'hover:border-cyan-400 hover:bg-cyan-100/35 dark:hover:border-cyan-600 dark:hover:bg-slate-700',
    panel:
      'from-cyan-100 via-sky-100 to-white dark:from-cyan-950 dark:via-slate-900 dark:to-slate-800',
    arrow: 'text-cyan-800 dark:text-cyan-200',
  },
  wellness: {
    frame:
      'border-emerald-300 bg-emerald-100 text-emerald-800 shadow-emerald-200/70 dark:border-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-200 dark:shadow-none',
    card: 'hover:border-emerald-400 hover:bg-emerald-100/35 dark:hover:border-emerald-600 dark:hover:bg-slate-700',
    panel:
      'from-emerald-100 via-teal-100 to-white dark:from-emerald-950 dark:via-slate-900 dark:to-slate-800',
    arrow: 'text-emerald-800 dark:text-emerald-200',
  },
  publicHealth: {
    frame:
      'border-amber-300 bg-amber-100 text-amber-800 shadow-amber-200/70 dark:border-amber-700 dark:bg-amber-950/50 dark:text-amber-200 dark:shadow-none',
    card: 'hover:border-amber-400 hover:bg-amber-100/35 dark:hover:border-amber-600 dark:hover:bg-slate-700',
    panel:
      'from-amber-100 via-orange-100 to-white dark:from-amber-950 dark:via-slate-900 dark:to-slate-800',
    arrow: 'text-amber-800 dark:text-amber-200',
  },
  mentalHealth: {
    frame:
      'border-rose-300 bg-rose-100 text-rose-800 shadow-rose-200/70 dark:border-rose-700 dark:bg-rose-950/50 dark:text-rose-200 dark:shadow-none',
    card: 'hover:border-rose-400 hover:bg-rose-100/35 dark:hover:border-rose-600 dark:hover:bg-slate-700',
    panel:
      'from-rose-100 via-pink-100 to-white dark:from-rose-950 dark:via-slate-900 dark:to-slate-800',
    arrow: 'text-rose-800 dark:text-rose-200',
  },
  youth: {
    frame:
      'border-indigo-300 bg-indigo-100 text-indigo-800 shadow-indigo-200/70 dark:border-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-200 dark:shadow-none',
    card: 'hover:border-indigo-400 hover:bg-indigo-100/35 dark:hover:border-indigo-600 dark:hover:bg-slate-700',
    panel:
      'from-indigo-100 via-blue-100 to-white dark:from-indigo-950 dark:via-slate-900 dark:to-slate-800',
    arrow: 'text-indigo-800 dark:text-indigo-200',
  },
  support: {
    frame:
      'border-teal-300 bg-teal-100 text-teal-800 shadow-teal-200/70 dark:border-teal-700 dark:bg-teal-950/50 dark:text-teal-200 dark:shadow-none',
    card: 'hover:border-teal-400 hover:bg-teal-100/35 dark:hover:border-teal-600 dark:hover:bg-slate-700',
    panel:
      'from-teal-100 via-cyan-100 to-white dark:from-teal-950 dark:via-slate-900 dark:to-slate-800',
    arrow: 'text-teal-800 dark:text-teal-200',
  },
} as const satisfies Record<string, TopicAccent>

const TOPIC_ACCENT_BY_SLUG: Record<string, TopicAccent> = {
  'healthcare-system': TOPIC_ACCENTS.healthcare,
  'lab-tests': TOPIC_ACCENTS.healthcare,
  healthcare: TOPIC_ACCENTS.healthcare,
  clinic: TOPIC_ACCENTS.healthcare,
  doctor: TOPIC_ACCENTS.healthcare,
  hospital: TOPIC_ACCENTS.healthcare,
  pharmacy: TOPIC_ACCENTS.healthcare,
  'dental-care': TOPIC_ACCENTS.healthcare,
  'vision-care': TOPIC_ACCENTS.healthcare,
  nutrition: TOPIC_ACCENTS.wellness,
  'healthy-living': TOPIC_ACCENTS.wellness,
  wellness: TOPIC_ACCENTS.wellness,
  diet: TOPIC_ACCENTS.wellness,
  food: TOPIC_ACCENTS.wellness,
  exercise: TOPIC_ACCENTS.wellness,
  pregnancy: TOPIC_ACCENTS.wellness,
  maternal: TOPIC_ACCENTS.wellness,
  'public-health': TOPIC_ACCENTS.publicHealth,
  'public-health-safety-information': TOPIC_ACCENTS.publicHealth,
  vaccination: TOPIC_ACCENTS.publicHealth,
  immunization: TOPIC_ACCENTS.publicHealth,
  vaccine: TOPIC_ACCENTS.publicHealth,
  'lab-results': TOPIC_ACCENTS.publicHealth,
  screening: TOPIC_ACCENTS.publicHealth,
  'mental-health': TOPIC_ACCENTS.mentalHealth,
  mental: TOPIC_ACCENTS.mentalHealth,
  therapy: TOPIC_ACCENTS.mentalHealth,
  counseling: TOPIC_ACCENTS.mentalHealth,
  anxiety: TOPIC_ACCENTS.mentalHealth,
  depression: TOPIC_ACCENTS.mentalHealth,
  'youth-health': TOPIC_ACCENTS.youth,
  youth: TOPIC_ACCENTS.youth,
  teen: TOPIC_ACCENTS.youth,
  family: TOPIC_ACCENTS.youth,
  children: TOPIC_ACCENTS.youth,
  child: TOPIC_ACCENTS.youth,
  'sexual-health': TOPIC_ACCENTS.youth,
  'safety-info': TOPIC_ACCENTS.support,
  support: TOPIC_ACCENTS.support,
  'settlement-support': TOPIC_ACCENTS.support,
  'community-support': TOPIC_ACCENTS.support,
  insurance: TOPIC_ACCENTS.support,
  documents: TOPIC_ACCENTS.support,
  forms: TOPIC_ACCENTS.support,
  housing: TOPIC_ACCENTS.support,
  transport: TOPIC_ACCENTS.support,
  newcomer: TOPIC_ACCENTS.support,
}

const TOPIC_ACCENT_BY_ICON: Record<string, TopicAccent> = {
  Stethoscope: TOPIC_ACCENTS.healthcare,
  FlaskConical: TOPIC_ACCENTS.healthcare,
  HeartPulse: TOPIC_ACCENTS.wellness,
  Brain: TOPIC_ACCENTS.mentalHealth,
  Users: TOPIC_ACCENTS.youth,
  ShieldPlus: TOPIC_ACCENTS.publicHealth,
  Syringe: TOPIC_ACCENTS.publicHealth,
  ClipboardCheck: TOPIC_ACCENTS.support,
  BadgePlus: TOPIC_ACCENTS.support,
  Hospital: TOPIC_ACCENTS.healthcare,
  PhoneCall: TOPIC_ACCENTS.support,
  MessageCircleQuestion: TOPIC_ACCENTS.support,
}

const SLUG_HINTS: Array<{ terms: string[]; accent: TopicAccent }> = [
  {
    terms: ['mental', 'stress', 'wellbeing', 'therapy', 'counsel', 'anxiety', 'depress'],
    accent: TOPIC_ACCENTS.mentalHealth,
  },
  {
    terms: [
      'nutrition',
      'diet',
      'food',
      'wellness',
      'healthy',
      'meal',
      'exercise',
      'pregnan',
      'maternal',
    ],
    accent: TOPIC_ACCENTS.wellness,
  },
  {
    terms: ['youth', 'teen', 'family', 'children', 'parent', 'child', 'school', 'sexual'],
    accent: TOPIC_ACCENTS.youth,
  },
  {
    terms: ['public', 'vaccine', 'immun', 'safety', 'prevention', 'screening', 'testing'],
    accent: TOPIC_ACCENTS.publicHealth,
  },
  {
    terms: [
      'support',
      'insurance',
      'settlement',
      'phone',
      'help',
      'documents',
      'forms',
      'community',
      'resources',
      'housing',
      'transport',
      'newcomer',
    ],
    accent: TOPIC_ACCENTS.support,
  },
  {
    terms: [
      'health',
      'care',
      'doctor',
      'clinic',
      'hospital',
      'lab',
      'pharmacy',
      'medication',
      'dental',
      'vision',
    ],
    accent: TOPIC_ACCENTS.healthcare,
  },
]

export const getTopicAccent = (slug?: string | null, icon?: string | null): TopicAccent => {
  const normalizedSlug = (slug || '').trim().toLowerCase()

  if (normalizedSlug && TOPIC_ACCENT_BY_SLUG[normalizedSlug]) {
    return TOPIC_ACCENT_BY_SLUG[normalizedSlug]
  }

  if (icon && TOPIC_ACCENT_BY_ICON[icon]) {
    return TOPIC_ACCENT_BY_ICON[icon]
  }

  const matchingHint = SLUG_HINTS.find(({ terms }) =>
    terms.some((term) => normalizedSlug.includes(term)),
  )

  return matchingHint?.accent ?? TOPIC_ACCENTS.healthcare
}
