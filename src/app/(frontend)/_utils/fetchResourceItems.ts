import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type ResourceItem = {
  id: string
  title: string
  slug: string
  description: string
  icon: string
  order?: number | null
}

const fetchResourceItemsRaw = async (): Promise<ResourceItem[]> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'resource-items',
    limit: 100,
    sort: 'order',
    depth: 0,
  })

  return result.docs.map((doc) => ({
    id: String(doc.id),
    title: typeof doc.title === 'string' ? doc.title : '',
    slug: typeof doc.slug === 'string' ? doc.slug : '',
    description: typeof doc.description === 'string' ? doc.description : '',
    icon: typeof doc.icon === 'string' ? doc.icon : 'Hospital',
    order: typeof doc.order === 'number' ? doc.order : null,
  }))
}

export const fetchResourceItems = unstable_cache(fetchResourceItemsRaw, ['resource-items'], {
  tags: ['resource-items'],
  revalidate: 3600,
})
