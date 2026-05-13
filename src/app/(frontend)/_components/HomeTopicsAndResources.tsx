'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  BadgePlus,
  Brain,
  ChevronRight,
  ClipboardCheck,
  FileText,
  FlaskConical,
  HeartPulse,
  HelpingHand,
  Hospital,
  MessageCircleQuestion,
  PhoneCall,
  Salad,
  ShieldCheck,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { localizePath } from '@/i18n/routing'
import type { Locale } from '@/i18n/config'
import { getTopicAccent } from '../topic/_utils/topicVisuals'

export type HomeTopic = {
  id: string
  title: string
  description: string
  slug: string
  icon: string | null
  iconImageUrl: string | null
  iconImageAlt: string
}

type Props = {
  locale: Locale
  topics: HomeTopic[]
}

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

const RESOURCE_LINKS = [
  {
    id: 'lab-tests',
    title: 'Lab Test Explained',
    description: 'Understand your lab results with simple breakdowns.',
    href: '/posts',
    Icon: FlaskConical,
  },
  {
    id: 'nutrition-guides',
    title: 'Nutrition Tips',
    description: 'Healthy food choices for individuals and families.',
    href: '/posts',
    Icon: Salad,
  },
  {
    id: 'community-support',
    title: 'Community Support',
    description: 'Find local services and settlement support resources.',
    href: '/search',
    Icon: HelpingHand,
  },
  {
    id: 'forms-and-documents',
    title: 'Forms and Documents',
    description: 'Access key forms and healthcare documents quickly.',
    href: '/search',
    Icon: FileText,
  },
  {
    id: 'safety-info',
    title: 'Safety Information',
    description: 'Learn what to do in urgent and non-urgent situations.',
    href: '/topic/safety-info',
    Icon: ShieldCheck,
  },
  {
    id: 'ask-questions',
    title: 'Ask a Question',
    description: 'Browse answers to common health and newcomer questions.',
    href: '/search',
    Icon: MessageCircleQuestion,
  },
]

export function HomeTopicsAndResources({ locale, topics }: Props) {
  const [showAllTopics, setShowAllTopics] = useState(false)

  const getTopicHref = (slug: string) => {
    const normalized = slug.trim().replace(/^\/+|\/+$/g, '')

    if (!normalized) {
      return localizePath('/topic', locale)
    }

    return localizePath(`/topic/${encodeURIComponent(normalized)}`, locale)
  }

  const displayTopics = useMemo(
    () => (showAllTopics ? topics : topics.slice(0, 4)),
    [showAllTopics, topics],
  )

  const quickTopics = useMemo(() => topics.slice(0, 6), [topics])

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="px-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          Quick Access
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickTopics.map((topic) => {
            const topicAccent = getTopicAccent(topic.slug, topic.icon)
            const TopicIcon = topic.icon ? TOPIC_ICON_MAP[topic.icon] : undefined

            return (
              <Link
                key={`quick-${topic.id}`}
                href={getTopicHref(topic.slug)}
                className={`group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 ${topicAccent.card}`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-sm ${topicAccent.frame}`}
                >
                  {topic.iconImageUrl ? (
                    <Image
                      src={topic.iconImageUrl}
                      alt={topic.iconImageAlt}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                  ) : TopicIcon ? (
                    <TopicIcon className="h-5 w-5" strokeWidth={1.9} />
                  ) : (
                    <span className="text-sm font-bold">
                      {topic.title.trim().charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>

                <span className="min-w-0 flex-1 truncate leading-5">{topic.title}</span>
                <ChevronRight className={`h-4 w-4 shrink-0 ${topicAccent.arrow}`} />
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Health Topics
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Featured topics from your Payload CMS.
          </p>
        </div>
        {topics.length > 4 ? (
          <button
            type="button"
            onClick={() => setShowAllTopics((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 dark:border-blue-700 dark:text-blue-300 dark:hover:bg-blue-900/40"
          >
            {showAllTopics ? 'Show Less' : 'View More Health Topics'}
            <ChevronRight
              className={`h-4 w-4 transition-transform ${showAllTopics ? 'rotate-90' : ''}`}
            />
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {displayTopics.map((topic) => {
          const topicAccent = getTopicAccent(topic.slug, topic.icon)
          const TopicIcon = topic.icon ? TOPIC_ICON_MAP[topic.icon] : undefined

          return (
            <Link
              key={topic.id}
              href={getTopicHref(topic.slug)}
              className={`group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 ${topicAccent.card}`}
            >
              <div
                className={`mb-4 flex h-24 items-center rounded-xl bg-gradient-to-br px-4 ${topicAccent.panel}`}
              >
                <span
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border shadow-sm ${topicAccent.frame}`}
                >
                  {topic.iconImageUrl ? (
                    <Image
                      src={topic.iconImageUrl}
                      alt={topic.iconImageAlt}
                      width={46}
                      height={46}
                      className="h-11 w-11 object-contain"
                    />
                  ) : TopicIcon ? (
                    <TopicIcon className="h-8 w-8" strokeWidth={1.85} />
                  ) : (
                    <span className="text-xl font-bold">
                      {topic.title.trim().charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {topic.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {topic.description}
              </p>
              <span
                className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${topicAccent.arrow}`}
              >
                Learn More
                <ChevronRight className="h-4 w-4" />
              </span>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Popular Resources
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Quick links to trusted health resources and support tools.
          </p>
        </div>
        <Link
          href={localizePath('/posts', locale)}
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View all resources
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {RESOURCE_LINKS.map(({ id, title, description, href, Icon }) => (
          <Link
            key={id}
            href={localizePath(href, locale)}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-blue-50 p-2 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
