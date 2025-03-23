import { getEpisodeBySlug } from '@/sanity/lib/server'
import { notFound } from 'next/navigation'
import VideoPlayer from '@/app/components/VideoPlayer'
import ShareButton from '@/app/components/ShareButton'
import Link from 'next/link'

// Next.js 15 page props type
type PageProps = {
  params: Promise<any>;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function EpisodePage({ params }: PageProps) {
  // In Next.js 15, we need to await the params
  const resolvedParams = await params;
  const { slug, episodeSlug } = resolvedParams;
  
  const episode = await getEpisodeBySlug(episodeSlug)
  
  // If episode doesn't exist or belongs to a different show, return 404
  if (!episode || episode.showSlug !== slug) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero section with video player */}
      <div className="w-full max-w-[1600px] mx-auto pt-8 md:pt-12">
        <div className="relative pb-2 md:pb-4">
          <VideoPlayer 
            playbackId={episode.muxPlaybackId} 
            content={episode} 
            contentType="episode" 
          />
          
          {/* Play indicator overlay that disappears on interaction */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content section */}
      <div className="container mx-auto px-4 py-6">
        {/* Compact navigation */}
        <div className="flex items-center text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-white transition-colors">BOS</Link>
          <span className="mx-1.5">•</span>
          <Link href={`/shows/${episode.showSlug}`} className="hover:text-white transition-colors">{episode.showTitle}</Link>
          <span className="mx-1.5">•</span>
          <span className="text-white">{episode.title}</span>
        </div>
        
        {/* Title and metadata row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{episode.title}</h1>
            <div className="flex items-center mt-2 text-sm text-gray-400">
              <span className="text-white bg-[#1A2A48] px-2 py-0.5 rounded text-xs font-medium mr-3">
                Episode {episode.episodeNumber}
              </span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex space-x-3 mt-4 md:mt-0">
            <ShareButton 
              title={`${episode.showTitle}: ${episode.title}`} 
            />
          </div>
        </div>
        
        {/* Description in a card-like container */}
        {episode.description && (
          <div className="bg-[#0A1428]/70 backdrop-blur-md rounded-xl p-5 border border-[#1A2A48]/40 mb-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1428]/80 to-[#050A14]/90 mix-blend-multiply backdrop-blur-sm"></div>
            <div className="relative z-10">
              <h2 className="text-lg font-medium mb-3">About This Episode</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{episode.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 