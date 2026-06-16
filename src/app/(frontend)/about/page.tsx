import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Shield, Globe, Users } from 'lucide-react'
import { fetchAboutGlobal } from '../_utils/fetchAbout'
import { STATIC_ABOUT_FALLBACK } from '../_utils/staticAboutFallback'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'

export const metadata: Metadata = {
  title: 'About Us | HealthBridge',
  description:
    'Learn about HealthBridge: our mission, vision, and commitment to accessible health information for newcomers and immigrants.',
}

const VALUE_ICONS: Record<string, React.ElementType> = {
  accessibility: Globe,
  equity: Shield,
  empowerment: Heart,
  'cultural responsiveness': Users,
}

export default async function AboutPage() {
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const cmsData = await fetchAboutGlobal(locale, language)

  const data = cmsData || STATIC_ABOUT_FALLBACK
  const hasTeamSection =
    Boolean(data.teamTitle?.trim()) ||
    Boolean(data.teamDescription?.trim()) ||
    Boolean(data.teamMembers && data.teamMembers.length > 0)

  return (
    <main className="w-full overflow-x-hidden bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative isolate w-full overflow-hidden">
        {/* Background overlays */}
        <div
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            backgroundImage: data.heroImage?.url
              ? `url('${data.heroImage.url}')`
              : 'linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(6, 182, 212) 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-blue-900/85 via-blue-900/75 to-blue-700/70 dark:from-slate-950/90 dark:via-slate-900/85 dark:to-slate-900/75"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <div className="flex items-center gap-12">
            <div className="max-w-2xl flex-1">
              <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                {data.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">{data.heroSubtitle}</p>
            </div>

            {/* Right-side hero image */}
            <div className="about-hero-image-wrap" aria-hidden="true">
              <Image
                src="/media/ChatGPT Image May 7, 2026, 10_23_01 AM-900x600.png"
                alt=""
                width={900}
                height={600}
                className="about-hero-img"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-900/30">
            <h2 className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-200">
              {data.missionTitle}
            </h2>
            <p className="mt-4 text-lg leading-7 text-emerald-800 dark:text-emerald-300">
              {data.missionDescription}
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-900/30">
            <h2 className="text-3xl font-bold tracking-tight text-blue-900 dark:text-blue-200">
              {data.visionTitle}
            </h2>
            <p className="mt-4 text-lg leading-7 text-blue-800 dark:text-blue-300">
              {data.visionDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      {data.coreValues && data.coreValues.length > 0 && (
        <section className="bg-slate-100 px-4 py-12 dark:bg-slate-900 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Our Core Values
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600 dark:text-slate-400">
              These principles guide everything we do at HealthBridge.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.coreValues.map((value, index) => {
                const IconComponent =
                  VALUE_ICONS[value.title.toLowerCase()] || [Heart, Shield, Globe, Users][index % 4]

                return (
                  <div
                    key={value.title}
                    className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                      <IconComponent className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {hasTeamSection && (
        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            {data.teamTitle || 'Meet Our Team'}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-slate-600 dark:text-slate-400">
            {data.teamDescription || 'Learn more about the people behind HealthBridge.'}
          </p>

          {data.teamMembers && data.teamMembers.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-800"
                >
                  {member.image?.url && (
                    <div className="mb-4 flex justify-center">
                      <div className="relative h-28 w-28 overflow-hidden rounded-full">
                        <Image
                          src={member.image.url}
                          alt={member.image.alt || member.name}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {member.role}
                  </p>
                  {member.bio && (
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              Team member profiles will appear here once added in Payload Admin.
            </div>
          )}
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-blue-600 px-4 py-12 dark:bg-blue-900/40 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1280px] text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white dark:text-blue-100">
            {data.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-blue-100 dark:text-blue-200">
            {data.ctaDescription}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={localizePath(data.ctaButtonUrl || '/topic', locale)}
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-blue-600 shadow-md transition-colors hover:bg-blue-50 dark:bg-slate-900 dark:text-blue-200 dark:hover:bg-slate-800"
            >
              {data.ctaButtonLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
