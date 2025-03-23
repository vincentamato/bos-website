import { groq } from 'next-sanity'

// Query to get all shows
export const showsQuery = groq`
  *[_type == "show"] | order(title asc) {
    _id,
    title,
    description,
    "slug": slug.current,
    cardImage
  }
`

// Query to get featured shows
export const featuredShowsQuery = groq`
  *[_type == "show" && isFeatured == true] | order(title asc) {
    _id,
    title,
    description,
    "slug": slug.current,
    heroImage
  }
`

// Query to get a single show by slug with episodes
export const showBySlugQuery = groq`
  *[_type == "show" && slug.current == $slug][0] {
    _id,
    title,
    description,
    heroImage,
    cardImage,
    credits,
    "slug": slug.current,
    "episodes": *[_type == "episode" && show._ref == ^._id] | order(episodeNumber asc) {
      _id,
      title,
      description,
      muxPlaybackId,
      thumbnail,
      episodeNumber,
      "slug": slug.current
    },
    "extras": *[_type == "extra" && show._ref == ^._id] | order(title asc) {
      _id,
      title,
      description,
      muxPlaybackId,
      thumbnail,
      "slug": slug.current
    }
  }
`

// Query to get a single episode by show slug and episode slug
export const episodeBySlugQuery = groq`
  *[_type == "episode" && slug.current == $episodeSlug][0] {
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

// Query to get a single extra by show slug and extra slug
export const extraBySlugQuery = groq`
  *[_type == "extra" && slug.current == $extraSlug][0] {
    _id,
    title,
    description,
    muxPlaybackId,
    thumbnail,
    "slug": slug.current,
    "showTitle": show->title,
    "showSlug": show->slug.current
  }
` 