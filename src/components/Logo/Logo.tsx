import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <div className={clsx('inline-flex items-center gap-2', className)}>
      <svg
        aria-hidden="true"
        className="h-8 w-8 text-rose-600"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 40C22.8 39.2 21.6 38.3 20.5 37.4C12.2 30.6 7 25.8 7 19C7 13.5 11.3 9 16.8 9C19.9 9 22.9 10.4 24.9 12.8C26.9 10.4 29.9 9 33 9C38.5 9 42.8 13.5 42.8 19C42.8 25.8 37.6 30.6 29.3 37.4C28.2 38.3 27 39.2 25.8 40L24.9 40.6L24 40Z"
          fill="currentColor"
        />
        <path d="M24 16V28" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M18 22H30" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        Health<span className="text-blue-600 dark:text-blue-400">Bridge</span>
      </span>
    </div>
  )
}
