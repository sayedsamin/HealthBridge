import { headers } from 'next/headers'

import { defaultLocale, type Locale } from './config'
import { isLocale, localeHeaderName } from './routing'

export async function getRequestLocale(): Promise<Locale> {
  const requestHeaders = await headers()
  const locale = requestHeaders.get(localeHeaderName)

  return isLocale(locale) ? locale : defaultLocale
}
