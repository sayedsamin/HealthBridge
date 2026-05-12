import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { defaultLocale, isCmsLocale, type Locale } from '@/i18n/config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { translateContentDeep } from './translateContent'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(
  slug: T,
  depth = 0,
  locale: Locale = defaultLocale,
  targetLanguage: string = locale,
): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
    fallbackLocale: defaultLocale,
  })

  if (targetLanguage === defaultLocale || isCmsLocale(targetLanguage)) {
    return global
  }

  return translateContentDeep(global, targetLanguage)
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <T extends Global>(
  slug: T,
  depth = 0,
  locale: Locale = defaultLocale,
  targetLanguage: string = locale,
) =>
  unstable_cache(
    async () => getGlobal<T>(slug, depth, locale, targetLanguage),
    [slug, locale, targetLanguage],
    {
      tags: [`global_${slug}_${locale}`, `global_${slug}_lang_${targetLanguage}`, `global_${slug}`],
    },
  )
