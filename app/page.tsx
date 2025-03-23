import { Suspense } from 'react'
import FeaturedShows from './components/FeaturedShows'
import ShowList from './components/ShowList'
import { getShows, getFeaturedShows } from '@/sanity/lib/server'

// Hero fallback component that mimics the FeaturedShows loading state
function HeroFallback() {
  return (
    <div className="relative w-full h-[70vh] bg-[#050A14]">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050A14] via-[#0A1428] to-[#050A14] bg-[length:400%_100%] animate-shimmer" />
      
      {/* Skeleton content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <div className="max-w-xl">
            <div className="inline-block bg-white/10 backdrop-blur-sm w-24 h-6 rounded mb-6 animate-pulse" />
            <div className="h-12 w-3/4 bg-gray-700/40 rounded-md mb-6 animate-pulse" />
            <div className="h-4 w-full bg-gray-700/40 rounded-md mb-3 animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-700/40 rounded-md mb-8 animate-pulse" />
            <div className="h-10 w-32 bg-gray-700/40 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
      
      {/* Skeleton navigation buttons */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 animate-pulse">
        <div className="w-6 h-6 bg-white/30 rounded-full" />
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 animate-pulse">
        <div className="w-6 h-6 bg-white/30 rounded-full" />
      </div>
      
      {/* Skeleton pagination */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-3 h-3 rounded-full bg-white/40" />
        ))}
      </div>
    </div>
  )
}

// Show list fallback component that mimics the ShowList loading state
function ShowListFallback() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="group block">
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-[#0A1428]">
            {/* Subtle shimmering gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050A14]/20 via-[#0A1428]/20 to-[#050A14]/20 bg-[length:200%_100%] animate-shimmer-slow" />
            
            {/* Skeleton gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-50" />
          </div>
          <div className="mt-3">
            <div className="h-5 bg-[#0A1428] rounded w-3/4 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function Home() {
  const shows = await getShows()
  const featuredShows = await getFeaturedShows()

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Featured Shows Carousel (serves as hero) */}
      <Suspense fallback={<HeroFallback />}>
        <FeaturedShows shows={featuredShows} />
      </Suspense>

      {/* All Shows section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 section-header">All Shows</h2>
          <Suspense fallback={<ShowListFallback />}>
            <ShowList shows={shows} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
