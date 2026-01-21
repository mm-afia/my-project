import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, MapPin, Star, Gift } from 'lucide-react'
import { petpals } from '../data/mockData'
import PetpalCard from '../components/PetpalCard'
import { useApp } from '../context/AppContext'

const Home = () => {
  const navigate = useNavigate()
  const { points } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    maxDistance: 10,
    maxPrice: 100,
    minRating: 0,
    services: []
  })

  const filteredPetpals = petpals.filter(petpal => {
    const matchesSearch = petpal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      petpal.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDistance = petpal.distance <= filters.maxDistance
    const matchesPrice = petpal.price <= filters.maxPrice
    const matchesRating = petpal.rating >= filters.minRating
    const matchesServices = filters.services.length === 0 ||
      filters.services.some(service => petpal.services.includes(service))

    return matchesSearch && matchesDistance && matchesPrice && matchesRating && matchesServices
  })

  const allServices = [...new Set(petpals.flatMap(p => p.services))]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Your Perfect Pet Pal 🐾
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Trusted pet care professionals near you
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center bg-white rounded-full shadow-lg p-2">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input
              type="text"
              placeholder="Search by name or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 outline-none text-gray-700"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="max-w-2xl mx-auto mt-4 bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services
                </label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {allServices.map(service => (
                    <button
                      key={service}
                      onClick={() => {
                        setFilters({
                          ...filters,
                          services: filters.services.includes(service)
                            ? filters.services.filter(s => s !== service)
                            : [...filters.services, service]
                        })
                      }}
                      className={`px-3 py-1 rounded-full text-sm transition ${
                        filters.services.includes(service)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Points Banner */}
      {points > 0 && (
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Gift className="w-6 h-6" />
            <div>
              <p className="font-semibold">You have {points} points!</p>
              <p className="text-sm opacity-90">Redeem them for discounts and free services</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/rewards')}
            className="px-4 py-2 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            View Rewards
          </button>
        </div>
      )}

      {/* Featured Pet Pals */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Pet Pals ({filteredPetpals.length})
          </h2>
          <button
            onClick={() => navigate('/petpals')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View All →
          </button>
        </div>

        {filteredPetpals.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No pet pals found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setFilters({ maxDistance: 10, maxPrice: 100, minRating: 0, services: [] })
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPetpals.slice(0, 6).map(petpal => (
              <PetpalCard key={petpal.id} petpal={petpal} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
