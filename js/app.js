// State Management
const AppState = {
  getPoints() {
    const saved = localStorage.getItem('points')
    return saved ? parseInt(saved) : 0
  },
  
  setPoints(points) {
    localStorage.setItem('points', points.toString())
  },
  
  addPoints(amount) {
    const current = this.getPoints()
    this.setPoints(current + amount)
    this.updatePointsDisplay()
  },
  
  usePoints(amount) {
    const current = this.getPoints()
    if (current >= amount) {
      this.setPoints(current - amount)
      this.updatePointsDisplay()
      return true
    }
    return false
  },
  
  updatePointsDisplay() {
    const pointsBadge = document.querySelector('.points-badge')
    const pointsValue = document.querySelector('.points-value')
    const points = this.getPoints()
    
    if (pointsBadge) {
      if (points > 0) {
        pointsBadge.textContent = points > 99 ? '99+' : points
        pointsBadge.style.display = 'flex'
      } else {
        pointsBadge.style.display = 'none'
      }
    }
    
    if (pointsValue) {
      pointsValue.textContent = points
    }
  },
  
  getBookings() {
    const saved = localStorage.getItem('bookings')
    return saved ? JSON.parse(saved) : []
  },
  
  addBooking(booking) {
    const bookings = this.getBookings()
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      status: 'confirmed',
      pointsEarned: Math.floor(booking.totalPrice * 0.1)
    }
    bookings.push(newBooking)
    localStorage.setItem('bookings', JSON.stringify(bookings))
    this.addPoints(newBooking.pointsEarned)
    return newBooking
  },
  
  getMessages(petpalId) {
    const saved = localStorage.getItem('messages')
    const messages = saved ? JSON.parse(saved) : {}
    return messages[petpalId] || []
  },
  
  addMessage(petpalId, message) {
    const saved = localStorage.getItem('messages')
    const messages = saved ? JSON.parse(saved) : {}
    const petpalMessages = messages[petpalId] || []
    
    petpalMessages.push({
      id: Date.now().toString(),
      text: message.text,
      sender: message.sender,
      timestamp: new Date().toISOString()
    })
    
    messages[petpalId] = petpalMessages
    localStorage.setItem('messages', JSON.stringify(messages))
  }
}

// Utility Functions
function getPetpalById(id) {
  return petpals.find(p => p.id === id)
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString()
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  AppState.updatePointsDisplay()
})
