import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { defaultLocale } from '@/i18n/config'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'
import { translateContentDeep } from '@/utilities/translateContent'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    locale,
    fallbackLocale: defaultLocale,
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  const translatedPosts = {
    ...posts,
    docs: await translateContentDeep(posts.docs, language),
  }

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={translatedPosts.page}
          limit={12}
          totalDocs={translatedPosts.totalDocs}
        />
      </div>

      <CollectionArchive posts={translatedPosts.docs} />

      <div className="container">
        {translatedPosts.totalPages > 1 && translatedPosts.page && (
          <Pagination page={translatedPosts.page} totalPages={translatedPosts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
