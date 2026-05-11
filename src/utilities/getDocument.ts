import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { defaultLocale, isCmsLocale, type Locale } from '@/i18n/config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { translateContentDeep } from './translateContent'

type Collection = keyof Config['collections']

async function getDocument(
  collection: Collection,
  slug: string,
  depth = 0,
  locale: Locale = defaultLocale,
  targetLanguage: string = locale,
) {
  const payload = await getPayload({ config: configPromise })

  const page = await payload.find({
    collection,
    depth,
    locale,
    fallbackLocale: defaultLocale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const document = page.docs[0]

  if (!document || targetLanguage === defaultLocale || isCmsLocale(targetLanguage)) {
    return document
  }

  return translateContentDeep(document, targetLanguage)
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (
  collection: Collection,
  slug: string,
  locale: Locale = defaultLocale,
  targetLanguage: string = locale,
) =>
  unstable_cache(
    async () => getDocument(collection, slug, 0, locale, targetLanguage),
    [collection, slug, locale, targetLanguage],
    {
      tags: [
        `${collection}_${slug}_${locale}`,
        `${collection}_${slug}_lang_${targetLanguage}`,
        `${collection}_${slug}`,
      ],
    },
  )
