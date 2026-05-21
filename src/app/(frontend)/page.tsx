import Link from 'next/link'
import { fetchHomepageGlobal } from './_utils/fetchHomepage'
import { fetchAllTopics, type MediaFromPayload } from './topic/_utils/fetchTopicBySlug'
import { HomeTopicsAndResources, type HomeTopic } from './_components/HomeTopicsAndResources'
import { DEFAULT_POPULAR_RESOURCES } from './_components/PopularResourcesSection'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'

// Static fallbacks — used when the admin has not yet populated the Homepage global
const DEFAULTS = {
  badgeText: 'Culturally Responsive Health Literacy',
  headingStart: 'Helping newcomers',
  headingHighlight: 'navigate healthcare',
  headingEnd: 'and safety in Canada.',
  subheading:
    'Access health services, understand lab results, improve wellness, and find trusted support - in your language.',
  primaryCTALabel: 'Explore Health Topics',
  primaryCTAUrl: '/topic',
  secondaryCTALabel: 'Browse Resources',
  secondaryCTAUrl: '/resources',
  footerNote: 'Free · Multilingual · Trusted by immigrants, students & newcomers',
  canadianBadgeText: '🍁 Canada-focused health guidance',
}

const TOPIC_FALLBACKS: HomeTopic[] = [
  {
    id: 'healthcare-system',
    title: 'Understanding Canadian Healthcare',
    description: 'Learn how the healthcare system works in Canada.',
    slug: 'healthcare-system',
    icon: 'Stethoscope',
    iconImageUrl: null,
    iconImageAlt: 'Healthcare',
  },
  {
    id: 'mental-health',
    title: 'Mental Health Support',
    description: 'Find resources and tips to support your well-being.',
    slug: 'mental-health',
    icon: 'Brain',
    iconImageUrl: null,
    iconImageAlt: 'Mental Health',
  },
  {
    id: 'nutrition',
    title: 'Nutrition and Healthy Living',
    description: 'Discover healthy choices for you and your family.',
    slug: 'nutrition',
    icon: 'HeartPulse',
    iconImageUrl: null,
    iconImageAlt: 'Nutrition',
  },
  {
    id: 'youth-health',
    title: 'Youth Education and Safety',
    description: 'Important information for youth and teens.',
    slug: 'youth-health',
    icon: 'Users',
    iconImageUrl: null,
    iconImageAlt: 'Youth Health',
  },
]

export default async function HomePage() {
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const cms = await fetchHomepageGlobal(locale, language)
  const cmsTopics = await fetchAllTopics(locale, language)

  const d = {
    badgeText: cms?.badgeText || DEFAULTS.badgeText,
    headingStart: cms?.headingStart || DEFAULTS.headingStart,
    headingHighlight: cms?.headingHighlight || DEFAULTS.headingHighlight,
    headingEnd: cms?.headingEnd || DEFAULTS.headingEnd,
    subheading: cms?.subheading || DEFAULTS.subheading,
    primaryCTALabel: cms?.primaryCTALabel || DEFAULTS.primaryCTALabel,
    primaryCTAUrl: cms?.primaryCTAUrl || DEFAULTS.primaryCTAUrl,
    secondaryCTALabel: cms?.secondaryCTALabel || DEFAULTS.secondaryCTALabel,
    secondaryCTAUrl: cms?.secondaryCTAUrl || DEFAULTS.secondaryCTAUrl,
    footerNote: cms?.footerNote || DEFAULTS.footerNote,
    canadianBadgeText: cms?.canadianBadgeText || DEFAULTS.canadianBadgeText,
    popularResourcesHeading: cms?.popularResourcesHeading || 'Popular Resources',
    popularResourcesDescription:
      cms?.popularResourcesDescription ||
      'Quick links to trusted health resources and support tools.',
    popularResourcesViewAllLabel: cms?.popularResourcesViewAllLabel || 'View all resources',
    popularResourcesViewAllUrl: cms?.popularResourcesViewAllUrl || '/posts',
  }

  const popularResources =
    cms?.popularResources && cms.popularResources.length > 0
      ? cms.popularResources.map((resource) => ({
          id: resource.id,
          title: resource.title,
          description: resource.description,
          href: resource.href,
          icon: resource.icon,
        }))
      : DEFAULT_POPULAR_RESOURCES

  const homeTopics =
    cmsTopics.length > 0
      ? cmsTopics.map((topic) => {
          const media =
            topic.iconImage && typeof topic.iconImage === 'object'
              ? (topic.iconImage as MediaFromPayload)
              : null

          return {
            id: topic.id,
            title: topic.title,
            description: topic.description ?? 'Explore this health topic.',
            slug: topic.slug,
            icon: topic.icon ?? null,
            iconImageUrl: media?.url ?? null,
            iconImageAlt: media?.alt ?? topic.title,
          }
        })
      : TOPIC_FALLBACKS
  console.log(homeTopics)
  return (
    <main className="min-h-screen overflow-x-clip bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden">
        {/* Background image */}
        <div className="hero-bg-image absolute inset-0 -z-20" aria-hidden="true" />

        {/* Left-to-right flow overlays: brighter left content zone, stronger right intensity */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-blue-50/95 via-blue-50/74 via-42% to-blue-900/24 dark:from-slate-950/95 dark:via-slate-900/80 dark:to-slate-900/30"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[54%] bg-gradient-to-l from-blue-900/32 via-blue-700/16 to-transparent dark:from-slate-950/50 dark:via-slate-900/20"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 -top-6 -z-10 h-[120%] w-[46%] bg-gradient-to-b from-cyan-300/14 via-sky-500/6 to-blue-900/14 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-24 top-1/2 -z-10 h-64 w-64 -translate-y-1/2 rounded-full bg-blue-200/35 blur-3xl"
          aria-hidden="true"
        />

        {/* Copy */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-10 sm:px-6 md:py-12 lg:px-8 lg:py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:ring-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {d.badgeText}
          </span>

          <div className="mt-6 max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-[1.03] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              {d.headingStart}{' '}
              <span className="text-blue-600 dark:text-blue-400">{d.headingHighlight}</span>{' '}
              {d.headingEnd}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg dark:text-slate-300">
              {d.subheading}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localizePath(d.primaryCTAUrl, locale)}
                className="animate-slideInUp rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200/60 transition-colors hover:bg-blue-700"
                style={{ animationDelay: '0.1s' }}
              >
                {d.primaryCTALabel}
              </Link>
              <Link
                href={localizePath(d.secondaryCTAUrl, locale)}
                className="animate-slideInUp rounded-full border border-blue-600 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 dark:bg-slate-800 dark:text-blue-400 dark:border-blue-500 dark:hover:bg-slate-700"
                style={{ animationDelay: '0.2s' }}
              >
                {d.secondaryCTALabel}
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">{d.footerNote}</p>
          </div>
        </div>

        {/* Canadian badge overlay */}
        <div className="absolute bottom-4 right-4 z-10 hidden items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow backdrop-blur-sm sm:flex dark:bg-slate-900/90 dark:text-slate-300">
          {d.canadianBadgeText}
        </div>
      </section>

      <HomeTopicsAndResources
        locale={locale}
        topics={homeTopics}
        popularResources={popularResources}
        popularResourcesHeading={d.popularResourcesHeading}
        popularResourcesDescription={d.popularResourcesDescription}
        popularResourcesViewAllLabel={d.popularResourcesViewAllLabel}
        popularResourcesViewAllUrl={d.popularResourcesViewAllUrl}
      />
    </main>
  )
}
