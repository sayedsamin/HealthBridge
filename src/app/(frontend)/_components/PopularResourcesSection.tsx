'use client'

import Link from 'next/link'
import {
  ChevronRight,
  FileText,
  FlaskConical,
  HelpingHand,
  MessageCircleQuestion,
  Salad,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

import { localizePath } from '@/i18n/routing'
import type { Locale } from '@/i18n/config'

export type PopularResourceItem = {
  id: string
  title: string
  description: string
  href: string
  icon: string
}

const RESOURCE_ICON_MAP: Record<string, LucideIcon> = {
  FlaskConical,
  Salad,
  HelpingHand,
  FileText,
  ShieldCheck,
  MessageCircleQuestion,
}

export const DEFAULT_POPULAR_RESOURCES: PopularResourceItem[] = [
  {
    id: 'lab-tests',
    title: 'Lab Test Explained',
    description: 'Understand your lab results with simple breakdowns.',
    href: '/posts',
    icon: 'FlaskConical',
  },
  {
    id: 'nutrition-guides',
    title: 'Nutrition Tips',
    description: 'Healthy food choices for individuals and families.',
    href: '/posts',
    icon: 'Salad',
  },
  {
    id: 'community-support',
    title: 'Community Support',
    description: 'Find local services and settlement support resources.',
    href: '/search',
    icon: 'HelpingHand',
  },
  {
    id: 'forms-and-documents',
    title: 'Forms and Documents',
    description: 'Access key forms and healthcare documents quickly.',
    href: '/search',
    icon: 'FileText',
  },
  {
    id: 'safety-info',
    title: 'Safety Information',
    description: 'Learn what to do in urgent and non-urgent situations.',
    href: '/topic/safety-info',
    icon: 'ShieldCheck',
  },
  {
    id: 'ask-questions',
    title: 'Ask a Question',
    description: 'Browse answers to common health and newcomer questions.',
    href: '/search',
    icon: 'MessageCircleQuestion',
  },
]

type Props = {
  locale: Locale
  heading?: string
  description?: string
  viewAllLabel?: string
  viewAllUrl?: string
  resources?: PopularResourceItem[]
  className?: string
}

export function PopularResourcesSection({
  locale,
  heading = 'Popular Resources',
  description = 'Quick links to trusted health resources and support tools.',
  viewAllLabel = 'View all resources',
  viewAllUrl = '/posts',
  resources,
  className = 'mt-8',
}: Props) {
  const effectiveResources =
    (resources || []).length > 0 ? resources || [] : DEFAULT_POPULAR_RESOURCES

  return (
    <div className={className}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {heading}
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>
        </div>
        <Link
          href={localizePath(viewAllUrl, locale)}
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {viewAllLabel}
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {effectiveResources.map(({ id, title, description: itemDescription, href, icon }) => {
          const Icon = RESOURCE_ICON_MAP[icon] || FileText

          return (
            <Link
              key={id}
              href={localizePath(href, locale)}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    {itemDescription}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
