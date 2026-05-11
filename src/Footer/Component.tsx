import { getCachedGlobal } from '@/utilities/getGlobals'
import { getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const locale = await getRequestLocale()
  const footerData = await getCachedGlobal('footer', 1, locale)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href={localizePath('/', locale)}>
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} locale={locale} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
