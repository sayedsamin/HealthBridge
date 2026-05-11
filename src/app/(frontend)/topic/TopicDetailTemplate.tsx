import Link from 'next/link'
import {
  Ambulance,
  BookOpen,
  Brain,
  Check,
  ClipboardList,
  HeartPulse,
  Hospital,
  PhoneCall,
  Shield,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from 'lucide-react'
import { slugify } from './_utils/slugify'
import { TopicSidebarButtons } from './TopicSidebarButtons'
import { defaultLocale, type Locale } from '@/i18n/config'
import { localizePath } from '@/i18n/routing'

type TopicSection = {
  title: string
  description: string
  details?: string
  keyPoints: string[]
}

type TopicDetailTemplateProps = {
  topicSlug: string
  title: string
  subtitle: string
  sidebarTitle: string
  activeSidebarLabel: string
  sidebarItems: string[]
  sections: TopicSection[]
  locale?: Locale
  videoDuration?: string
  supportPhone?: string
}

const illustrationIcons: LucideIcon[] = [
  Stethoscope,
  Hospital,
  Ambulance,
  ClipboardList,
  Brain,
  HeartPulse,
  Syringe,
  Shield,
]

function pickSectionIcon(sectionTitle: string, index: number): LucideIcon {
  const title = sectionTitle.toLowerCase()

  if (title.includes('doctor') || title.includes('clinic') || title.includes('care'))
    return Stethoscope
  if (title.includes('emergency') || title.includes('911')) return Ambulance
  if (title.includes('mental') || title.includes('stress')) return Brain
  if (title.includes('register') || title.includes('step') || title.includes('checklist')) {
    return ClipboardList
  }
  if (title.includes('vaccine') || title.includes('immun')) return Syringe
  if (title.includes('safety') || title.includes('rights')) return Shield
  return illustrationIcons[index % illustrationIcons.length]
}

export function TopicDetailTemplate({
  topicSlug,
  title,
  subtitle,
  sidebarTitle,
  activeSidebarLabel,
  sidebarItems,
  sections,
  locale = defaultLocale,
  videoDuration = '3 min',
  supportPhone = '1-888-315-9257',
}: TopicDetailTemplateProps) {
  const sectionAnchors = sections.map((section, index) => ({
    id: `topic-section-${index}`,
    title: section.title,
  }))

  return (
    <div className="grid gap-5 lg:grid-cols-[246px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-200">
            {sidebarTitle}
          </h2>
          <Link
            href={localizePath('/topic', locale)}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            &lt; Back to Topics
          </Link>
          <TopicSidebarButtons
            items={sidebarItems}
            initialActive={activeSidebarLabel}
            sectionAnchors={sectionAnchors}
          />
        </div>

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
          <h3 className="text-xl font-semibold tracking-tight text-slate-800 dark:text-slate-200">
            Need Help?
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Ask a question or chat with our support team.
          </p>
          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-300 bg-white px-3 py-2 text-sm font-semibold text-blue-700 dark:border-blue-700 dark:bg-slate-800 dark:text-blue-400"
          >
            <PhoneCall className="h-4 w-4" />
            Ask a Question
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Download Guide (PDF)
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Step-by-step guide to using healthcare in Canada.
          </p>
        </div>
      </aside>

      <section>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          </div>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Watch Overview Video
            </div>
            <div className="pl-6 text-sm font-bold text-slate-700 dark:text-slate-300">
              {videoDuration}
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {sections.map((section, index) => {
            const Icon = pickSectionIcon(section.title, index)

            return (
              <article
                key={section.title}
                id={sectionAnchors[index]?.id}
                className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[214px_minmax(0,1fr)_222px] dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 via-sky-50 to-slate-100 dark:border-slate-700 dark:from-blue-950 dark:via-sky-950 dark:to-slate-800">
                  <div className="absolute -left-8 -top-8 h-20 w-20 rounded-full bg-blue-100/70 dark:bg-blue-900/40" />
                  <div className="absolute -bottom-7 -right-8 h-20 w-20 rounded-full bg-cyan-100/70 dark:bg-cyan-900/40" />
                  <div className="z-10 rounded-2xl border border-blue-200 bg-white p-3 shadow-sm shadow-blue-100 dark:border-slate-600 dark:bg-slate-700 dark:shadow-none">
                    <Icon className="h-11 w-11 text-blue-700" strokeWidth={1.75} />
                  </div>
                </div>

                <div>
                  <h2 className="text-[33px] font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                    {index + 1}. {section.title}
                  </h2>
                  <p className="mt-1.5 text-[16px] leading-6 text-slate-600 dark:text-slate-300">
                    {section.description}
                  </p>
                  <Link
                    href={localizePath(`/topic/${topicSlug}/${slugify(section.title)}`, locale)}
                    className="mt-2 inline-flex text-sm font-semibold text-blue-700 dark:text-blue-400"
                  >
                    Learn More <span aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/30">
                  <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-400">
                    Key Points:
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-emerald-900 dark:text-emerald-300">
                    {section.keyPoints.map((point) => (
                      <li key={point} className="flex items-start gap-1.5">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 dark:border-blue-900 dark:bg-blue-950/40">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[27px] font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                Need help navigating the healthcare system?
              </p>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                Call Health Links - Info Sante 24/7 for free and confidential health advice.
              </p>
            </div>
            <p className="text-4xl font-bold tracking-tight text-blue-700">{supportPhone}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
