import { useState } from 'react'
import { Calendar, Clock, DollarSign, Star, MessageCircle, MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { petpals } from '../data/mockData'

const MyBookings = () => {
  const { bookings } = useApp()
  const navigate = useNavigate()
  const [rating, setRating] = useState({})
  const [showRating, setShowRating] = useState({})

  const handleRate = (bookingId, ratingValue) => {
    setRating({ ...rating, [bookingId]: ratingValue })
    setShowRating({ ...showRating, [bookingId]: false })
    alert('Thank you for your rating!')
  }

  const getPetpal = (petpalId) => {
    return petpals.find(p => p.id === petpalId)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">No bookings yet</p>
          <button
            onClick={() => navigate('/petpals')}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Find a Pet Pal
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => {
            const petpal = getPetpal(booking.petpalId)
            if (!petpal) return null

            return (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex space-x-4 mb-4 md:mb-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                      <img
                        src={petpal.image}
                        alt={petpal.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {booking.petpalName}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(booking.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time} ({booking.duration} hours)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{petpal.distance} miles away</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs">
                            {booking.package}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${booking.totalPrice.toFixed(2)}
                      </div>
                      {booking.discount > 0 && (
                        <div className="text-sm text-green-600">
                          Saved ${booking.discount.toFixed(2)} with points
                        </div>
                      )}
                      <div className="text-sm text-primary-600 mt-1">
                        +{booking.pointsEarned} points earned
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'completed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/chat/${booking.petpalId}`)}
                        className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition flex items-center space-x-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                      {booking.status === 'completed' && !rating[booking.id] && (
                        <button
                          onClick={() => setShowRating({ ...showRating, [booking.id]: true })}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
                        >
                          <Star className="w-4 h-4" />
                          <span>Rate</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {showRating[booking.id] && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium text-gray-700 mb-2">Rate your experience:</p>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRate(booking.id, star)}
                          className="text-2xl hover:scale-110 transition"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (rating[booking.id] || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {rating[booking.id] && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>You rated {rating[booking.id]} stars</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MyBookings
