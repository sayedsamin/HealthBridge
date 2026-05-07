import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { TopicDetailTemplate } from '../TopicDetailTemplate'
import { fetchTopicBySlug, toTemplateProps } from '../_utils/fetchTopicBySlug'

type Args = {
  params: Promise<{ slug: string }>
}

// Build static pages at build time for all topics in the CMS
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await payload.find({ collection: 'health-topics' as any, limit: 200, depth: 0 })
    return result.docs.map((doc: { slug: string }) => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const topic = await fetchTopicBySlug(slug)
  if (!topic) return {}
  return {
    title: topic.title,
    description: topic.subtitle ?? topic.description ?? undefined,
  }
}

export default async function DynamicTopicPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const topic = await fetchTopicBySlug(slug)

  if (!topic) notFound()

  return <TopicDetailTemplate {...toTemplateProps(topic)} />
}
