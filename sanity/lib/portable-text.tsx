import { PortableText as PortableTextComponent } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { Image } from 'sanity'
import { urlForImage } from './image'

// Define custom components for PortableText rendering
const components = {
  block: {
    h1: ({children}: any) => <h1 className="text-[22px] font-extrabold text-white mb-2 border-b border-white/10 pb-1">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-[22px] font-extrabold text-white mb-2 border-b border-white/10 pb-1">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-[22px] font-extrabold text-white mb-2 border-b border-white/10 pb-1">{children}</h3>,
    h4: ({children}: any) => <h4 className="text-[22px] font-extrabold text-white mb-2 border-b border-white/10 pb-1">{children}</h4>,
    h5: ({children}: any) => <h5 className="text-[22px] font-extrabold text-white mb-2 border-b border-white/10 pb-1">{children}</h5>,
    h6: ({children}: any) => <h6 className="text-[22px] font-extrabold text-white mb-2 border-b border-white/10 pb-1">{children}</h6>,
    normal: ({children}: any) => <p className="text-gray-300 text-[18px] leading-relaxed font-normal mb-6">{children}</p>,
  },
  marks: {
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }: { value: Image }) => {
      const imageUrl = urlForImage(value)
      if (!imageUrl) {
        return null
      }
      
      // Ensure alt is a string
      const altText = typeof value.alt === 'string' ? value.alt : 'Image'
      
      return (
        <img
          src={imageUrl.toString()}
          alt={altText}
          loading="lazy"
          className="rounded-md my-4 max-w-full"
        />
      )
    },
  },
}

// Portable Text component that handles Sanity's portable text format
export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableTextComponent value={value} components={components} />
} 