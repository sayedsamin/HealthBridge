import configPromise from '@payload-config'
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

async function getHomepageGlobal(): Promise<HomepageData | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = await payload.findGlobal({ slug: 'homepage' as any, depth: 0 })
    return data as unknown as HomepageData
  } catch {
    return null
  }
}

export const fetchHomepageGlobal = (): Promise<HomepageData | null> =>
  unstable_cache(() => getHomepageGlobal(), ['global_homepage'], {
    tags: ['global_homepage'],
  })()
