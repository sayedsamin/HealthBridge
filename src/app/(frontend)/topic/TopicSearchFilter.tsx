'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import {
  BadgePlus,
  Brain,
  ClipboardCheck,
  Filter,
  FlaskConical,
  HeartPulse,
  Hospital,
  MessageCircleQuestion,
  PhoneCall,
  Search,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { getTopicAccent } from './_utils/topicVisuals'
import type { Locale } from '@/i18n/config'
import { localizePath } from '@/i18n/routing'

const TOPIC_ICON_MAP: Record<string, LucideIcon> = {
  Stethoscope,
  FlaskConical,
  HeartPulse,
  Brain,
  Users,
  ShieldPlus,
  Syringe,
  ClipboardCheck,
  BadgePlus,
  Hospital,
  PhoneCall,
  MessageCircleQuestion,
}

export type SearchTopic = {
  id: string
  slug: string
  label: string
  desc: string
  lessons: number
  iconName: string
  iconImageUrl: string | null
  iconImageAlt: string
}

type Props = {
  locale: Locale
  topics: SearchTopic[]
}

export function TopicSearchFilter({ locale, topics }: Props) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) {
      return topics
    }

    const query = searchQuery.toLowerCase()
    return topics.filter(
      (topic) =>
        topic.label.toLowerCase().includes(query) || topic.desc.toLowerCase().includes(query),
    )
  }, [searchQuery, topics])

  const toTopicHref = (rawSlug: string): string => {
    const normalizedSlug = rawSlug.trim()

    if (!normalizedSlug) {
      return localizePath('/topic', locale)
    }

    return localizePath(`/topic/${encodeURIComponent(normalizedSlug)}`, locale)
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_254px] lg:items-start">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Health Topics Overview
          </h1>
          <p className="mt-2 text-2xl leading-snug text-slate-700 dark:text-slate-300">
            Explore topics to learn, understand and stay healthy.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-700 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 text-base font-semibold text-white hover:bg-blue-800"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl border border-blue-200 bg-white p-3 text-blue-700 dark:border-blue-800 dark:bg-slate-700 dark:text-blue-400">
              <BadgePlus className="h-10 w-10" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold leading-tight text-slate-900 dark:text-white">
                Your Health Your Knowledge
              </h2>
              <p className="mt-2 text-base leading-6 text-slate-600 dark:text-slate-400">
                Learn today for a healthier tomorrow.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {filteredTopics.map((t) => {
          const topicAccent = getTopicAccent(t.slug)
          const TopicIcon = TOPIC_ICON_MAP[t.iconName] || Stethoscope

          return (
            <Link
              key={t.id}
              href={toTopicHref(t.slug)}
              className={`group flex min-h-[250px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 ${topicAccent.card}`}
            >
              <div
                className={`mb-4 flex h-36 items-center rounded-xl bg-gradient-to-br px-5 ${topicAccent.panel}`}
              >
                <span
                  className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full border shadow-sm ${topicAccent.frame}`}
                >
                  {t.iconImageUrl ? (
                    <Image
                      src={t.iconImageUrl}
                      alt={t.iconImageAlt}
                      width={58}
                      height={58}
                      className="h-14 w-14 object-contain"
                    />
                  ) : (
                    <TopicIcon className="h-10 w-10" strokeWidth={1.85} />
                  )}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-[33px] font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                  {t.label}
                </h3>
                <p className="mt-1 text-[16px] leading-6 text-slate-600 dark:text-slate-400">
                  {t.desc}
                </p>
              </div>

              <div className={`mt-3 flex items-center justify-between ${topicAccent.arrow}`}>
                <p className="text-sm font-semibold">{t.lessons} Lessons</p>
                <span className="rounded-full border border-current/25 p-1.5 transition group-hover:bg-white/60 dark:group-hover:bg-slate-900/30">
                  {/* ArrowRight icon */}
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {filteredTopics.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No topics found</p>
          <p className="mt-1 text-slate-600 dark:text-slate-400">Try adjusting your search query</p>
        </div>
      )}
    </div>
  )
}
