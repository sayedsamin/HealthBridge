'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import {
  languageOptions as defaultLanguageOptions,
  locales,
  type LanguageOption,
} from '@/i18n/config'
import { getLocaleFromPathname, localizePath, stripLocaleFromPathname } from '@/i18n/routing'

type Props = {
  className?: string
}

export function LanguageSwitcher({ className }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = getLocaleFromPathname(pathname)
  const unlocalizedPath = stripLocaleFromPathname(pathname)
  const currentLanguage = searchParams.get('lang')?.toLowerCase() ?? currentLocale
  const enHref = localizePath(unlocalizedPath || '/', 'en')
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>(defaultLanguageOptions)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadLanguages = async () => {
      try {
        const response = await fetch('/api/languages', { cache: 'force-cache' })
        if (!response.ok) return

        const data = (await response.json()) as { languages?: LanguageOption[] }
        if (!isMounted || !data.languages || data.languages.length === 0) return

        setLanguageOptions(data.languages)
      } catch {
        // Keep defaults when language API is unavailable.
      }
    }

    loadLanguages()

    return () => {
      isMounted = false
    }
  }, [])

  const cmsLocaleSet = useMemo(() => new Set<string>(locales), [])
  const menuLanguages = languageOptions.filter((language) => language.code !== 'en')

  return (
    <div
      aria-label="Language"
      className={className ?? 'relative inline-flex items-center text-xs font-semibold'}
    >
      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-900">
        <Link
          aria-current={currentLanguage === 'en' ? 'page' : undefined}
          className="rounded-full bg-blue-600 px-2.5 py-1 text-white"
          href={enHref}
          onClick={() => setIsOpen(false)}
          title="English"
        >
          EN
        </Link>
        <button
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label="Open language menu"
          className="rounded-full p-1 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          onClick={() => setIsOpen((prev) => !prev)}
          type="button"
        >
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {isOpen ? (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {menuLanguages.map((language) => {
            const isCmsManaged = cmsLocaleSet.has(language.code)
            const isActive = currentLanguage === language.code

            const href = isCmsManaged
              ? localizePath(unlocalizedPath || '/', language.code as (typeof locales)[number])
              : `${unlocalizedPath || '/'}?lang=${encodeURIComponent(language.code)}`

            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
                href={href}
                key={language.code}
                onClick={() => setIsOpen(false)}
                title={language.label}
              >
                <span>{language.label}</span>
                <span className="font-bold">{language.code.toUpperCase()}</span>
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
