import Link from 'next/link'
import {
  ArrowRight,
  BadgePlus,
  Brain,
  ClipboardCheck,
  Filter,
  FlaskConical,
  HeartPulse,
  MessageCircleQuestion,
  Search,
  ShieldPlus,
  Stethoscope,
  Syringe,
  Users,
} from 'lucide-react'

const topics = [
  {
    id: 'understanding-canadian-healthcare',
    slug: 'healthcare-system',
    label: 'Understanding Canadian Healthcare',
    desc: 'Learn how the Canadian healthcare system works.',
    lessons: 12,
    Icon: Stethoscope,
  },
  {
    id: 'interpreting-lab-test-results',
    slug: 'healthcare-system',
    label: 'Interpreting Lab Test Results',
    desc: 'Understand common lab tests and reports.',
    lessons: 10,
    Icon: FlaskConical,
  },
  {
    id: 'nutrition-healthy-living',
    slug: 'nutrition',
    label: 'Nutrition and Healthy Living',
    desc: 'Healthy eating tips and balanced lifestyle.',
    lessons: 14,
    Icon: HeartPulse,
  },
  {
    id: 'mental-health-resources',
    slug: 'mental-health',
    label: 'Mental Health Resources',
    desc: 'Support your mental well-being.',
    lessons: 11,
    Icon: Brain,
  },
  {
    id: 'sexual-health-youth-education',
    slug: 'youth-health',
    label: 'Sexual Health and Youth Education',
    desc: 'Age-appropriate health education for youth.',
    lessons: 9,
    Icon: Users,
  },
  {
    id: 'public-health-safety-information',
    slug: 'public-health',
    label: 'Public Health and Safety Information',
    desc: 'Stay informed and safe in your community.',
    lessons: 13,
    Icon: ShieldPlus,
  },
  {
    id: 'vaccination-immunization',
    slug: 'public-health',
    label: 'Vaccination and Immunization',
    desc: 'Stay up to date on vaccines for you and your family.',
    lessons: 8,
    Icon: Syringe,
  },
  {
    id: 'health-insurance-settlement-support',
    slug: 'safety-info',
    label: 'Health Insurance and Settlement Support',
    desc: 'Understand insurance and other settlement help.',
    lessons: 7,
    Icon: ClipboardCheck,
  },
]

export default function TopicIndexPage() {
  return (
    <section className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_254px] lg:items-start">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            Health Topics Overview
          </h1>
          <p className="mt-2 text-2xl leading-snug text-slate-700">
            Explore topics to learn, understand and stay healthy.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-700 outline-none ring-blue-500 transition focus:ring-2"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 text-base font-semibold text-white hover:bg-blue-800"
            >
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl border border-blue-200 bg-white p-3 text-blue-700">
              <BadgePlus className="h-10 w-10" strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold leading-tight text-slate-900">
                Your Health Your Knowledge
              </h2>
              <p className="mt-2 text-base leading-6 text-slate-600">
                Learn today for a healthier tomorrow.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {topics.map((t) => (
          <Link
            key={t.id}
            href={`/topic/${t.slug}`}
            className="group flex min-h-[250px] flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-300"
          >
            <div className="mb-3 flex h-28 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 via-sky-50 to-slate-100">
              <t.Icon className="h-14 w-14 text-blue-700" strokeWidth={1.75} />
            </div>

            <div className="flex-1">
              <h3 className="text-[33px] font-semibold leading-tight tracking-tight text-slate-900">
                {t.label}
              </h3>
              <p className="mt-1 text-[16px] leading-6 text-slate-600">{t.desc}</p>
            </div>

            <div className="mt-3 flex items-center justify-between text-blue-700">
              <p className="text-sm font-semibold">{t.lessons} Lessons</p>
              <span className="rounded-full border border-blue-200 p-1.5 transition group-hover:bg-blue-50">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-1 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-blue-200 bg-white p-2 text-blue-700">
              <MessageCircleQuestion className="h-8 w-8" />
            </div>
            <div>
              <p className="text-[28px] font-semibold tracking-tight text-slate-900">
                Need help finding the right topic?
              </p>
              <p className="text-sm leading-6 text-slate-600">
                Use our Ask a Question tool or chat with our support team.
              </p>
            </div>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <button
              type="button"
              className="flex-1 rounded-xl border border-blue-300 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 sm:flex-none"
            >
              Ask a Question
            </button>
            <button
              type="button"
              className="flex-1 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 sm:flex-none"
            >
              Chat with Support
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
