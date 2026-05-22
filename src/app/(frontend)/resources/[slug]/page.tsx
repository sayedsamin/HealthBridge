import type { Metadata } from 'next'
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

import Link from 'next/link'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import { defaultLocale, type Locale } from '@/i18n/config'
import { getRequestLanguage, getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'
import type { Page } from '@/payload-types'
import { translateContentDeep } from '@/utilities/translateContent'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { ResourceHeroImage } from './ResourceHeroImage'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

type HelpfulLink = {
  id?: string | null
  label?: string | null
  href?: string | null
  description?: string | null
}

type ResourceDetail = {
  id: string
  title: string
  slug: string
  description: string
  detailIntro?: string
  detailContent?: unknown
  resourceLayout?: Page['layout'][0][] | null
  heroImage?: { url?: string; alt?: string } | null
  helpfulLinks?: HelpfulLink[] | null
  icon?: string
}

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

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const resources = await payload.find({
    collection: 'resource-items',
    draft: false,
    locale: defaultLocale,
    fallbackLocale: defaultLocale,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return resources.docs
    .map(({ slug }) => ({ slug: typeof slug === 'string' ? slug : '' }))
    .filter((item) => item.slug.length > 0)
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const decodedSlug = decodeURIComponent(slug)

  const resource = await queryResourceBySlug({
    slug: decodedSlug,
    locale,
    targetLanguage: language,
  })

  return {
    title: resource ? `${resource.title} | Resources` : 'Resource | Resources',
    description: resource?.detailIntro || resource?.description || undefined,
  }
}

export default async function ResourceDetailPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const locale = await getRequestLocale()
  const language = await getRequestLanguage()
  const decodedSlug = decodeURIComponent(slug)
  const url = `/resources/${decodedSlug}`

  const resource = await queryResourceBySlug({
    slug: decodedSlug,
    locale,
    targetLanguage: language,
  })

  if (!resource) {
    return <PayloadRedirects url={url} />
  }

  const Icon = ICON_MAP[resource.icon || ''] ?? Hospital
  const hasHelpfulLinks = Array.isArray(resource.helpfulLinks) && resource.helpfulLinks.length > 0

  return (
    <main className="resource-detail-page">
      <section className="resource-detail-hero">
        <div className="resources-container resources-container--section">
          <nav aria-label="Breadcrumb" className="resource-detail-breadcrumbs">
            <Link
              href={localizePath('/resources', locale)}
              className="resource-detail-breadcrumb-link"
            >
              Resources
            </Link>
            <span aria-hidden="true" className="resource-detail-breadcrumb-separator">
              /
            </span>
            <span className="resource-detail-breadcrumb-current">{resource.title}</span>
          </nav>

          <div className="resource-detail-title-wrap">
            <div className="resource-detail-icon" aria-hidden="true">
              <Icon size={28} />
            </div>
            <h1 className="resource-detail-title">{resource.title}</h1>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="resource-detail-intro">
                {resource.detailIntro || resource.description}
              </p>
            </div>
            {resource.heroImage && resource.heroImage.url && (
              <div className="resource-detail-hero-image-wrap">
                <ResourceHeroImage
                  src={resource.heroImage.url}
                  alt={resource.heroImage.alt || resource.title}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="resource-detail-body">
        <div className="resources-container resources-container--section">
          <div className="resource-detail-main resource-detail-main--wide">
            {Array.isArray(resource.resourceLayout) && resource.resourceLayout.length > 0 ? (
              <div className="resource-detail-richtext max-w-none">
                <RenderBlocks blocks={resource.resourceLayout} locale={locale} />
              </div>
            ) : resource.detailContent ? (
              <RichText
                className="resource-detail-richtext max-w-none"
                data={resource.detailContent as Parameters<typeof RichText>[0]['data']}
                enableGutter={false}
              />
            ) : (
              <p className="resource-detail-empty">
                Detailed content is coming soon for this resource.
              </p>
            )}
          </div>

          {hasHelpfulLinks && (
            <section className="resource-detail-links-section" aria-label="Helpful links">
              <aside
                className="resource-detail-aside resource-detail-aside--wide"
                aria-label="Helpful links"
              >
                <h2 className="resource-detail-aside-title">Helpful links</h2>
                <ul className="resource-detail-link-list resource-detail-link-list--cards">
                  {(resource.helpfulLinks || []).map((link) => {
                    const href = link?.href || ''
                    const label = link?.label || 'Open resource'
                    const isExternal = href.startsWith('http://') || href.startsWith('https://')

                    if (!href) return null

                    return (
                      <li
                        key={link?.id || `${label}-${href}`}
                        className="resource-detail-link-item resource-detail-link-item--card"
                      >
                        <a
                          href={href}
                          className="resource-detail-link"
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noreferrer noopener' : undefined}
                        >
                          {label}
                        </a>

                        {link?.description && (
                          <p className="resource-detail-link-description">{link.description}</p>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </aside>
            </section>
          )}
        </div>
      </section>
    </main>
  )
}

const queryResourceBySlug = cache(
  async ({
    slug,
    locale,
    targetLanguage,
  }: {
    slug: string
    locale: Locale
    targetLanguage: string
  }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'resource-items',
      depth: 2,
      locale,
      fallbackLocale: defaultLocale,
      draft: false,
      limit: 1,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    const resource = result.docs?.[0] || null
    if (!resource) return null

    const translated = await translateContentDeep(resource, targetLanguage)
    const translatedRecord = translated as Record<string, unknown>

    const heroImageData = translated.heroImage
    const heroImage = heroImageData
      ? {
          url:
            typeof heroImageData === 'object' && heroImageData !== null && 'url' in heroImageData
              ? getMediaUrl(heroImageData.url as string | undefined)
              : undefined,
          alt:
            typeof heroImageData === 'object' && heroImageData !== null && 'alt' in heroImageData
              ? (heroImageData.alt as string | undefined)
              : undefined,
        }
      : null

    return {
      id: String(translated.id),
      title: typeof translated.title === 'string' ? translated.title : '',
      slug: typeof translated.slug === 'string' ? translated.slug : '',
      description: typeof translated.description === 'string' ? translated.description : '',
      detailIntro: typeof translated.detailIntro === 'string' ? translated.detailIntro : undefined,
      detailContent: translated.detailContent,
      resourceLayout: Array.isArray(translatedRecord.resourceLayout)
        ? (translatedRecord.resourceLayout as Page['layout'][0][])
        : null,
      heroImage: heroImage ? heroImage : undefined,
      helpfulLinks: Array.isArray(translated.helpfulLinks)
        ? translated.helpfulLinks.map((link) => ({
            id: typeof link?.id === 'string' ? link.id : null,
            label: typeof link?.label === 'string' ? link.label : null,
            href: typeof link?.href === 'string' ? link.href : null,
            description: typeof link?.description === 'string' ? link.description : null,
          }))
        : null,
      icon: typeof translated.icon === 'string' ? translated.icon : 'Hospital',
    } satisfies ResourceDetail
  },
)
