import configPromise from '@payload-config'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

export type HomepageData = {
  badgeText?: string
  headingStart?: string
  headingHighlight?: string
  headingEnd?: string
  subheading?: string
  footerNote?: string
  canadianBadgeText?: string
  primaryCTALabel?: string
  primaryCTAUrl?: string
  secondaryCTALabel?: string
  secondaryCTAUrl?: string
}

async function getHomepageGlobal(locale: Locale): Promise<HomepageData | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({
      slug: 'homepage',
      depth: 0,
      locale,
      fallbackLocale: defaultLocale,
    })
    return data as unknown as HomepageData
  } catch {
    return null
  }
}

export const fetchHomepageGlobal = (locale: Locale): Promise<HomepageData | null> =>
  unstable_cache(() => getHomepageGlobal(locale), ['global_homepage', locale], {
    tags: [`global_homepage_${locale}`, 'global_homepage'],
  })()
