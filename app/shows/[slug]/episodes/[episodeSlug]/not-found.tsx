import Link from 'next/link'

export default function EpisodeNotFound() {
  return (
    <div className="min-h-screen bg-[#050A14] text-white flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Episode Not Found</h1>
        <p className="text-xl text-gray-400 mb-8">
          The episode you are looking for doesn't exist or has been removed.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 