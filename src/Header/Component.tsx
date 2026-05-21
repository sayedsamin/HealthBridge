import { HeaderClient } from './Component.client'
import React from 'react'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'
import { fetchAllTopics } from '@/app/(frontend)/topic/_utils/fetchTopicBySlug'
import { fetchResourceItems } from '@/app/(frontend)/_utils/fetchResourceItems'

export async function Header() {
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const topics = await fetchAllTopics(locale, language)
  const resources = await fetchResourceItems().catch(() => [])

  const topicMenuItems = topics
    .filter((topic) => topic.slug && topic.title)
    .map((topic) => ({
      slug: topic.slug,
      label: topic.title,
    }))

  const resourceMenuItems = resources
    .filter((resource) => resource.slug && resource.title)
    .map((resource) => ({
      slug: resource.slug,
      label: resource.title,
    }))

  return <HeaderClient topicMenuItems={topicMenuItems} resourceMenuItems={resourceMenuItems} />
}
