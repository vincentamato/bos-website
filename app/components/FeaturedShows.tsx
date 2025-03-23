'use client'

import Image from 'next/image'
import Link from 'next/link'
import { urlForImage, type Show } from '@/sanity'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

interface FeaturedShowsProps {
  shows: Show[]
}

export default function FeaturedShows({ shows }: FeaturedShowsProps) {
  if (!shows || shows.length === 0) {
    return null
  }

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        el: '.custom-pagination',
        bulletClass: 'swiper-pagination-bullet !w-3 !h-3 !rounded-full !bg-white/40',
        bulletActiveClass: '!bg-white'
      }}
      navigation={{
        nextEl: '.custom-next-button',
        prevEl: '.custom-prev-button',
      }}
      loop={true}
      className="relative w-full h-[70vh] bg-black text-white"
    >
      {shows.map((show, index) => {
        const heroImageUrl = show.heroImage ? urlForImage(show.heroImage)?.toString() : null
        
        return (
          <SwiperSlide key={index} className="relative">
            {/* Background image */}
            {heroImageUrl && (
              <div className="absolute inset-0">
                <Image 
                  src={heroImageUrl}
                  alt=""
                  fill
                  priority
                  className="object-cover object-[center_30%]"
                />
              </div>
            )}
            
            {/* Content overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent">
              <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-12">
                <div className="max-w-xl">
                  <div className="inline-block bg-white/10 backdrop-blur-sm text-xs font-bold px-3 py-2 rounded mb-6">
                    Recently Added
                  </div>
                  <h2 className="text-3xl md:text-6xl font-bold mb-8 tracking-tight text-white drop-shadow-sm featured-title">
                    {show.title}
                  </h2>
                  <Link 
                    href={`/shows/${show.slug}`}
                    className="inline-flex items-center justify-center bg-white text-black px-6 py-2 rounded font-medium hover:bg-white/90 transition-colors text-sm"
                  >
                    WATCH NOW
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        )
      })}
      
      {/* Custom navigation buttons */}
      {shows.length > 1 && (
        <>
          <button 
            className="custom-prev-button absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
            aria-label="Previous show"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            className="custom-next-button absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
            aria-label="Next show"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}
      
      {/* Custom pagination */}
      {shows.length > 1 && (
        <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center space-x-2"></div>
      )}
    </Swiper>
  )
} 