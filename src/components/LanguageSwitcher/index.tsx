'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const rootRef = useRef<HTMLDivElement>(null)
  const currentLocale = getLocaleFromPathname(pathname)
  const unlocalizedPath = stripLocaleFromPathname(pathname)
  const currentLanguage = searchParams.get('lang')?.toLowerCase() ?? currentLocale
  const [languageOptions, setLanguageOptions] = useState<LanguageOption[]>(defaultLanguageOptions)
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [pendingLanguageCode, setPendingLanguageCode] = useState<string | null>(null)

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
  const selectedLanguage =
    languageOptions.find((language) => language.code === currentLanguage) ??
    languageOptions.find((language) => language.code === currentLocale) ??
    languageOptions.find((language) => language.code === 'en') ??
    defaultLanguageOptions[0]

  const getLanguageHref = (languageCode: string) => {
    const isCmsManaged = cmsLocaleSet.has(languageCode)

    if (isCmsManaged) {
      return localizePath(unlocalizedPath || '/', languageCode as (typeof locales)[number])
    }

    return `${unlocalizedPath || '/'}?lang=${encodeURIComponent(languageCode)}`
  }

  const handleLanguageSelect = (href: string) => {
    const selectedCode =
      languageOptions.find((language) => getLanguageHref(language.code) === href)?.code ?? null

    setIsOpen(false)
    setPendingLanguageCode(selectedCode)

    startTransition(() => {
      router.push(href)
      router.refresh()
    })
  }

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (!isOpen) return

      const target = event.target as Node | null
      if (target && rootRef.current && !rootRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [isOpen])

  const menuLanguages = languageOptions.filter(
    (language) => language.code !== selectedLanguage.code,
  )

  return (
    <div
      ref={rootRef}
      aria-label="Language"
      className={className ?? 'relative inline-flex items-center text-xs font-semibold'}
    >
      <div className="inline-flex items-center rounded-full border border-slate-200 bg-white p-0.5 dark:border-slate-700 dark:bg-slate-900">
        <span
          aria-current="page"
          className={`rounded-full bg-blue-600 px-2.5 py-1 text-white transition-opacity ${
            isPending ? 'opacity-85' : 'opacity-100'
          }`}
          title={selectedLanguage.label}
        >
          {isPending
            ? `... ${selectedLanguage.code.toUpperCase()}`
            : selectedLanguage.code.toUpperCase()}
        </span>
        <button
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label="Open language menu"
          className="rounded-full p-1 text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-300 dark:hover:bg-slate-800"
          disabled={isPending}
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
            const isActive = currentLanguage === language.code
            const href = getLanguageHref(language.code)

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
                onClick={(event) => {
                  event.preventDefault()
                  if (isPending) return
                  handleLanguageSelect(href)
                }}
                title={language.label}
              >
                <span>{language.label}</span>
                <span className="font-bold">
                  {isPending && pendingLanguageCode === language.code
                    ? '...'
                    : language.code.toUpperCase()}
                </span>
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
