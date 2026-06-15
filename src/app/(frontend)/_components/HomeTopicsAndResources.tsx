'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  BadgePlus,
  Brain,
  ChevronRight,
  ClipboardCheck,
  FlaskConical,
  HeartPulse,
  Hospital,
  MessageCircleQuestion,
  PhoneCall,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Users,
  type LucideIcon,
} from 'lucide-react'

import { localizePath } from '@/i18n/routing'
import type { Locale } from '@/i18n/config'
import { getTopicAccent } from '../topic/_utils/topicVisuals'
import { PopularResourcesSection, type PopularResourceItem } from './PopularResourcesSection'

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
  popularResources: PopularResourceItem[]
  popularResourcesHeading?: string
  popularResourcesDescription?: string
  popularResourcesViewAllLabel?: string
  popularResourcesViewAllUrl?: string
}

const CLIENT_TOPIC_FALLBACKS: HomeTopic[] = [
  {
    id: 'healthcare-system',
    title: 'Understanding Canadian Healthcare',
    description: 'Learn how the healthcare system works in Canada.',
    slug: 'healthcare-system',
    icon: 'Stethoscope',
    iconImageUrl: null,
    iconImageAlt: 'Healthcare',
  },
  {
    id: 'mental-health',
    title: 'Mental Health Support',
    description: 'Find resources and tips to support your well-being.',
    slug: 'mental-health',
    icon: 'Brain',
    iconImageUrl: null,
    iconImageAlt: 'Mental Health',
  },
  {
    id: 'nutrition',
    title: 'Nutrition and Healthy Living',
    description: 'Discover healthy choices for you and your family.',
    slug: 'nutrition',
    icon: 'HeartPulse',
    iconImageUrl: null,
    iconImageAlt: 'Nutrition',
  },
  {
    id: 'youth-health',
    title: 'Youth Education and Safety',
    description: 'Important information for youth and teens.',
    slug: 'youth-health',
    icon: 'Users',
    iconImageUrl: null,
    iconImageAlt: 'Youth Health',
  },
]

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

export function HomeTopicsAndResources({
  locale,
  topics,
  popularResources,
  popularResourcesHeading,
  popularResourcesDescription,
  popularResourcesViewAllLabel,
  popularResourcesViewAllUrl,
}: Props) {
  const [showAllTopics, setShowAllTopics] = useState(false)
  const [failedImageIds, setFailedImageIds] = useState<Set<string>>(new Set())

  const effectiveTopics = useMemo(() => {
    const normalizedTopics = (topics || []).filter((topic) => {
      return Boolean(topic?.id && topic?.title?.trim() && topic?.slug?.trim())
    })

    return normalizedTopics.length > 0 ? normalizedTopics : CLIENT_TOPIC_FALLBACKS
  }, [topics])

  const getTopicHref = (slug: string) => {
    const normalized = slug.trim().replace(/^\/+|\/+$/g, '')

    if (!normalized) {
      return localizePath('/topic', locale)
    }

    return localizePath(`/topic/${encodeURIComponent(normalized)}`, locale)
  }

  const displayTopics = useMemo(
    () => (showAllTopics ? effectiveTopics : effectiveTopics.slice(0, 4)),
    [showAllTopics, effectiveTopics],
  )

  const quickTopics = useMemo(() => effectiveTopics.slice(0, 6), [effectiveTopics])

  const markImageFailed = (topicId: string) => {
    setFailedImageIds((prev) => {
      if (prev.has(topicId)) return prev
      const next = new Set(prev)
      next.add(topicId)
      return next
    })
  }

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="px-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          Quick Access
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickTopics.map((topic, index) => {
            const topicAccent = getTopicAccent(topic.slug, topic.icon)
            const TopicIcon = topic.icon ? TOPIC_ICON_MAP[topic.icon] : undefined
            const canRenderImage = Boolean(topic.iconImageUrl) && !failedImageIds.has(topic.id)

            return (
              <Link
                key={`quick-${topic.id}`}
                href={getTopicHref(topic.slug)}
                className={`group animate-fadeInScale inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 ${topicAccent.card}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border shadow-sm ${topicAccent.frame}`}
                >
                  {canRenderImage ? (
                    <Image
                      src={topic.iconImageUrl}
                      alt={topic.iconImageAlt}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                      onError={() => markImageFailed(topic.id)}
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
            Practical health guidance tailored for newcomers in Canada.
          </p>
        </div>
        {effectiveTopics.length > 4 ? (
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
        {displayTopics.map((topic, index) => {
          const topicAccent = getTopicAccent(topic.slug, topic.icon)
          const TopicIcon = topic.icon ? TOPIC_ICON_MAP[topic.icon] : undefined
          const canRenderImage = Boolean(topic.iconImageUrl) && !failedImageIds.has(topic.id)
          const hasHealthcareBackground = topic.slug === 'healthcare-system'

          return (
            <Link
              key={topic.id}
              href={getTopicHref(topic.slug)}
              className={`group animate-fadeInScale rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 ${topicAccent.card}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`relative mb-4 flex h-24 items-center overflow-hidden rounded-xl bg-gradient-to-br bg-cover bg-center px-4 ${topicAccent.panel}`}
                style={
                  hasHealthcareBackground ? { backgroundImage: "url('/Section1.png')" } : undefined
                }
              >
                {hasHealthcareBackground ? (
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-slate-900/55 via-slate-900/20 to-transparent"
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border shadow-sm ${topicAccent.frame}`}
                >
                  {canRenderImage ? (
                    <Image
                      src={topic.iconImageUrl}
                      alt={topic.iconImageAlt}
                      width={46}
                      height={46}
                      className="h-11 w-11 object-contain"
                      onError={() => markImageFailed(topic.id)}
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

      <PopularResourcesSection
        locale={locale}
        heading={popularResourcesHeading}
        description={popularResourcesDescription}
        viewAllLabel={popularResourcesViewAllLabel}
        viewAllUrl={popularResourcesViewAllUrl}
        resources={popularResources}
      />
    </section>
  )
}
