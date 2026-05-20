/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import { getPayload } from 'payload'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

const withMongoRetry = <TArgs extends unknown[], TResult>(
  handler: (...args: TArgs) => Promise<TResult>,
) => {
  return async (...args: TArgs): Promise<TResult> => {
    try {
      return await handler(...args)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const shouldRetry =
        message.includes('MongoNotConnectedError') ||
        message.includes('Client must be connected before running operations') ||
        message.includes('MongoExpiredSessionError') ||
        message.includes('Cannot use a session that has ended')

      if (!shouldRetry) {
        throw error
      }

      // Re-initialize payload connection and retry once for transient dev-time disconnects.
      await getPayload({ config })

      return handler(...args)
    }
  }
}

export const GET = withMongoRetry(REST_GET(config))
export const POST = withMongoRetry(REST_POST(config))
export const DELETE = withMongoRetry(REST_DELETE(config))
export const PATCH = withMongoRetry(REST_PATCH(config))

export const PUT = withMongoRetry(REST_PUT(config))
export const OPTIONS = withMongoRetry(REST_OPTIONS(config))
