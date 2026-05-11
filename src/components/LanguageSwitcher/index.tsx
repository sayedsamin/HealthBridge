'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { defaultLocale, localeLabels, locales } from '@/i18n/config'
import { getLocaleFromPathname, localizePath, stripLocaleFromPathname } from '@/i18n/routing'

type Props = {
  className?: string
}

export function LanguageSwitcher({ className }: Props) {
  const pathname = usePathname()
  const currentLocale = getLocaleFromPathname(pathname)
  const unlocalizedPath = stripLocaleFromPathname(pathname)

  return (
    <div
      aria-label="Language"
      className={
        className ??
        'inline-flex rounded-full border border-slate-200 bg-white p-0.5 text-xs font-semibold dark:border-slate-700 dark:bg-slate-900'
      }
    >
      {locales.map((locale) => {
        const isActive = locale === currentLocale
        const label = localeLabels[locale]

        return (
          <Link
            aria-current={isActive ? 'page' : undefined}
            className={`rounded-full px-2.5 py-1 transition-colors ${
              isActive
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
            href={localizePath(unlocalizedPath || '/', locale)}
            key={locale}
            title={label}
          >
            {locale === defaultLocale ? 'EN' : locale.toUpperCase()}
          </Link>
        )
      })}
    </div>
  )
}
