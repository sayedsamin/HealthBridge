import React from 'react'

export default function TopicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1360px] px-4 py-10 sm:px-6 lg:px-8">
      <main className="min-w-0">{children}</main>
    </div>
  )
}
