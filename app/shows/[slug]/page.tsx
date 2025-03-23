import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity'
import { getShowBySlug } from '@/sanity/lib/server'
import { notFound } from 'next/navigation'
import EpisodeCard from '../../components/EpisodeCard'
import ExtraCard from '../../components/ExtraCard'
import Credits from '../../components/Credits'

interface ShowPageProps {
  params: {
    slug: string
  }
}

export default async function ShowPage({ params }: ShowPageProps) {
  // Await the params to ensure it's fully resolved before using its properties
  const resolvedParams = await Promise.resolve(params);
  const show = await getShowBySlug(resolvedParams.slug);

  if (!show) {
    notFound()
  }

  const heroImageUrl = show.heroImage 
    ? urlForImage(show.heroImage)?.toString() 
    : null

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero section with show image */}
      <div className="relative w-full h-[70vh]">
        {heroImageUrl ? (
          <Image 
            src={heroImageUrl} 
            alt={show.title} 
            fill 
            className="object-cover object-[center_30%]"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#050A14] via-[#0A1428] to-[#050A14]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Show details content */}
      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-sm featured-title">{show.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{show.description}</p>
        </div>

        {/* Episodes section */}
        {show.episodes && show.episodes.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Episodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {show.episodes.map((episode) => (
                <EpisodeCard 
                  key={episode._id} 
                  episode={{
                    ...episode,
                    showSlug: show.slug
                  }} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Extras section */}
        {show.extras && show.extras.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Extras</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {show.extras.map((extra) => (
                <ExtraCard 
                  key={extra._id} 
                  extra={{
                    ...extra,
                    showSlug: show.slug
                  }} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Credits section */}
        {show.credits && (
          <div className="mt-16 pb-16">
            <h2 className="text-2xl font-bold mb-10 pb-2 inline-block">Credits</h2>
            <div className="bg-[#0A1428]/70 backdrop-blur-md border border-[#1A2A48]/40 rounded-xl p-10 max-w-4xl shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A1428]/80 to-[#050A14]/90 mix-blend-multiply backdrop-blur-sm"></div>
              <div className="relative z-10">
                <Credits credits={show.credits} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 