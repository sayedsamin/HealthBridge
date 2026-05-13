'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { AlertCircle, X } from 'lucide-react'

import { localizePath } from '@/i18n/routing'
import type { Locale } from '@/i18n/config'

type TopicLink = {
  id: string
  slug: string
  label: string
}

type Props = {
  locale: Locale
  topics: TopicLink[]
}

export function TopicRedirectNotice({ locale, topics }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [dismissed, setDismissed] = useState(false)
  const missingTopic = searchParams.get('missingTopic')
  const [topicFromRedirect, setTopicFromRedirect] = useState<string | null>(null)

  useEffect(() => {
    if (!missingTopic || topicFromRedirect) {
      return
    }

    setTopicFromRedirect(missingTopic)
  }, [missingTopic, topicFromRedirect])

  useEffect(() => {
    if (!missingTopic) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    params.delete('missingTopic')
    const query = params.toString()
    const cleanUrl = query ? `${pathname}?${query}` : pathname

    router.replace(cleanUrl, { scroll: false })
  }, [missingTopic, pathname, router, searchParams])

  const availableTopics = useMemo(() => topics.slice(0, 6), [topics])

  if (!topicFromRedirect || dismissed) {
    return null
  }

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Topic not found</p>
            <p className="mt-0.5 text-xs">
              We could not find <span className="font-semibold">{topicFromRedirect}</span>. Try one
              of these available topics:
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {availableTopics.map((topic) => (
                <Link
                  key={`missing-topic-${topic.id}`}
                  href={localizePath(`/topic/${encodeURIComponent(topic.slug)}`, locale)}
                  className="rounded-full border border-amber-300 bg-white px-2.5 py-1 text-xs font-semibold text-amber-800 transition-colors hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200 dark:hover:bg-amber-900/40"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <button
          aria-label="Dismiss topic not found notice"
          className="rounded-md p-1 text-amber-700 transition-colors hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900/40"
          onClick={() => setDismissed(true)}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
