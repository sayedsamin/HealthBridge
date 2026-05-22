'use client'

import Image from 'next/image'
import { Hospital } from 'lucide-react'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
}

export function ResourceHeroImage({ src, alt }: Props) {
  const [failed, setFailed] = useState(false)

  return (
    <div className="resource-detail-hero-image-frame">
      {failed ? (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <Hospital className="h-10 w-10" aria-hidden="true" />
          <span className="sr-only">Image unavailable</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="resource-detail-hero-image"
          sizes="(min-width: 768px) 26rem, 100vw"
          priority
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
