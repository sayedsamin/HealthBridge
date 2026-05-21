import { getCachedGlobal } from '@/utilities/getGlobals'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const footerData = await getCachedGlobal('footer', 1, locale, language)()

  const navItems = footerData?.navItems || []
  const additionalLinks = navItems.slice(0, 6)
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-950 text-slate-100 dark:border-slate-800">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <Link className="inline-flex items-center" href={localizePath('/', locale)}>
              <Logo />
            </Link>
            <p className="max-w-xs text-sm leading-6 text-slate-300">
              Trusted, multilingual guidance for newcomers navigating healthcare and safety in
              Canada.
            </p>
            <p className="text-xs text-slate-400">
              Built for clear, culturally aware health access.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-200">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-2">
                <Link
                  href={localizePath('/', locale)}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Home
                </Link>
                <Link
                  href={localizePath('/topic', locale)}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Topics
                </Link>
                <Link
                  href={localizePath('/resources', locale)}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  Resources
                </Link>
                <Link
                  href={localizePath('/about-us', locale)}
                  className="text-sm text-slate-300 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </nav>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-200">
                <Link
                  href={localizePath('/resources', locale)}
                  className="transition-colors hover:text-white"
                >
                  Resources
                </Link>
              </h3>
              <nav className="flex flex-col gap-2">
                {additionalLinks.map(({ link }, i) => {
                  return (
                    <CMSLink
                      className="text-sm text-slate-300 transition-colors hover:text-white"
                      key={`additional-${i}`}
                      locale={locale}
                      {...link}
                    />
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
              Settings
            </h3>
            <div className="inline-flex rounded-full border border-slate-700 bg-slate-900 p-1">
              <ThemeSelector />
            </div>
            <div className="space-y-2 text-sm text-slate-300">
              <p>Need support with topics or content access?</p>
              <Link
                className="inline-flex text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
                href={localizePath('/topic', locale)}
              >
                Explore Health Topics
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-4 text-xs text-slate-400">
          <p>© {year} HealthBridge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
