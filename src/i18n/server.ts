import { headers } from 'next/headers'

import { defaultLocale, isCmsLocale, type Locale } from './config'
import { isLocale, localeHeaderName } from './routing'

export const languageHeaderName = 'x-healthbridge-language'

export async function getRequestLanguage(): Promise<string> {
  const requestHeaders = await headers()
  const language = requestHeaders.get(languageHeaderName)

  if (!language || language.trim() === '') {
    return defaultLocale
  }

  return language.trim().toLowerCase()
}

export async function getRequestLocale(): Promise<Locale> {
  const requestedLanguage = await getRequestLanguage()

  if (isCmsLocale(requestedLanguage)) {
    return requestedLanguage
  }

  const requestHeaders = await headers()
  const locale = requestHeaders.get(localeHeaderName)

  return isLocale(locale) ? locale : defaultLocale
}
