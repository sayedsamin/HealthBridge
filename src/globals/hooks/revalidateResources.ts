import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateResources: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating Resources page')
  revalidateTag('global_resources', 'max')
  revalidateTag('resources', 'max')
  return doc
}
