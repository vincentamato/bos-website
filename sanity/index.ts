// Re-export from environment config
export { apiVersion, dataset, projectId, useCdn } from './env'

// Re-export from client
export { client, getClient } from './lib/client'

// Re-export from image utilities
export { urlForImage } from './lib/image'

// Re-export from queries
export {
  showsQuery,
  featuredShowsQuery,
  showBySlugQuery,
  episodeBySlugQuery,
  extraBySlugQuery,
} from './lib/queries'

// Re-export from hooks
export {
  useShows,
  useFeaturedShows,
  useShow,
  useEpisode,
  useExtra,
  type Show,
  type Episode,
  type Extra,
} from './lib/hooks'

// Re-export from server-side utilities
export {
  getShows,
  getFeaturedShows,
  getShowBySlug,
  getEpisodeBySlug,
  getExtraBySlug,
} from './lib/server'

// Re-export PortableText components
export { PortableText } from './lib/portable-text'

// Re-export schema types
export { schemaTypes } from './schemas' 