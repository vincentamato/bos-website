export const apiVersion = 
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-09-05'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const useCdn = process.env.NODE_ENV === 'production'

// Needed for live preview functionality
export const token = process.env.SANITY_API_TOKEN || '' 