import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({ lat: 37.7749, lng: -122.4194 }) // Default: San Francisco
  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('points')
    return saved ? parseInt(saved) : 0
  })
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings')
    return saved ? JSON.parse(saved) : []
  })
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('messages')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('points', points.toString())
  }, [points])

  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings))
  }, [bookings])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages))
  }, [messages])

  const addPoints = (amount) => {
    setPoints(prev => prev + amount)
  }

  const usePoints = (amount) => {
    if (points >= amount) {
      setPoints(prev => prev - amount)
      return true
    }
    return false
  }

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      status: 'confirmed',
      pointsEarned: Math.floor(booking.totalPrice * 0.1) // 10% of booking price as points
    }
    setBookings(prev => [...prev, newBooking])
    addPoints(newBooking.pointsEarned)
    return newBooking
  }

  const addMessage = (petpalId, message) => {
    setMessages(prev => {
      const petpalMessages = prev[petpalId] || []
      return {
        ...prev,
        [petpalId]: [...petpalMessages, {
          id: Date.now().toString(),
          text: message.text,
          sender: message.sender,
          timestamp: new Date().toISOString()
        }]
      }
    })
  }

  const getMessages = (petpalId) => {
    return messages[petpalId] || []
  }

  const value = {
    userLocation,
    setUserLocation,
    points,
    addPoints,
    usePoints,
    bookings,
    addBooking,
    messages,
    addMessage,
    getMessages
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
