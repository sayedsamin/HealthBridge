import { redirect } from 'next/navigation'
import { getRequestLocale } from '@/i18n/server'
import { localizePath } from '@/i18n/routing'

export default async function AboutUsPage() {
  const locale = await getRequestLocale()
  redirect(localizePath('/about', locale))
}
