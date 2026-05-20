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
import { getTopicAccent } from './_utils/topicVisuals'
import { TopicSidebarButtons } from './TopicSidebarButtons'
import { defaultLocale, type Locale } from '@/i18n/config'
import { localizePath } from '@/i18n/routing'

const PlayBadgeIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="h-3.5 w-3.5 fill-current"
    focusable="false"
  >
    <path d="M4.75 3.75v8.5a.75.75 0 0 0 1.14.64l6.5-4.25a.75.75 0 0 0 0-1.28l-6.5-4.25a.75.75 0 0 0-1.14.64Z" />
  </svg>
)

type TopicSection = {
  title: string
  description: string
  detailPageSlug: string
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
  videoUrl?: string
  guideUrl?: string
  guideLabel?: string
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
  videoUrl,
  guideUrl,
  guideLabel,
  supportPhone = '1-888-315-9257',
}: TopicDetailTemplateProps) {
  const topicAccent = getTopicAccent(topicSlug)
  const sectionAnchors = sections.map((section, index) => ({
    id: `topic-section-${index}`,
    title: section.title,
  }))

  return (
    <div className="grid gap-5 lg:grid-cols-[246px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
          <h2
            className={`text-2xl font-semibold tracking-tight ${topicAccent.arrow} dark:text-white`}
          >
            {sidebarTitle}
          </h2>
          <Link
            href={localizePath('/topic', locale)}
            className={`mt-2 inline-flex items-center gap-1 text-sm font-semibold ${topicAccent.arrow}`}
          >
            &lt; Back to Topics
          </Link>
          <TopicSidebarButtons
            items={sidebarItems}
            initialActive={activeSidebarLabel}
            sectionAnchors={sectionAnchors}
          />
        </div>

        <div className={`rounded-2xl border p-4 ${topicAccent.panel} border-transparent`}>
          <h3
            className={`text-xl font-semibold tracking-tight ${topicAccent.arrow} dark:text-white`}
          >
            Need Help?
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Ask a question or chat with our support team.
          </p>
          <button
            type="button"
            className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm font-semibold shadow-sm ${topicAccent.arrow} border-white/70 dark:bg-slate-900/40 dark:border-white/10`}
          >
            <PhoneCall className="h-4 w-4" />
            Ask a Question
          </button>
        </div>

        {guideUrl ? (
          <a
            href={guideUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className={`block rounded-2xl border p-4 transition-opacity hover:opacity-90 ${topicAccent.panel} border-transparent`}
          >
            <h3
              className={`flex items-center gap-1.5 text-sm font-semibold ${topicAccent.arrow} dark:text-white`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 fill-current shrink-0"
                focusable="false"
              >
                <path d="M7.25 1a.75.75 0 0 1 1.5 0v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V1ZM2.5 13.25a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75Z" />
              </svg>
              {guideLabel || 'Download Guide'}
              <span className="ml-auto rounded bg-white/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:bg-white/10 dark:text-slate-400">
                PDF
              </span>
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Step-by-step guide to using healthcare in Canada.
            </p>
          </a>
        ) : (
          <div className={`rounded-2xl border p-4 ${topicAccent.panel} border-transparent`}>
            <h3
              className={`flex items-center gap-1.5 text-sm font-semibold ${topicAccent.arrow} dark:text-white`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 fill-current shrink-0"
                focusable="false"
              >
                <path d="M7.25 1a.75.75 0 0 1 1.5 0v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V1ZM2.5 13.25a.75.75 0 0 1 .75-.75h9.5a.75.75 0 0 1 0 1.5h-9.5a.75.75 0 0 1-.75-.75Z" />
              </svg>
              Download Guide
              <span className="ml-auto rounded bg-white/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:bg-white/10 dark:text-slate-400">
                PDF
              </span>
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Step-by-step guide to using healthcare in Canada.
            </p>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Coming soon</p>
          </div>
        )}
      </aside>

      <section>
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1
              className={`max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl ${topicAccent.arrow} dark:text-white`}
            >
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {subtitle}
            </p>
          </div>
          {videoUrl ? (
            <Link
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl border px-5 py-4 text-sm font-semibold transition-opacity hover:opacity-90 ${topicAccent.panel} border-transparent`}
            >
              <div className="flex items-center gap-2">
                <PlayBadgeIcon />
                Watch Overview Video
              </div>
              <div className={`pl-6 text-sm font-bold ${topicAccent.arrow} dark:text-white`}>
                {videoDuration}
              </div>
            </Link>
          ) : (
            <div
              className={`rounded-2xl border px-5 py-4 text-sm font-semibold ${topicAccent.panel} border-transparent`}
            >
              <div className="flex items-center gap-2">
                <PlayBadgeIcon />
                Watch Overview Video
              </div>
              <div className={`pl-6 text-sm font-bold ${topicAccent.arrow} dark:text-white`}>
                {videoDuration}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2.5">
          {sections.map((section, index) => {
            const Icon = pickSectionIcon(section.title, index)

            return (
              <article
                key={section.title}
                id={sectionAnchors[index]?.id}
                className={`grid gap-3 rounded-2xl border bg-white p-3 shadow-sm transition-colors md:grid-cols-[214px_minmax(0,1fr)_222px] dark:bg-slate-800 ${topicAccent.card}`}
              >
                <div
                  className={`relative flex h-28 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${topicAccent.panel}`}
                >
                  <div className="absolute -left-8 -top-8 h-20 w-20 rounded-full bg-white/30 dark:bg-white/10" />
                  <div className="absolute -bottom-7 -right-8 h-20 w-20 rounded-full bg-white/40 dark:bg-white/10" />
                  <div className={`z-10 rounded-full border p-4 shadow-sm ${topicAccent.frame}`}>
                    <Icon className="h-11 w-11" strokeWidth={1.75} />
                  </div>
                </div>

                <div>
                  <h2 className="text-[33px] font-semibold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                    {index + 1}. {section.title}
                  </h2>
                  <p className="mt-1.5 text-[16px] leading-6 text-slate-600 dark:text-slate-300">
                    {section.description}
                  </p>
                  {section.detailPageSlug ? (
                    <Link
                      href={localizePath(`/${encodeURIComponent(section.detailPageSlug)}`, locale)}
                      className={`mt-2 inline-flex text-sm font-semibold ${topicAccent.arrow}`}
                    >
                      Learn More <span aria-hidden="true">→</span>
                    </Link>
                  ) : (
                    <span className="mt-2 inline-flex text-sm font-semibold text-slate-400 dark:text-slate-500">
                      Learn More <span aria-hidden="true">→</span>
                    </span>
                  )}
                </div>

                <div className={`rounded-xl border p-3 ${topicAccent.panel} border-transparent`}>
                  <h3 className={`text-sm font-semibold ${topicAccent.arrow} dark:text-white`}>
                    Key Points:
                  </h3>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
                    {section.keyPoints.map((point) => (
                      <li key={point} className="flex items-start gap-1.5">
                        <Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${topicAccent.arrow}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>

        <div
          className={`mt-4 rounded-2xl border px-5 py-4 ${topicAccent.panel} border-transparent`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p
                className={`text-[27px] font-semibold leading-tight tracking-tight ${topicAccent.arrow} dark:text-white`}
              >
                Need help navigating the healthcare system?
              </p>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                Call Health Links - Info Sante 24/7 for free and confidential health advice.
              </p>
            </div>
            <p className={`text-4xl font-bold tracking-tight ${topicAccent.arrow}`}>
              {supportPhone}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
