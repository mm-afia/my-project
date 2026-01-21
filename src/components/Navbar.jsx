import { Link, useLocation } from 'react-router-dom'
import { Home, MessageCircle, Gift, Calendar, MapPin } from 'lucide-react'
import { useApp } from '../context/AppContext'

const Navbar = () => {
  const location = useLocation()
  const { points } = useApp()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-primary-600">PetPal</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </Link>

            <Link
              to="/petpals"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                isActive('/petpals') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <MapPin size={18} />
              <span className="hidden sm:inline">Find</span>
            </Link>

            <Link
              to="/my-bookings"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition ${
                isActive('/my-bookings') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Calendar size={18} />
              <span className="hidden sm:inline">Bookings</span>
            </Link>

            <Link
              to="/rewards"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition relative ${
                isActive('/rewards') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Gift size={18} />
              <span className="hidden sm:inline">Rewards</span>
              {points > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {points > 99 ? '99+' : points}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
