import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, CheckCircle2, Info } from 'lucide-react'

import { fetchTopicBySlug } from '../../_utils/fetchTopicBySlug'
import { slugify } from '../../_utils/slugify'
import { getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'

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
  const topic = await fetchTopicBySlug(slug, locale)

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
  const topic = await fetchTopicBySlug(slug, locale)

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
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Topic Overview
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          {topic.title}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          {targetSection.title}
        </h1>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
          {targetSection.details ?? targetSection.description}
        </p>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/40">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
          <Info className="h-4 w-4" />
          <h2 className="text-base font-semibold">Section Highlights</h2>
        </div>

        <ul className="mt-3 space-y-2.5">
          {sectionHighlights.map((point, index) => (
            <li
              key={`${index}-${point}`}
              className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-500" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
