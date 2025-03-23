'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { client } from './client'
import {
  showsQuery,
  featuredShowsQuery,
  showBySlugQuery,
  episodeBySlugQuery,
  extraBySlugQuery,
} from './queries'

// Type definitions
export type Show = {
  _id: string
  title: string
  slug: string
  description: string
  heroImage?: any
  cardImage: any
  credits?: any
  episodes?: Episode[]
  extras?: Extra[]
}

export type Episode = {
  _id: string
  title: string
  description?: string
  muxPlaybackId: string
  thumbnail?: any
  episodeNumber: number
  slug: string
  showTitle?: string
  showSlug?: string
}

export type Extra = {
  _id: string
  title: string
  description?: string
  muxPlaybackId: string
  thumbnail?: any
  slug: string
  showTitle?: string
  showSlug?: string
}

// Hook to fetch all shows
export function useShows() {
  const [shows, setShows] = useState<Show[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const data = await client.fetch(showsQuery)
        setShows(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch shows'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchShows()
  }, [])

  return { shows, isLoading, error }
}

// Hook to fetch featured shows
export function useFeaturedShows() {
  const [shows, setShows] = useState<Show[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchFeaturedShows = async () => {
      try {
        const data = await client.fetch(featuredShowsQuery)
        setShows(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch featured shows'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedShows()
  }, [])

  return { shows, isLoading, error }
}

// Hook to fetch a show by slug
export function useShow(slug: string) {
  const [show, setShow] = useState<Show | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchShow = async () => {
      if (!slug) return

      try {
        const data = await client.fetch(showBySlugQuery, { slug })
        setShow(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch show'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchShow()
  }, [slug])

  return { show, isLoading, error }
}

// Hook to fetch an episode by slug
export function useEpisode(episodeSlug: string) {
  const [episode, setEpisode] = useState<Episode | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchEpisode = async () => {
      if (!episodeSlug) return

      try {
        const data = await client.fetch(episodeBySlugQuery, { episodeSlug })
        setEpisode(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch episode'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchEpisode()
  }, [episodeSlug])

  return { episode, isLoading, error }
}

// Hook to fetch an extra by slug
export function useExtra(extraSlug: string) {
  const [extra, setExtra] = useState<Extra | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchExtra = async () => {
      if (!extraSlug) return

      try {
        const data = await client.fetch(extraBySlugQuery, { extraSlug })
        setExtra(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch extra'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchExtra()
  }, [extraSlug])

  return { extra, isLoading, error }
} 