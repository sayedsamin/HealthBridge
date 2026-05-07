import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      {/* Hero */}
      <section className="relative isolate mx-auto grid max-w-6xl gap-8 px-4 pt-6 pb-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_34rem] lg:items-center lg:pt-8 lg:pb-14 lg:px-8">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-x-0 -top-8 -z-10 h-[340px] bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50 opacity-80 blur-3xl" />

        {/* Left: copy */}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 ring-1 ring-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Culturally Responsive Health Literacy
          </span>

          <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Helping newcomers <span className="text-blue-600">navigate healthcare</span> and safety
            in Canada.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-500">
            Access health services, understand lab results, improve wellness, and find trusted
            support — in your language.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/topic"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200/60 transition-colors hover:bg-blue-700"
            >
              Explore Health Topics
            </Link>
            <Link
              href="/resources"
              className="rounded-full border border-blue-600 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Browse Resources
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            Free · Multilingual · Trusted by immigrants, students &amp; newcomers
          </p>
        </div>

        {/* Right: photo */}
        <div className="relative lg:-mr-8">
          <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-blue-100/80 via-sky-50/60 to-indigo-100/70 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5">
            <Image
              src="/hero.jpg"
              alt="Diverse group of immigrants and newcomers speaking with a healthcare professional in Canada"
              width={960}
              height={760}
              priority
              className="h-auto w-full object-cover"
            />
            {/* Canadian badge overlay */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow backdrop-blur-sm">
              <span>🍁</span> Canada-focused health guidance
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
