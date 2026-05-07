import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-white">
      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden">
        {/* Background image */}
        <div className="hero-bg-image absolute inset-0 -z-20" aria-hidden="true" />

        {/* Left-to-right flow overlays: brighter left content zone, stronger right intensity */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-blue-50/95 via-blue-50/74 via-42% to-blue-900/24"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[54%] bg-gradient-to-l from-blue-900/32 via-blue-700/16 to-transparent"
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
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 ring-1 ring-blue-200">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Culturally Responsive Health Literacy
          </span>

          <div className="mt-6 max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-[1.03] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Helping newcomers <span className="text-blue-600">navigate healthcare</span> and
              safety in Canada.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
              Access health services, understand lab results, improve wellness, and find trusted
              support - in your language.
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

            <p className="mt-6 text-xs text-slate-500">
              Free · Multilingual · Trusted by immigrants, students &amp; newcomers
            </p>
          </div>
        </div>

        {/* Canadian badge overlay */}
        <div className="absolute bottom-4 right-4 z-10 hidden items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow backdrop-blur-sm sm:flex">
          <span>🍁</span> Canada-focused health guidance
        </div>
      </section>
    </main>
  )
}
