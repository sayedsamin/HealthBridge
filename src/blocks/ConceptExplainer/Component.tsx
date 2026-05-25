import React from 'react'
import {
  Globe,
  HeartPulse,
  ImageOff,
  Lightbulb,
  ListChecks,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'

import type { ConceptExplainerBlock as ConceptExplainerBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const ICONS: Record<string, LucideIcon> = {
  Globe,
  HeartPulse,
  Lightbulb,
  ListChecks,
  ShieldCheck,
  Users,
}

export const ConceptExplainerBlock: React.FC<ConceptExplainerBlockProps> = (props) => {
  const { description, eyebrow, graphic, graphicAlt, points, title } = props
  const graphicResource = graphic && typeof graphic === 'object' ? graphic : null
  const fallbackGraphicUrl = graphicResource?.filename
    ? `/media/${encodeURIComponent(graphicResource.filename)}`
    : ''
  const resolvedGraphicUrl = getMediaUrl(graphicResource?.url || fallbackGraphicUrl)
  const hasGraphicUrl = Boolean(resolvedGraphicUrl)

  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-50 via-white to-teal-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 md:p-10">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_minmax(360px,460px)] xl:items-start xl:gap-12">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                {eyebrow}
              </p>
            ) : null}

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
              {title}
            </h2>

            {description ? (
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-300">
                {description}
              </p>
            ) : null}

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:max-w-none">
              {points?.map((point, index) => {
                const Icon = ICONS[point.icon ?? 'Lightbulb'] ?? Lightbulb

                return (
                  <article
                    key={point.id ?? `${point.title}-${index}`}
                    className="rounded-2xl border border-sky-100 bg-white/90 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
                  >
                    <div className="mb-3 inline-flex rounded-xl border border-sky-200 bg-sky-50 p-2 text-sky-700 dark:border-slate-600 dark:bg-slate-800 dark:text-sky-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {point.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="w-full xl:justify-self-end xl:pl-2">
            <div className="relative aspect-[4/3] min-h-[320px] overflow-hidden rounded-2xl border border-sky-100 bg-white p-2 shadow-md dark:border-slate-700 dark:bg-slate-900 xl:min-h-[420px] xl:w-[460px] xl:max-w-full">
              {hasGraphicUrl ? (
                <Media
                  htmlElement={null}
                  fill
                  loading="eager"
                  pictureClassName="relative block h-full w-full"
                  imgClassName="rounded-xl object-cover"
                  resource={
                    graphicResource
                      ? {
                          ...graphicResource,
                          url: resolvedGraphicUrl,
                          alt: graphicAlt || graphicResource.alt,
                        }
                      : graphic
                  }
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                  <ImageOff className="h-10 w-10" aria-hidden="true" />
                  <span className="sr-only">Image unavailable</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
