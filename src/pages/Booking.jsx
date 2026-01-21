import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Clock, DollarSign, Gift, Check } from 'lucide-react'
import { petpals, servicePackages } from '../data/mockData'
import { useApp } from '../context/AppContext'

const Booking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addBooking, points, usePoints } = useApp()
  const petpal = petpals.find(p => p.id === id)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState(2)
  const [selectedPackage, setSelectedPackage] = useState('standard')
  const [usePointsDiscount, setUsePointsDiscount] = useState(false)

  if (!petpal) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-500">Pet Pal not found</p>
      </div>
    )
  }

  const packageInfo = servicePackages.find(p => p.id === selectedPackage) || servicePackages[1]
  const basePrice = petpal.price * duration
  const packagePrice = packageInfo.price
  const subtotal = basePrice + packagePrice
  const pointsDiscount = usePointsDiscount && points >= 100 ? 10 : 0
  const total = Math.max(0, subtotal - pointsDiscount)

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time')
      return
    }

    if (usePointsDiscount) {
      if (!usePoints(100)) {
        alert('Not enough points!')
        return
      }
    }

    const booking = addBooking({
      petpalId: petpal.id,
      petpalName: petpal.name,
      date: selectedDate,
      time: selectedTime,
      duration,
      package: packageInfo.name,
      basePrice,
      packagePrice,
      discount: pointsDiscount,
      totalPrice: total
    })

    alert(`Booking confirmed! You earned ${booking.pointsEarned} points.`)
    navigate('/my-bookings')
  }

  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Book {petpal.name}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Date Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Select Date</span>
            </h2>
            <input
              type="date"
              min={today}
              max={maxDate}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Time Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Select Time</span>
            </h2>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Duration */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Duration</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDuration(Math.max(1, duration - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-lg font-semibold">{duration} {duration === 1 ? 'hour' : 'hours'}</span>
              <button
                onClick={() => setDuration(duration + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Service Package */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Service Package</h2>
            <div className="space-y-3">
              {servicePackages.map(pkg => (
                <label
                  key={pkg.id}
                  className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition ${
                    selectedPackage === pkg.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={selectedPackage === pkg.id}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{pkg.name}</span>
                      <span className="text-primary-600 font-semibold">
                        {pkg.price === 0 ? 'Free' : `+$${pkg.price}`}
                      </span>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {pkg.includes.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-primary-500" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Base Rate ({duration} hrs)</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Package</span>
                <span>${packagePrice.toFixed(2)}</span>
              </div>
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Points Discount</span>
                  <span>-${pointsDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {points >= 100 && (
              <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={usePointsDiscount}
                    onChange={(e) => setUsePointsDiscount(e.target.checked)}
                  />
                  <span className="text-sm">
                    Use 100 points for $10 off
                  </span>
                </label>
              </div>
            )}

            <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Gift className="w-4 h-4 text-yellow-600" />
                <span className="text-yellow-800">
                  Earn {Math.floor(total * 0.1)} points with this booking!
                </span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
