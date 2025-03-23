import ShowCard from './ShowCard'
import { type Show } from '@/sanity'

interface ShowListProps {
  shows: Show[]
}

export default function ShowList({ shows }: ShowListProps) {
  if (!shows || shows.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-lg text-gray-400">No shows available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {shows.map((show) => (
        <ShowCard key={show._id} show={show} />
      ))}
    </div>
  )
} 