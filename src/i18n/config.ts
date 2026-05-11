export const defaultLocale = 'en'

export const locales = ['en', 'fr', 'zh', 'hi'] as const

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'French (Francais)',
  zh: 'Chinese (Zhongwen)',
  hi: 'Hindi',
}

export const localeShortLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  zh: 'ZH',
  hi: 'HI',
}

export type LanguageOption = {
  code: string
  label: string
}

// CMS-managed locales. These should always take priority over machine translation.
export const cmsLanguageOptions: LanguageOption[] = locales.map((locale) => ({
  code: locale,
  label: localeLabels[locale],
}))

// Additional machine-translation targets shown in the language picker.
export const dynamicLanguageOptions: LanguageOption[] = [
  { code: 'es', label: 'Spanish (Espanol)' },
  { code: 'ar', label: 'Arabic (Al Arabiya)' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'de', label: 'German (Deutsch)' },
  { code: 'ja', label: 'Japanese (Nihongo)' },
  { code: 'ko', label: 'Korean (Hangul)' },
  { code: 'it', label: 'Italian (Italiano)' },
  { code: 'ru', label: 'Russian (Russkiy)' },
]

export const languageOptions: LanguageOption[] = [...cmsLanguageOptions, ...dynamicLanguageOptions]

export const isCmsLocale = (value: string | undefined | null): value is Locale =>
  Boolean(value && (locales as readonly string[]).includes(value))

export type Locale = (typeof locales)[number]
