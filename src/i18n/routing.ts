import { defaultLocale, locales, type Locale } from './config'

export const localeHeaderName = 'x-healthbridge-locale'

export function isLocale(value: string | undefined | null): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value))
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0]
  return isLocale(segment) ? segment : defaultLocale
}

export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split('/').filter(Boolean)

  if (!isLocale(parts[0])) {
    return pathname || '/'
  }

  const stripped = `/${parts.slice(1).join('/')}`
  return stripped === '/' ? '/' : stripped.replace(/\/$/, '')
}

export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//')) {
    return path
  }

  const unlocalizedPath = stripLocaleFromPathname(path)

  if (locale === defaultLocale) {
    return unlocalizedPath
  }

  return unlocalizedPath === '/' ? `/${locale}` : `/${locale}${unlocalizedPath}`
}
