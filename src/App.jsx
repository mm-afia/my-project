import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PetpalList from './pages/PetpalList'
import PetpalDetail from './pages/PetpalDetail'
import Booking from './pages/Booking'
import Chat from './pages/Chat'
import Rewards from './pages/Rewards'
import MyBookings from './pages/MyBookings'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/petpals" element={<PetpalList />} />
            <Route path="/petpal/:id" element={<PetpalDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/chat/:petpalId" element={<Chat />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
