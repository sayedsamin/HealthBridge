import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale } from '@/i18n/config'
import { getLocaleFromPathname, localeHeaderName, stripLocaleFromPathname } from '@/i18n/routing'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = getLocaleFromPathname(pathname)
  const requestHeaders = new Headers(request.headers)

  requestHeaders.set(localeHeaderName, locale)

  if (locale === defaultLocale) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  const rewriteURL = request.nextUrl.clone()
  rewriteURL.pathname = stripLocaleFromPathname(pathname)

  return NextResponse.rewrite(rewriteURL, {
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}
