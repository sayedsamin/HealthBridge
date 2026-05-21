import Image from 'next/image'
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  HeartPulse,
  Hospital,
  ShieldAlert,
  Brain,
  BookOpen,
  FlaskConical,
  Apple,
  Globe,
  Users,
  Languages,
  FileText,
  Pill,
  PlayCircle,
} from 'lucide-react'
import { fetchResourcesGlobal } from '../_utils/fetchResources'
import { STATIC_RESOURCES_FALLBACK } from './_utils/staticResourcesFallback'
import { fetchResourceItems } from '../_utils/fetchResourceItems'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'

const ICON_MAP: Record<string, LucideIcon> = {
  Hospital,
  ShieldAlert,
  Brain,
  BookOpen,
  FlaskConical,
  Apple,
  Globe,
  HeartPulse,
  Pill,
  Users,
  FileText,
  Languages,
  PlayCircle,
}

const STATIC_RESOURCES = [
  {
    id: 's1',
    title: 'Find Healthcare Services',
    description:
      'Locate family doctors, walk-in clinics, urgent care centres, and hospitals in Manitoba.',
    icon: 'Hospital',
    slug: 'healthcare-services',
  },
  {
    id: 's2',
    title: 'Emergency & Crisis Help',
    description: 'Quick access to emergency contacts, crisis lines, and urgent support services.',
    icon: 'ShieldAlert',
    slug: 'emergency-help',
  },
  {
    id: 's3',
    title: 'Mental Health Support',
    description:
      'Access counseling, wellness support, stress management, and mental health resources.',
    icon: 'Brain',
    slug: 'mental-health',
  },
  {
    id: 's4',
    title: 'Health Learning Library',
    description: 'Explore trusted health education topics designed for newcomers and families.',
    icon: 'BookOpen',
    slug: 'health-library',
  },
  {
    id: 's5',
    title: 'Understand Lab Results',
    description: 'Learn what common lab tests and medical reports mean in simple language.',
    icon: 'FlaskConical',
    slug: 'lab-results',
  },
  {
    id: 's6',
    title: 'Nutrition & Wellness',
    description: 'Learn about healthy eating, food labels, exercise, and family wellness.',
    icon: 'Apple',
    slug: 'nutrition',
  },
  {
    id: 's7',
    title: 'Newcomer Support',
    description: 'Find settlement support, interpreter services, and healthcare navigation guides.',
    icon: 'Globe',
    slug: 'newcomer-support',
  },
  {
    id: 's8',
    title: 'Youth Health Resources',
    description: 'Explore youth-friendly resources on relationships, consent, and sexual health.',
    icon: 'HeartPulse',
    slug: 'youth-health',
  },
  {
    id: 's9',
    title: 'Medication & Pharmacy Help',
    description: 'Understand prescriptions, pharmacy services, vaccines, and medication safety.',
    icon: 'Pill',
    slug: 'pharmacy',
  },
  {
    id: 's10',
    title: 'Community Services',
    description: 'Discover food banks, shelters, community centres, and support organizations.',
    icon: 'Users',
    slug: 'community-services',
  },
  {
    id: 's11',
    title: 'Printable Resources',
    description: 'Download healthcare guides, checklists, emergency contacts, and learning sheets.',
    icon: 'FileText',
    slug: 'printable-resources',
  },
  {
    id: 's12',
    title: 'Language & Translation Support',
    description: 'Access multilingual health information and interpretation support.',
    icon: 'Languages',
    slug: 'language-support',
  },
  {
    id: 's13',
    title: 'Interactive Learning',
    description: 'Watch videos, complete quizzes, and explore interactive health education tools.',
    icon: 'PlayCircle',
    slug: 'interactive-learning',
  },
]

