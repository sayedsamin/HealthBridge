import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateAbout: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info(`Revalidating About page`)
  revalidateTag('global_about', 'max')
  revalidateTag('about', 'max')
  return doc
}
