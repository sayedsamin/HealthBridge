import { NextResponse } from 'next/server'

import { defaultLocale, isCmsLocale } from '@/i18n/config'
import { translateContentDeep } from '@/utilities/translateContent'

type TranslateRequest = {
  text?: string
  content?: unknown
  targetLanguage?: string
}

export async function POST(request: Request) {
  let payload: TranslateRequest

  try {
    payload = (await request.json()) as TranslateRequest
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const targetLanguage = payload.targetLanguage?.trim().toLowerCase()

  if (!targetLanguage) {
    return NextResponse.json({ error: 'targetLanguage is required.' }, { status: 400 })
  }

  if (targetLanguage === defaultLocale || isCmsLocale(targetLanguage)) {
    return NextResponse.json({
      translatedText: payload.text ?? null,
      translatedContent: payload.content ?? null,
      source: 'cms-or-default',
    })
  }

  if (typeof payload.text === 'string') {
    const translatedText = await translateContentDeep(payload.text, targetLanguage)
    return NextResponse.json({ translatedText })
  }

  if (payload.content !== undefined) {
    const translatedContent = await translateContentDeep(payload.content, targetLanguage)
    return NextResponse.json({ translatedContent })
  }

  return NextResponse.json(
    { error: 'Provide either text or content in request body.' },
    { status: 400 },
  )
}