export default async function ResourcesPage() {
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const globalData = (await fetchResourcesGlobal(locale, language)) || STATIC_RESOURCES_FALLBACK
  const cmsItems = await fetchResourceItems().catch(() => [])
  const resources = cmsItems.length > 0 ? cmsItems : STATIC_RESOURCES

  return (
    <main className="resources-page">
      <section className="resources-hero">
        <div className="resources-hero-background" aria-hidden="true" />
        <div className="resources-hero-overlay" aria-hidden="true" />

        <div className="resources-container resources-container--hero">
          <div className="resources-hero-inner">
            <div className="resources-hero-copy">
              <span className="resources-badge">
                {globalData.heroBadge || STATIC_RESOURCES_FALLBACK.heroBadge}
              </span>

              <h1 className="resources-hero-title">
                {globalData.title || STATIC_RESOURCES_FALLBACK.title}
              </h1>

              <p className="resources-hero-description">
                {globalData.intro || STATIC_RESOURCES_FALLBACK.intro}
              </p>

              <div className="resources-actions">
                <Link
                  href={localizePath('/topic', locale)}
                  className="resources-button resources-button--solid"
                >
                  {globalData.heroPrimaryLabel || STATIC_RESOURCES_FALLBACK.heroPrimaryLabel}
                </Link>
              </div>
            </div>

            <div className="resources-hero-image-wrap" aria-hidden="true">
              <Image
                src="/media/ChatGPT Image May 7, 2026, 10_17_29 AM-900x600.png"
                alt=""
                width={900}
                height={600}
                className="resources-hero-img"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="resources-section">
        <div className="resources-container resources-container--section">
          <div className="resources-section-header">
            <h2 className="resources-section-heading">
              {globalData.browseTitle || STATIC_RESOURCES_FALLBACK.browseTitle}
            </h2>

            <p className="resources-section-description">
              {globalData.browseDescription || STATIC_RESOURCES_FALLBACK.browseDescription}
            </p>
          </div>

          <div className="resources-grid">
            {resources.map((resource) => {
              const Icon = ICON_MAP[resource.icon] ?? Hospital
              const href = localizePath(`/resources/${resource.slug}`, locale)

              return (
                <Link key={resource.id} href={href} className="resource-card">
                  <div className="resource-card-icon">
                    <Icon size={28} />
                  </div>

                  <h3 className="resource-card-title">{resource.title}</h3>

                  <p className="resource-card-description">{resource.description}</p>

                  <div className="resource-card-link">Learn More →</div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="resources-emergency">
        <div className="resources-container resources-container--section">
          <div className="resources-emergency-card">
            <div className="resources-emergency-layout">
              <div className="resources-emergency-copy">
                <h3 className="resources-emergency-title">
                  {globalData.emergencyTitle || STATIC_RESOURCES_FALLBACK.emergencyTitle}
                </h3>

                <p className="resources-emergency-text">
                  {globalData.emergencyDescription ||
                    STATIC_RESOURCES_FALLBACK.emergencyDescription}
                </p>
              </div>

              <div className="resources-emergency-actions">
                <a
                  href={
                    globalData.emergencyPrimaryHref ||
                    STATIC_RESOURCES_FALLBACK.emergencyPrimaryHref
                  }
                  className="resources-call-button"
                >
                  {globalData.emergencyPrimaryLabel ||
                    STATIC_RESOURCES_FALLBACK.emergencyPrimaryLabel}
                </a>

                <a
                  href={
                    globalData.emergencySecondaryHref ||
                    STATIC_RESOURCES_FALLBACK.emergencySecondaryHref
                  }
                  className="resources-secondary-button"
                >
                  {globalData.emergencySecondaryLabel ||
                    STATIC_RESOURCES_FALLBACK.emergencySecondaryLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="resources-cta">
        <div className="resources-container resources-container--section resources-cta-inner">
          <h2 className="resources-cta-title">
            {globalData.ctaTitle || STATIC_RESOURCES_FALLBACK.ctaTitle}
          </h2>

          <p className="resources-cta-text">
            {globalData.ctaDescription || STATIC_RESOURCES_FALLBACK.ctaDescription}
          </p>

          <div className="resources-cta-actions">
            <Link
              href={localizePath(globalData.ctaHref || STATIC_RESOURCES_FALLBACK.ctaHref, locale)}
              className="resources-cta-button resources-cta-button--primary"
            >
              {globalData.ctaLabel || STATIC_RESOURCES_FALLBACK.ctaLabel}
            </Link>

            <Link
              href={localizePath(
                globalData.ctaSecondaryHref || STATIC_RESOURCES_FALLBACK.ctaSecondaryHref,
                locale,
              )}
              className="resources-cta-button resources-cta-button--secondary"
            >
              {globalData.ctaSecondaryLabel || STATIC_RESOURCES_FALLBACK.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
