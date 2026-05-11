'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getLocaleFromPathname, localizePath, stripLocaleFromPathname } from '@/i18n/routing'

const topics = [
  { slug: 'healthcare-system', label: 'Healthcare System', icon: '🏥' },
  { slug: 'mental-health', label: 'Mental Health', icon: '🧠' },
  { slug: 'nutrition', label: 'Nutrition', icon: '🥗' },
  { slug: 'youth-health', label: 'Youth Health', icon: '👶' },
  { slug: 'public-health', label: 'Public Health', icon: '🌍' },
  { slug: 'safety-info', label: 'Safety Info', icon: '🛡️' },
]

export function TopicSidebar() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const activePathname = stripLocaleFromPathname(pathname)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Health Topics
      </p>
      <nav className="flex flex-col gap-1">
        {topics.map((t) => {
          const href = `/topic/${t.slug}`
          const isActive = activePathname === href
          return (
            <Link
              key={t.slug}
              href={localizePath(href, locale)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400'
              }`}
            >
              <span className="text-base">{t.icon}</span>
              {t.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
