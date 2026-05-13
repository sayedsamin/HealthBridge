import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, CheckCircle2, Info } from 'lucide-react'

import { fetchTopicBySlug } from '../../_utils/fetchTopicBySlug'
import { slugify } from '../../_utils/slugify'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'
import { getTopicAccent } from '../../_utils/topicVisuals'

type Args = {
  params: Promise<{ slug: string; section: string }>
}

function findSection(
  topic: NonNullable<Awaited<ReturnType<typeof fetchTopicBySlug>>>,
  sectionSlug: string,
) {
  return topic.sections?.find((section) => slugify(section.title) === sectionSlug) ?? null
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, section } = await paramsPromise
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const topic = await fetchTopicBySlug(slug, locale, language)

  if (!topic) return {}

  const targetSection = findSection(topic, section)
  if (!targetSection) return { title: topic.title }

  return {
    title: `${targetSection.title} | ${topic.title}`,
    description: targetSection.details ?? targetSection.description,
  }
}

export default async function TopicSectionPage({ params: paramsPromise }: Args) {
  const { slug, section } = await paramsPromise
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const topic = await fetchTopicBySlug(slug, locale, language)
  const topicAccent = getTopicAccent(slug, topic?.icon ?? null)

  if (!topic) notFound()

  const targetSection = findSection(topic, section)
  if (!targetSection) notFound()

  const sectionHighlights = (targetSection.keyPoints ?? [])
    .map((entry) => (typeof entry === 'string' ? entry : entry.point))
    .filter((entry): entry is string => Boolean(entry))

  return (
    <section className="space-y-5">
      <Link
        href={localizePath(`/topic/${slug}`, locale)}
        className={`inline-flex items-center gap-2 text-sm font-semibold ${topicAccent.arrow}`}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Topic Overview
      </Link>

      <div className={`rounded-2xl border p-5 ${topicAccent.panel} border-transparent`}>
        <p
          className={`text-xs font-semibold uppercase tracking-widest ${topicAccent.arrow} dark:text-white`}
        >
          {topic.title}
        </p>
        <h1
          className={`mt-2 text-4xl font-bold tracking-tight ${topicAccent.arrow} dark:text-white`}
        >
          {targetSection.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
          {targetSection.details ?? targetSection.description}
        </p>
      </div>

      <div className={`rounded-2xl border p-5 ${topicAccent.panel} border-transparent`}>
        <div className={`flex items-center gap-2 ${topicAccent.arrow}`}>
          <Info className="h-4 w-4" />
          <h2 className="text-base font-semibold">Section Highlights</h2>
        </div>

        <ul className="mt-3 space-y-2.5">
          {sectionHighlights.map((point, index) => (
            <li
              key={`${index}-${point}`}
              className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200"
            >
              <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${topicAccent.arrow}`} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
