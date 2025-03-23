import Image from 'next/image'
import Link from 'next/link'
import { type Show } from '@/sanity'
import { urlForImage } from '@/sanity'

interface ShowCardProps {
  show: Show
}

export default function ShowCard({ show }: ShowCardProps) {
  const imageUrl = show.cardImage ? urlForImage(show.cardImage)?.toString() : null

  return (
    <Link href={`/shows/${show.slug}`} className="group block">
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-gray-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={show.title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-700">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-white">{show.title}</h3>
            <p className="mt-1 text-sm text-gray-300">{show.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors">{show.title}</h3>
      </div>
    </Link>
  )
} 