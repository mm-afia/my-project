import { useParams, useNavigate } from 'react-router-dom'
import { Star, MapPin, DollarSign, Calendar, MessageCircle, Clock } from 'lucide-react'
import { petpals } from '../data/mockData'
import { useApp } from '../context/AppContext'

const PetpalDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { points } = useApp()
  const petpal = petpals.find(p => p.id === id)

  if (!petpal) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-500">Pet Pal not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="h-64 md:h-full bg-gradient-to-br from-primary-100 to-primary-200">
              <img
                src={petpal.image}
                alt={petpal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          </div>

          <div className="md:w-2/3 p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{petpal.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{petpal.rating}</span>
                    <span>({petpal.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-5 h-5" />
                    <span>{petpal.distance} miles away</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-5 h-5" />
                    <span>${petpal.price}/hr</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{petpal.description}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Services Offered</h3>
              <div className="flex flex-wrap gap-2">
                {petpal.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {Object.entries(petpal.availability).map(([day, times]) => (
                  <div key={day} className="bg-gray-50 p-2 rounded">
                    <div className="font-medium capitalize">{day.slice(0, 3)}</div>
                    <div className="text-gray-600 text-xs">
                      {times.start} - {times.end}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/booking/${id}`)}
                className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now</span>
              </button>
              <button
                onClick={() => navigate(`/chat/${id}`)}
                className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PetpalDetail
