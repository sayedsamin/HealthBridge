import type { CollectionAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateHealthTopics: CollectionAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating health topic: ${doc.slug}`)
  revalidateTag('health-topics')
  revalidateTag(`health-topic-${doc.slug}`)
  return doc
}
