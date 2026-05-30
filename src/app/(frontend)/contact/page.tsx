import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | HealthBridge',
  description:
    'Contact HealthBridge for help with health topics, resources, and newcomer support in Canada.',
}

export default function ContactPage() {
  return (
    <main className="border-t border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl dark:text-white">
              Have a Question
              <br />
              Instead?
            </h1>
            <p className="mt-5 max-w-xl text-2xl leading-10 text-slate-700 dark:text-slate-300">
              Send us a message below and our team will get back to you.
            </p>

            <div className="mt-7 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-amber-400">Email</h2>
                <p className="mt-1 text-2xl text-slate-700 dark:text-slate-300">
                  support@healthbridge.ca
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-amber-400">HealthBridge</h2>
                <p className="mt-1 text-2xl leading-10 text-slate-700 dark:text-slate-300">
                  Based in Winnipeg, Canada
                  <br />
                  Supporting newcomers and families across Canada
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-amber-400">Support Focus</h2>
                <p className="mt-1 text-2xl text-slate-700 dark:text-slate-300">
                  Health topics · Resources · Safety navigation
                </p>
              </div>
            </div>
          </div>

          <form
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:pt-6"
            action="#"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-first-name"
                  className="mb-2 block text-xl text-slate-700 dark:text-slate-200"
                >
                  First Name
                </label>
                <input
                  id="contact-first-name"
                  name="firstName"
                  type="text"
                  className="h-16 w-full rounded-lg border border-slate-200 bg-white px-4 text-xl text-slate-800 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-last-name"
                  className="mb-2 block text-xl text-slate-700 dark:text-slate-200"
                >
                  Last Name
                </label>
                <input
                  id="contact-last-name"
                  name="lastName"
                  type="text"
                  className="h-16 w-full rounded-lg border border-slate-200 bg-white px-4 text-xl text-slate-800 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-email"
                className="mb-2 block text-xl text-slate-700 dark:text-slate-200"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className="h-16 w-full rounded-lg border border-slate-200 bg-white px-4 text-xl text-slate-800 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="contact-message"
                className="mb-2 block text-xl text-slate-700 dark:text-slate-200"
              >
                Your Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-xl text-slate-800 outline-none ring-blue-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex h-14 items-center rounded-full bg-blue-600 px-8 text-xl font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
