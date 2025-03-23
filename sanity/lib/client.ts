import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

// For preview functionality
export const getClient = (preview?: { token?: string }) => {
  const client = createClient({
    apiVersion,
    dataset,
    projectId,
    useCdn: !preview,
    perspective: preview ? 'previewDrafts' : 'published',
    token: preview?.token,
  })
  return client
} 