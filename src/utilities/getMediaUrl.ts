/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 *
 * Local paths (e.g. `/api/media/file/image.webp`) are kept relative so
 * Next.js image optimization treats them as local rather than fetching
 * through `remotePatterns`, which blocks private IPs since Next.js 16.
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  const toRelativeMediaPath = (value: string): string => {
    const normalizeMediaPathname = (pathname: string): string => {
      if (pathname.startsWith('/api/media/file/')) {
        return pathname.replace('/api/media/file/', '/media/')
      }

      return pathname
    }

    try {
      const parsed = new URL(value)
      if (parsed.pathname.startsWith('/api/media/file/') || parsed.pathname.startsWith('/media/')) {
        return `${normalizeMediaPathname(parsed.pathname)}${parsed.search}`
      }
      return value
    } catch {
      if (value.startsWith('/api/media/file/') || value.startsWith('/media/')) {
        const [pathname, search = ''] = value.split('?', 2)
        const normalizedPathname = normalizeMediaPathname(pathname)
        return search ? `${normalizedPathname}?${search}` : normalizedPathname
      }

      return value
    }
  }

  const normalizedUrl = toRelativeMediaPath(url)

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${normalizedUrl}?${cacheTag}` : normalizedUrl
}
