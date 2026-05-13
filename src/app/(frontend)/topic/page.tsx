import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
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
import { fetchAllTopics, type MediaFromPayload } from './_utils/fetchTopicBySlug'
import { TopicRedirectNotice } from './TopicRedirectNotice'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'
import type { Locale } from '@/i18n/config'
import { getTopicAccent } from './_utils/topicVisuals'

// ── Icon map: matches values from the HealthTopics Payload collection ──────────
const ICON_MAP: Record<string, LucideIcon> = {
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

const toTopicHref = (rawSlug: string, locale: Locale): string => {
  const normalizedSlug = rawSlug.trim()

  if (!normalizedSlug) {
    return localizePath('/topic', locale)
  }

  return localizePath(`/topic/${encodeURIComponent(normalizedSlug)}`, locale)
}

// ── Static fallback data (shown when no topics exist in the CMS yet) ──────────
const STATIC_TOPICS = [
  {
    id: 'understanding-canadian-healthcare',
    slug: 'healthcare-system',
    label: 'Understanding Canadian Healthcare',
    desc: 'Learn how the Canadian healthcare system works.',
    lessons: 12,
    Icon: Stethoscope,
  },
  {
    id: 'interpreting-lab-test-results',
    slug: 'healthcare-system',
    label: 'Interpreting Lab Test Results',
    desc: 'Understand common lab tests and reports.',
    lessons: 10,
    Icon: FlaskConical,
  },
  {
    id: 'nutrition-healthy-living',
    slug: 'nutrition',
    label: 'Nutrition and Healthy Living',
    desc: 'Healthy eating tips and balanced lifestyle.',
    lessons: 14,
    Icon: HeartPulse,
  },
  {
    id: 'mental-health-resources',
    slug: 'mental-health',
    label: 'Mental Health Resources',
    desc: 'Support your mental well-being.',
    lessons: 11,
    Icon: Brain,
  },
  {
    id: 'sexual-health-youth-education',
    slug: 'youth-health',
    label: 'Sexual Health and Youth Education',
    desc: 'Age-appropriate health education for youth.',
    lessons: 9,
    Icon: Users,
  },
  {
    id: 'public-health-safety-information',
    slug: 'public-health',
    label: 'Public Health and Safety Information',
    desc: 'Stay informed and safe in your community.',
    lessons: 13,
    Icon: ShieldPlus,
  },
  {
    id: 'vaccination-immunization',
    slug: 'public-health',
    label: 'Vaccination and Immunization',
    desc: 'Stay up to date on vaccines for you and your family.',
    lessons: 8,
    Icon: Syringe,
  },
  {
    id: 'health-insurance-settlement-support',
    slug: 'safety-info',
    label: 'Health Insurance and Settlement Support',
    desc: 'Understand insurance and other settlement help.',
    lessons: 7,
    Icon: ClipboardCheck,
  },
]

export default async function TopicIndexPage() {
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const cmsTopics = await fetchAllTopics(locale, language)

  // Use CMS data if available, otherwise fall back to static list
  const topics =
    cmsTopics.length > 0
      ? cmsTopics.map((t) => {
          const media =
            t.iconImage && typeof t.iconImage === 'object'
              ? (t.iconImage as MediaFromPayload)
              : null
          return {
            id: t.id,
            slug: t.slug,
            label: t.title,
            desc: t.description ?? '',
            lessons: t.lessonsCount ?? 10,
            Icon: ICON_MAP[t.icon ?? ''] ?? Stethoscope,
            iconImageUrl: media?.url ?? null,
            iconImageAlt: media?.alt ?? t.title,
          }
        })
      : STATIC_TOPICS.map((t) => ({ ...t, iconImageUrl: null, iconImageAlt: '' }))

  return (
    <section className="space-y-4">
      <TopicRedirectNotice
        locale={locale}
        topics={topics.map((topic) => ({ id: topic.id, slug: topic.slug, label: topic.label }))}
      />

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
        {topics.map((t) => {
          const topicAccent = getTopicAccent(t.slug)

          return (
            <Link
              key={t.id}
              href={toTopicHref(t.slug, locale)}
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
                    <t.Icon className="h-10 w-10" strokeWidth={1.85} />
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
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-1 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 dark:border-blue-900 dark:bg-blue-950/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-blue-200 bg-white p-2 text-blue-700 dark:border-blue-800 dark:bg-slate-800 dark:text-blue-400">
              <MessageCircleQuestion className="h-8 w-8" />
            </div>
            <div>
              <p className="text-[28px] font-semibold tracking-tight text-slate-900 dark:text-white">
                Need help finding the right topic?
              </p>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                Use our Ask a Question tool or chat with our support team.
              </p>
            </div>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <button
              type="button"
              className="flex-1 rounded-xl border border-blue-300 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 sm:flex-none dark:border-blue-700 dark:bg-slate-800 dark:text-blue-400"
            >
              Ask a Question
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 sm:flex-none"
            >
              Chat with Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
