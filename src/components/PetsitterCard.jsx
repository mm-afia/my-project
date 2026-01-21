import { Link } from 'react-router-dom'
import { Star, MapPin, DollarSign } from 'lucide-react'

const PetpalCard = ({ petpal }) => {
  return (
    <Link to={`/petpal/${petpal.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
          <img
            src={petpal.image}
            alt={petpal.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{petpal.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{petpal.rating}</span>
              <span className="text-xs text-gray-500">({petpal.reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{petpal.distance} mi</span>
            </div>
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span>${petpal.price}/hr</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {petpal.services.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
              >
                {service}
              </span>
            ))}
            {petpal.services.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{petpal.services.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PetpalCard
