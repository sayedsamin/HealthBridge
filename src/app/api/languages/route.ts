import { NextResponse } from 'next/server'

import { languageOptions, locales } from '@/i18n/config'

export async function GET() {
  return NextResponse.json({
    languages: languageOptions.map((language) => ({
      ...language,
      cmsManaged: (locales as readonly string[]).includes(language.code),
    })),
  })
}
