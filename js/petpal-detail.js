function renderPetpalDetail(petpal) {
  const availabilityDays = Object.entries(petpal.availability).map(([day, times]) => `
    <div class="bg-gray-50 p-2 rounded">
      <div class="font-medium capitalize">${day.slice(0, 3)}</div>
      <div class="text-gray-600 text-xs">${times.start} - ${times.end}</div>
    </div>
  `).join('')

  return `
    <div class="md:flex">
      <div class="md:w-1/3">
        <div class="h-64 md:h-full bg-gradient-to-br from-primary-100 to-primary-200">
          <img src="${petpal.image}" alt="${petpal.name}" class="w-full h-full object-cover" onerror="this.style.display='none'" />
        </div>
      </div>
      <div class="md:w-2/3 p-8">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">${petpal.name}</h1>
            <div class="flex items-center space-x-4 text-gray-600">
              <div class="flex items-center space-x-1">
                <svg class="w-5 h-5 fill-yellow-400 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="font-semibold">${petpal.rating}</span>
                <span>(${petpal.reviewCount} reviews)</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>${petpal.distance} miles away</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>$${petpal.price}/hr</span>
              </div>
            </div>
          </div>
        </div>
        <p class="text-gray-700 mb-6">${petpal.description}</p>
        <div class="mb-6">
          <h3 class="font-semibold text-gray-900 mb-3">Services Offered</h3>
          <div class="flex flex-wrap gap-2">
            ${petpal.services.map(s => `<span class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">${s}</span>`).join('')}
          </div>
        </div>
        <div class="mb-6">
          <h3 class="font-semibold text-gray-900 mb-3">Availability</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            ${availabilityDays}
          </div>
        </div>
        <div class="flex space-x-4">
          <a href="booking.html?id=${petpal.id}" class="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center space-x-2 text-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>Book Now</span>
          </a>
          <a href="chat.html?id=${petpal.id}" class="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition flex items-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span>Message</span>
          </a>
        </div>
      </div>
    </div>
  `
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search)
  const petpalId = urlParams.get('id')
  const petpal = getPetpalById(petpalId)
  
  const container = document.getElementById('petpalDetail')
  
  if (!petpal) {
    container.innerHTML = '<div class="text-center py-12"><p class="text-gray-500">Pet Pal not found</p></div>'
    return
  }
  
  container.innerHTML = renderPetpalDetail(petpal)
})
