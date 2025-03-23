import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/sanity'
import type { Episode } from '@/sanity'

interface EpisodeCardProps {
  episode: Episode & {
    showSlug: string
  }
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const thumbnailUrl = episode.thumbnail 
    ? urlForImage(episode.thumbnail)?.toString() 
    : null

  return (
    <Link 
      href={`/shows/${episode.showSlug}/episodes/${episode.slug}`} 
      className="group bg-[#0A1428]/70 backdrop-blur-md rounded-lg overflow-hidden block transition-all duration-300 hover:bg-[#0A1428]/90 border border-[#1A2A48]/40 hover:border-white/20 h-full flex flex-col shadow-lg relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1428]/80 to-[#050A14]/90 mix-blend-multiply backdrop-blur-sm opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
      
      <div className="aspect-video relative overflow-hidden rounded-t-lg z-10">
        {thumbnailUrl ? (
          <Image 
            src={thumbnailUrl} 
            alt={episode.title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#050A14]">
            <span className="text-gray-400">No thumbnail</span>
          </div>
        )}
        
        {/* Episode number badge */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-md">
          Episode {episode.episodeNumber}
        </div>
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-5 flex flex-col flex-grow relative z-10">
        <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors duration-300">{episode.title}</h3>
        
        {episode.description && (
          <div className="mt-3 prose prose-sm prose-invert max-w-none opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-gray-300">{episode.description}</p>
          </div>
        )}
        
        <div className="mt-auto pt-4 flex justify-end items-center">
          <div className="inline-flex items-center text-sm text-white/80 font-medium group-hover:text-white transition-colors duration-300">
            Watch
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
} 