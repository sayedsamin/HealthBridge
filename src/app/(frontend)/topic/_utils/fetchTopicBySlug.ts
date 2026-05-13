import configPromise from '@payload-config'
import { defaultLocale, isCmsLocale, type Locale } from '@/i18n/config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { translateContentDeep } from '@/utilities/translateContent'
import { toKebabCase } from '@/utilities/toKebabCase'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TopicSectionFromPayload = {
  id?: string
  title: string
  description: string
  details?: string
  keyPoints?: Array<{ id?: string; point: string } | string>
}

export type MediaFromPayload = {
  id: string
  url?: string
  filename?: string
  alt?: string
}

export type TopicFromPayload = {
  id: string
  title: string
  slug: string
  description?: string
  icon?: string
  iconImage?: MediaFromPayload | string | null
  lessonsCount?: number
  order?: number
  subtitle?: string
  sidebarTitle?: string
  sidebarItems?: Array<{ id?: string; item: string }>
  videoDuration?: string
  supportPhone?: string
  sections?: TopicSectionFromPayload[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function getTopicBySlug(slug: string, locale: Locale): Promise<TopicFromPayload | null> {
  try {
    const safeDecode = (value: string): string => {
      try {
        return decodeURIComponent(value)
      } catch {
        return value
      }
    }

    const normalizeSlug = (value: string): string =>
      toKebabCase(value)
        .trim()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')

    const decodedSlug = safeDecode(slug)
    const normalizedSlug = normalizeSlug(decodedSlug)
    const slugCandidates = Array.from(
      new Set([slug, decodedSlug, decodedSlug.trim(), normalizedSlug].filter(Boolean)),
    )

    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: 'health-topics' as any,
      locale,
      fallbackLocale: defaultLocale,
      where: { slug: { in: slugCandidates } },
      limit: 1,
      depth: 1,
    })
    return (result.docs[0] as unknown as TopicFromPayload) ?? null
  } catch {
    return null
  }
}

async function getAllTopics(locale: Locale): Promise<TopicFromPayload[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: 'health-topics' as any,
      locale,
      fallbackLocale: defaultLocale,
      sort: 'order',
      limit: 100,
      depth: 1,
    })
    return result.docs as unknown as TopicFromPayload[]
  } catch {
    return []
  }
}

async function getTopicBySlugForLanguage(
  slug: string,
  locale: Locale,
  targetLanguage: string,
): Promise<TopicFromPayload | null> {
  const topic = await getTopicBySlug(slug, locale)

  if (!topic) {
    return null
  }

  if (targetLanguage === defaultLocale || isCmsLocale(targetLanguage)) {
    return topic
  }

  return translateContentDeep(topic, targetLanguage)
}

async function getAllTopicsForLanguage(
  locale: Locale,
  targetLanguage: string,
): Promise<TopicFromPayload[]> {
  const topics = await getAllTopics(locale)

  if (targetLanguage === defaultLocale || isCmsLocale(targetLanguage)) {
    return topics
  }

  return translateContentDeep(topics, targetLanguage)
}

// ─── Cached exports ───────────────────────────────────────────────────────────

export const fetchTopicBySlug = (
  slug: string,
  locale: Locale,
  targetLanguage: string = locale,
): Promise<TopicFromPayload | null> =>
  unstable_cache(
    () => getTopicBySlugForLanguage(slug, locale, targetLanguage),
    [`health-topic-${slug}`, locale, targetLanguage],
    {
      tags: [
        `health-topic-${slug}_${locale}`,
        `health-topic-${slug}_lang_${targetLanguage}`,
        `health-topic-${slug}`,
        'health-topics',
      ],
    },
  )()

export const fetchAllTopics = (
  locale: Locale,
  targetLanguage: string = locale,
): Promise<TopicFromPayload[]> =>
  unstable_cache(
    () => getAllTopicsForLanguage(locale, targetLanguage),
    ['health-topics-all', locale, targetLanguage],
    {
      tags: [`health-topics_${locale}`, `health-topics_lang_${targetLanguage}`, 'health-topics'],
    },
  )()

// ─── Converter: Payload → TopicDetailTemplate props ──────────────────────────

export function toTemplateProps(topic: TopicFromPayload, activeSidebarLabel?: string) {
  return {
    topicSlug: topic.slug,
    title: topic.title,
    subtitle: topic.subtitle ?? '',
    sidebarTitle: topic.sidebarTitle ?? 'Topics Overview',
    activeSidebarLabel: activeSidebarLabel ?? topic.sidebarItems?.[0]?.item ?? topic.title,
    sidebarItems: topic.sidebarItems?.map((s) => s.item) ?? [],
    videoDuration: topic.videoDuration ?? '3 min',
    supportPhone: topic.supportPhone ?? '1-888-315-9257',
    sections:
      topic.sections?.map((s) => ({
        title: s.title,
        description: s.description,
        details: s.details,
        keyPoints: s.keyPoints?.map((k) => (typeof k === 'string' ? k : k.point)) ?? [],
      })) ?? [],
  }
}
