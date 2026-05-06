'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav className="relative">
      <div className="hidden items-center gap-4 text-base md:flex">
        <Link href="/" className="font-medium text-slate-700 transition-colors hover:text-blue-600">
          Home
        </Link>
        <Link
          href="/topic"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600"
        >
          Topic
        </Link>
        <Link
          href="/resources"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600"
        >
          Resources
        </Link>
        <Link
          href="/about-us"
          className="font-medium text-slate-700 transition-colors hover:text-blue-600"
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

      <button
        aria-controls="mobile-nav-panel"
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
        className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
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

      {menuOpen && (
        <div
          id="mobile-nav-panel"
          className="absolute right-0 top-14 z-30 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl md:hidden"
        >
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="/"
              className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              href="/topic"
              className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Topic
            </Link>
            <Link
              href="/resources"
              className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Resources
            </Link>
            <Link
              href="/about-us"
              className="rounded-lg px-3 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              About Us
            </Link>
            <div className="my-2 h-px bg-slate-200" />
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
