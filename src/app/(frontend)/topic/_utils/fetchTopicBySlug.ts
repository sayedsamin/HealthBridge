import configPromise from '@payload-config'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

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
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      collection: 'health-topics' as any,
      locale,
      fallbackLocale: defaultLocale,
      where: { slug: { equals: slug } },
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

// ─── Cached exports ───────────────────────────────────────────────────────────

export const fetchTopicBySlug = (slug: string, locale: Locale): Promise<TopicFromPayload | null> =>
  unstable_cache(() => getTopicBySlug(slug, locale), [`health-topic-${slug}`, locale], {
    tags: [`health-topic-${slug}_${locale}`, `health-topic-${slug}`, 'health-topics'],
  })()

export const fetchAllTopics = (locale: Locale): Promise<TopicFromPayload[]> =>
  unstable_cache(() => getAllTopics(locale), ['health-topics-all', locale], {
    tags: [`health-topics_${locale}`, 'health-topics'],
  })()

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
