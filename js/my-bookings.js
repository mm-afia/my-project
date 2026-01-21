let ratings = JSON.parse(localStorage.getItem('ratings') || '{}')
let showRating = {}

function renderBookings() {
  const bookings = AppState.getBookings()
  const container = document.getElementById('bookingsContainer')
  
  if (!container) return

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 bg-white rounded-lg shadow-md">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <p class="text-gray-500 text-lg mb-4">No bookings yet</p>
        <a href="petpals.html" class="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition inline-block">
          Find a Pet Pal
        </a>
      </div>
    `
    return
  }

  container.innerHTML = bookings.map(booking => {
    const petpal = getPetpalById(booking.petpalId)
    if (!petpal) return ''

    const rating = ratings[booking.id] || 0
    const showRatingPanel = showRating[booking.id]

    return `
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col md:flex-row md:items-start md:justify-between">
          <div class="flex space-x-4 mb-4 md:mb-0">
            <div class="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
              <img src="${petpal.image}" alt="${petpal.name}" class="w-full h-full object-cover" onerror="this.style.display='none'" />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">${booking.petpalName}</h3>
              <div class="space-y-2 text-sm text-gray-600">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>${formatDate(booking.date)}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>${booking.time} (${booking.duration} hours)</span>
                </div>
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>${petpal.distance} miles away</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs">${booking.package}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col items-end space-y-3">
            <div class="text-right">
              <div class="text-2xl font-bold text-gray-900">$${booking.totalPrice.toFixed(2)}</div>
              ${booking.discount > 0 ? `
                <div class="text-sm text-green-600">Saved $${booking.discount.toFixed(2)} with points</div>
              ` : ''}
              <div class="text-sm text-primary-600 mt-1">+${booking.pointsEarned} points earned</div>
            </div>

            <div class="flex items-center space-x-2">
              <span class="px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-700'
                  : booking.status === 'completed'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }">${booking.status}</span>
            </div>

            <div class="flex space-x-2">
              <a href="chat.html?id=${booking.petpalId}" class="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span>Message</span>
              </a>
              ${booking.status === 'completed' && !rating ? `
                <button onclick="showRatingPanel('${booking.id}')" class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                  <span>Rate</span>
                </button>
              ` : ''}
            </div>
          </div>
        </div>

        ${showRatingPanel ? `
          <div class="mt-4 pt-4 border-t">
            <p class="text-sm font-medium text-gray-700 mb-2">Rate your experience:</p>
            <div class="flex space-x-2">
              ${[1, 2, 3, 4, 5].map(star => `
                <button onclick="rateBooking('${booking.id}', ${star})" class="text-2xl hover:scale-110 transition">
                  <svg class="w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}" fill="${star <= rating ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${rating ? `
          <div class="mt-4 pt-4 border-t">
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <svg class="w-4 h-4 fill-yellow-400 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span>You rated ${rating} stars</span>
            </div>
          </div>
        ` : ''}
      </div>
    `
  }).join('')
}

function showRatingPanel(bookingId) {
  showRating[bookingId] = true
  renderBookings()
}

function rateBooking(bookingId, ratingValue) {
  ratings[bookingId] = ratingValue
  localStorage.setItem('ratings', JSON.stringify(ratings))
  showRating[bookingId] = false
  alert('Thank you for your rating!')
  renderBookings()
}

document.addEventListener('DOMContentLoaded', renderBookings)
