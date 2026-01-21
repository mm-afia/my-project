import { useState } from 'react'
import { MapPin, DollarSign, Star } from 'lucide-react'
import { petpals } from '../data/mockData'
import PetpalCard from '../components/PetpalCard'
import { useApp } from '../context/AppContext'

const PetpalList = () => {
  const { userLocation } = useApp()
  const [sortBy, setSortBy] = useState('distance')
  const [filters, setFilters] = useState({
    maxDistance: 10,
    maxPrice: 100,
    minRating: 0
  })

  const sortedAndFiltered = [...petpals]
    .filter(p => 
      p.distance <= filters.maxDistance &&
      p.price <= filters.maxPrice &&
      p.rating >= filters.minRating
    )
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Pet Pals Near You</h1>
        <p className="text-gray-600">Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="md:w-64 bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Distance: {filters.maxDistance} miles
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={filters.maxDistance}
                onChange={(e) => setFilters({ ...filters, maxDistance: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price: ${filters.maxPrice}/hr
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Rating: {filters.minRating > 0 ? filters.minRating.toFixed(1) : 'Any'}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">{sortedAndFiltered.length} pet pals found</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="distance">Sort by Distance</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAndFiltered.map(petpal => (
              <PetpalCard key={petpal.id} petpal={petpal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetpalList
