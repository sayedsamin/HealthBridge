'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { languageOptions, locales, type Locale } from '@/i18n/config'
import { localizePath } from '@/i18n/routing'

type Props = {
  currentLocale: Locale
  buttonLabel: string
}

export function MultilingualSupportMenu({ currentLocale, buttonLabel }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const languageLinks = useMemo(() => {
    const cmsLocales = new Set<string>(locales)

    return languageOptions.map((language) => {
      const href = cmsLocales.has(language.code)
        ? localizePath('/resources', language.code as Locale)
        : `${localizePath('/resources', currentLocale)}?lang=${encodeURIComponent(language.code)}`

      return {
        code: language.code,
        label: language.label,
        href,
      }
    })
  }, [currentLocale])

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target || !rootRef.current) return

      if (!rootRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [])

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="resources-cta-button resources-cta-button--secondary inline-flex items-center gap-2"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {buttonLabel}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen ? (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
          <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Choose Language
          </p>
          <ul className="mt-1 grid max-h-72 gap-1 overflow-y-auto">
            {languageLinks.map((language) => (
              <li key={language.code}>
                <Link
                  href={language.href}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{language.label}</span>
                  <span className="font-semibold text-slate-500">
                    {language.code.toUpperCase()}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-2 border-t border-slate-200 px-2 pt-2">
            <Link
              href={localizePath('/resources/language-support', currentLocale)}
              className="text-xs font-medium text-blue-700 transition-colors hover:text-blue-800"
              onClick={() => setIsOpen(false)}
            >
              Language support page
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}
