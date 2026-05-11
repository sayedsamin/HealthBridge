'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { getLocaleFromPathname, localizePath } from '@/i18n/routing'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

export const HeaderClient: React.FC = () => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="container relative z-20 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/80"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="flex items-center justify-between gap-4 py-4">
        <Link href={localizePath('/', locale)}>
          <Logo loading="eager" priority="high" />
        </Link>
        <HeaderNav />
      </div>
    </header>
  )
}
