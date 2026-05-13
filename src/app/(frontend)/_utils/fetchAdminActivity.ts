import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

export type AdminActivityItem = {
  id: string
  summary?: string | null
  action?: 'create' | 'update' | 'delete' | null
  entityScope?: 'collection' | 'global' | null
  entitySlug?: string | null
  entityTitle?: string | null
  actorName?: string | null
  createdAt: string
}

const getRecentAdminActivity = async (limit: number): Promise<AdminActivityItem[]> => {
  try {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'admin-activities',
      depth: 0,
      limit,
      sort: '-createdAt',
    })

    return result.docs as unknown as AdminActivityItem[]
  } catch {
    return []
  }
}

export const fetchRecentAdminActivity = (limit = 8): Promise<AdminActivityItem[]> =>
  unstable_cache(() => getRecentAdminActivity(limit), ['admin_activity', String(limit)], {
    tags: ['admin_activity'],
  })()
