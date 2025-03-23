'use client'

import MuxPlayer from "@mux/mux-player-react"; 
import { Episode, Extra } from '@/sanity/lib/hooks'
import { urlForImage } from '@/sanity'
import { useState, useEffect } from 'react'

interface VideoPlayerProps {
  playbackId: string
  content: Episode | Extra
  contentType: 'episode' | 'extra'
}

export default function VideoPlayer({ playbackId, content, contentType }: VideoPlayerProps) {
  const thumbnailUrl = content.thumbnail 
    ? urlForImage(content.thumbnail)?.toString() 
    : undefined;
    
  // Use client-side only rendering to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Prepare metadata based on content type
  const metadata = {
    video_id: content._id,
    video_title: content.title,
    player_name: "BOS Player",
    show_name: content.showTitle,
    content_type: contentType,
    ...(contentType === 'episode' && (content as Episode).episodeNumber 
        ? { episode_number: (content as Episode).episodeNumber.toString() } 
        : {})
  }

  return (
    <div className="aspect-video w-full relative rounded-lg overflow-hidden shadow-lg mt-8">
      {isClient ? (
        <MuxPlayer
          playbackId={playbackId}
          accentColor="#862633" // Brown University color
          primaryColor="#ffffff"
          secondaryColor="rgba(0,0,0,0.7)"
          metadata={metadata}
          streamType="on-demand"
          poster={thumbnailUrl}
          defaultHiddenCaptions={true}
          forwardSeekOffset={10}
          backwardSeekOffset={10}
          style={{ height: '100%', maxWidth: '100%' }}
        />
      ) : (
        // Placeholder with same aspect ratio until client-side rendering
        <div 
          className="w-full h-full bg-black flex items-center justify-center"
          style={{ aspectRatio: '16/9' }}
        >
          {thumbnailUrl ? (
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
            />
          ) : (
            <div className="text-white/50">Loading player...</div>
          )}
        </div>
      )}
    </div>
  )
} 