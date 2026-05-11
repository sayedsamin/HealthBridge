export const defaultLocale = 'en'

export const locales = ['en', 'fr'] as const

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'French',
}

export type Locale = (typeof locales)[number]
