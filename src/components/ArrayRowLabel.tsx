'use client'

import type { RowLabelComponent } from 'payload'

export const ArrayRowLabel: RowLabelComponent = ({ data, index }) => {
  const label = data?.title || data?.name || `Item ${index + 1}`
  return <div>{label}</div>
}
