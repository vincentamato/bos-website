import { client } from './client'
import {
  showsQuery,
  featuredShowsQuery,
  showBySlugQuery,
  episodeBySlugQuery,
  extraBySlugQuery,
} from './queries'
import { Show, Episode, Extra } from './hooks'

// Server-side function to fetch all shows
export async function getShows(): Promise<Show[]> {
  return await client.fetch(showsQuery)
}

// Server-side function to fetch featured shows
export async function getFeaturedShows(): Promise<Show[]> {
  return await client.fetch(featuredShowsQuery)
}

// Server-side function to fetch a show by slug
export async function getShowBySlug(slug: string): Promise<Show | null> {
  return await client.fetch(showBySlugQuery, { slug })
}

// Server-side function to fetch an episode by slug
export async function getEpisodeBySlug(episodeSlug: string): Promise<Episode | null> {
  return await client.fetch(episodeBySlugQuery, { episodeSlug })
}

// Server-side function to fetch an episode with adjacent episodes
export async function getEpisodeWithNavigation(episodeSlug: string): Promise<{
  episode: Episode | null,
  prevEpisode: Episode | null,
  nextEpisode: Episode | null
}> {
  const episode = await getEpisodeBySlug(episodeSlug)
  
  if (!episode) {
    return { episode: null, prevEpisode: null, nextEpisode: null }
  }
  
  // Fetch all episodes for the show
  const query = `
    *[_type == "episode" && show._ref == *[_type == "episode" && slug.current == $episodeSlug][0].show._ref] | order(episodeNumber asc) {
      _id,
      title,
      description,
      muxPlaybackId,
      thumbnail,
      episodeNumber,
      "slug": slug.current,
      "showTitle": show->title,
      "showSlug": show->slug.current
    }
  `
  
  const allEpisodes = await client.fetch(query, { episodeSlug })
  
  // Find current episode index
  const currentIndex = allEpisodes.findIndex((ep: Episode) => ep.slug === episodeSlug)
  
  // Get previous and next episodes
  const prevEpisode = currentIndex > 0 ? allEpisodes[currentIndex - 1] : null
  const nextEpisode = currentIndex < allEpisodes.length - 1 ? allEpisodes[currentIndex + 1] : null
  
  return {
    episode,
    prevEpisode,
    nextEpisode
  }
}

// Server-side function to fetch an extra by slug
export async function getExtraBySlug(extraSlug: string): Promise<Extra | null> {
  return await client.fetch(extraBySlugQuery, { extraSlug })
} 