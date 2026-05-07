'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const topicSubmenus = [
  { slug: 'healthcare-system', label: 'Healthcare System', icon: '🏥' },
  { slug: 'mental-health', label: 'Mental Health', icon: '🧠' },
  { slug: 'nutrition', label: 'Nutrition', icon: '🥗' },
  { slug: 'youth-health', label: 'Youth Health', icon: '👶' },
  { slug: 'public-health', label: 'Public Health', icon: '🌍' },
  { slug: 'safety-info', label: 'Safety Info', icon: '🛡️' },
]

export const HeaderNav: React.FC = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [topicOpen, setTopicOpen] = useState(false)
  const [mobileTopicOpen, setMobileTopicOpen] = useState(false)
  const topicRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMenuOpen(false)
    setMobileTopicOpen(false)
  }, [pathname])

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (topicRef.current && !topicRef.current.contains(e.target as Node)) {
        setTopicOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isTopicActive = pathname.startsWith('/topic')

  return (
    <nav className="relative">
      {/* ── Desktop nav ─────────────────────────────────── */}
      <div className="hidden items-center gap-4 text-base md:flex">
        <Link
          href="/"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        >
          Home
        </Link>

        {/* Topic with dropdown */}
        <div ref={topicRef} className="relative">
          <button
            type="button"
            onClick={() => setTopicOpen((prev) => !prev)}
            className={`flex items-center gap-1 font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${isTopicActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}
          >
            Topics
            <svg
              className={`h-4 w-4 transition-transform ${topicOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {topicOpen && (
            <div className="absolute left-0 top-full z-40 mt-2 w-56 rounded-2xl border border-slate-200 bg-white py-2 shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <Link
                href="/topic"
                className="block px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-700"
                onClick={() => setTopicOpen(false)}
              >
                All Topics →
              </Link>
              <div className="my-1 h-px bg-slate-100 dark:bg-slate-700" />
              {topicSubmenus.map((t) => (
                <Link
                  key={t.slug}
                  href={`/topic/${t.slug}`}
                  onClick={() => setTopicOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-slate-700 dark:hover:text-blue-400 ${
                    pathname === `/topic/${t.slug}`
                      ? 'font-semibold text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{t.icon}</span>
                  {t.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/resources"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        >
          Resources
        </Link>
        <Link
          href="/about-us"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
        >
          About Us
        </Link>
        <div className="flex flex-col items-start gap-1">
          <Link
            href="/sign-in"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-200/60 transition-colors hover:bg-blue-700"
          >
            Sign In
          </Link>
          {pathname !== '/' && (
            <Link
              href="/admin"
              className="pl-2 text-xs font-medium text-blue-700 transition-colors hover:text-blue-900"
            >
              Admin CMS Login
            </Link>
          )}
        </div>
      </div>

      {/* ── Hamburger button ────────────────────────────── */}
      <button
        aria-controls="mobile-nav-panel"
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
        className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-50 md:hidden dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
        onClick={() => setMenuOpen((prev) => !prev)}
        type="button"
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d={menuOpen ? 'M6 6L18 18M18 6L6 18' : 'M4 7H20M4 12H20M4 17H20'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Mobile menu panel ───────────────────────────── */}
      {menuOpen && (
        <div
          id="mobile-nav-panel"
          className="absolute right-0 top-14 z-30 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:hidden dark:border-slate-700 dark:bg-slate-800"
        >
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              Home
            </Link>

            {/* Mobile Topic accordion */}
            <button
              type="button"
              onClick={() => setMobileTopicOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${isTopicActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}`}
            >
              Topic
              <svg
                className={`h-4 w-4 transition-transform ${mobileTopicOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileTopicOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l-2 border-blue-100 pl-3 dark:border-blue-800">
                <Link
                  href="/topic"
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-slate-700/50"
                >
                  All Topics
                </Link>
                {topicSubmenus.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/topic/${t.slug}`}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors hover:bg-blue-50 hover:text-blue-700 ${
                      pathname === `/topic/${t.slug}`
                        ? 'font-semibold text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span>{t.icon}</span>
                    {t.label}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/resources"
              className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              Resources
            </Link>
            <Link
              href="/about-us"
              className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700/50"
            >
              About Us
            </Link>
            <div className="my-2 h-px bg-slate-200 dark:bg-slate-700" />
            <Link
              href="/sign-in"
              className="rounded-full bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm shadow-blue-200/60 transition-colors hover:bg-blue-700"
            >
              Sign In
            </Link>
            {pathname !== '/' && (
              <Link
                href="/admin"
                className="pt-1 text-center text-xs font-medium text-blue-700 transition-colors hover:text-blue-900"
              >
                Admin CMS Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
