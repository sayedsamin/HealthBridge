import configPromise from '@payload-config'
import { defaultLocale, isCmsLocale, type Locale } from '@/i18n/config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import { translateContentDeep } from '@/utilities/translateContent'

export type AboutData = {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: { url?: string; alt?: string } | null
  missionTitle?: string
  missionDescription?: string
  visionTitle?: string
  visionDescription?: string
  coreValues?: Array<{ title: string; description?: string }>
  teamTitle?: string
  teamDescription?: string
  teamMembers?: Array<{
    name: string
    role: string
    bio?: string
    image?: { url?: string; alt?: string } | null
  }>
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonLabel?: string
  ctaButtonUrl?: string
}

async function getAboutGlobal(locale: Locale): Promise<AboutData | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({
      slug: 'about',
      depth: 1,
      locale,
      fallbackLocale: defaultLocale,
    })
    return data as unknown as AboutData
  } catch {
    return null
  }
}

async function getAboutForLanguage(
  locale: Locale,
  targetLanguage: string,
): Promise<AboutData | null> {
  const data = await getAboutGlobal(locale)

  if (!data) {
    return null
  }

  if (targetLanguage === defaultLocale || isCmsLocale(targetLanguage)) {
    return data
  }

  return translateContentDeep(data, targetLanguage)
}

export const fetchAboutGlobal = (
  locale: Locale,
  targetLanguage: string = locale,
): Promise<AboutData | null> =>
  unstable_cache(
    () => getAboutForLanguage(locale, targetLanguage),
    ['global_about', locale, targetLanguage],
    {
      tags: [
        `global_about_${locale}`,
        `global_about_lang_${targetLanguage}`,
        'global_about',
        'about',
      ],
    },
  )()
