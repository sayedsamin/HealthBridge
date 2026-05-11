import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale } from '@/i18n/config'
import { getLocaleFromPathname, localeHeaderName, stripLocaleFromPathname } from '@/i18n/routing'
import { languageHeaderName } from '@/i18n/server'

const languageCookieName = 'hb_lang'

const normalizeLanguage = (value: string | null | undefined): string | null => {
  if (!value) return null

  const normalized = value.trim().toLowerCase()

  if (!/^[a-z]{2,3}(-[a-z]{2})?$/.test(normalized)) {
    return null
  }

  return normalized
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = getLocaleFromPathname(pathname)
  const queryLanguage = normalizeLanguage(request.nextUrl.searchParams.get('lang'))
  const cookieLanguage = normalizeLanguage(request.cookies.get(languageCookieName)?.value)
  const requestLanguage = queryLanguage ?? cookieLanguage ?? locale
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set(localeHeaderName, locale)
  requestHeaders.set(languageHeaderName, requestLanguage)

  if (locale === defaultLocale) {
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    if (queryLanguage) {
      response.cookies.set(languageCookieName, queryLanguage, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      })
    }

    return response
  }

  const rewriteURL = request.nextUrl.clone()
  rewriteURL.pathname = stripLocaleFromPathname(pathname)

  const response = NextResponse.rewrite(rewriteURL, {
    request: {
      headers: requestHeaders,
    },
  })

  if (queryLanguage) {
    response.cookies.set(languageCookieName, queryLanguage, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    })
  }

  return response
}

export const config = {
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
