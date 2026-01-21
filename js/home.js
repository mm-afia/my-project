let filters = {
  maxDistance: 10,
  maxPrice: 100,
  minRating: 0,
  services: []
}

function renderPetpalCard(petpal) {
  return `
    <a href="petpal-detail.html?id=${petpal.id}" class="block">
      <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div class="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
          <img
            src="${petpal.image}"
            alt="${petpal.name}"
            class="w-full h-full object-cover"
            onerror="this.style.display='none'"
          />
        </div>
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <h3 class="text-lg font-semibold text-gray-900">${petpal.name}</h3>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4 fill-yellow-400 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span class="text-sm font-medium">${petpal.rating}</span>
              <span class="text-xs text-gray-500">(${petpal.reviewCount})</span>
            </div>
          </div>

          <div class="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>${petpal.distance} mi</span>
            </div>
            <div class="flex items-center space-x-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>$${petpal.price}/hr</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            ${petpal.services.slice(0, 3).map(service => `
              <span class="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                ${service}
              </span>
            `).join('')}
            ${petpal.services.length > 3 ? `
              <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +${petpal.services.length - 3} more
              </span>
            ` : ''}
          </div>
        </div>
      </div>
    </a>
  `
}

function filterPetpals() {
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || ''
  
  const filtered = petpals.filter(petpal => {
    const matchesSearch = petpal.name.toLowerCase().includes(searchTerm) ||
      petpal.services.some(s => s.toLowerCase().includes(searchTerm))
    const matchesDistance = petpal.distance <= filters.maxDistance
    const matchesPrice = petpal.price <= filters.maxPrice
    const matchesRating = petpal.rating >= filters.minRating
    const matchesServices = filters.services.length === 0 ||
      filters.services.some(service => petpal.services.includes(service))

    return matchesSearch && matchesDistance && matchesPrice && matchesRating && matchesServices
  })

  const container = document.getElementById('resultsContainer')
  const countEl = document.getElementById('resultsCount')
  
  if (container) {
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12">
          <p class="text-gray-500 text-lg">No pet pals found matching your criteria.</p>
          <button onclick="clearFilters()" class="mt-4 text-primary-600 hover:text-primary-700 font-medium">
            Clear filters
          </button>
        </div>
      `
    } else {
      container.innerHTML = filtered.slice(0, 6).map(petpal => renderPetpalCard(petpal)).join('')
    }
  }
  
  if (countEl) {
    countEl.textContent = filtered.length
  }
}

function clearFilters() {
  filters = { maxDistance: 10, maxPrice: 100, minRating: 0, services: [] }
  document.getElementById('searchInput').value = ''
  document.getElementById('distanceFilter').value = 10
  document.getElementById('priceFilter').value = 100
  document.getElementById('ratingFilter').value = 0
  updateFilterDisplay()
  filterPetpals()
}

function updateFilterDisplay() {
  const distanceValue = document.getElementById('distanceValue')
  const priceValue = document.getElementById('priceValue')
  const ratingValue = document.getElementById('ratingValue')
  
  if (distanceValue) distanceValue.textContent = filters.maxDistance
  if (priceValue) priceValue.textContent = filters.maxPrice
  if (ratingValue) {
    ratingValue.textContent = filters.minRating > 0 ? filters.minRating.toFixed(1) : 'Any'
  }
}

function initServicesFilter() {
  const allServices = [...new Set(petpals.flatMap(p => p.services))]
  const container = document.getElementById('servicesFilter')
  
  if (container) {
    container.innerHTML = allServices.map(service => `
      <button
        onclick="toggleService('${service}')"
        class="px-3 py-1 rounded-full text-sm transition service-filter-btn"
        data-service="${service}"
      >
        ${service}
      </button>
    `).join('')
    updateServiceButtons()
  }
}

function toggleService(service) {
  if (filters.services.includes(service)) {
    filters.services = filters.services.filter(s => s !== service)
  } else {
    filters.services.push(service)
  }
  updateServiceButtons()
  filterPetpals()
}

function updateServiceButtons() {
  document.querySelectorAll('.service-filter-btn').forEach(btn => {
    const service = btn.dataset.service
    if (filters.services.includes(service)) {
      btn.className = 'px-3 py-1 rounded-full text-sm transition bg-primary-600 text-white'
    } else {
      btn.className = 'px-3 py-1 rounded-full text-sm transition bg-gray-100 text-gray-700 hover:bg-gray-200'
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  // Points banner
  const points = AppState.getPoints()
  const pointsBanner = document.getElementById('pointsBanner')
  if (pointsBanner && points > 0) {
    pointsBanner.classList.remove('hidden')
  }

  // Filter toggle
  const filterToggle = document.getElementById('filterToggle')
  const filtersPanel = document.getElementById('filtersPanel')
  if (filterToggle && filtersPanel) {
    filterToggle.addEventListener('click', () => {
      filtersPanel.classList.toggle('hidden')
    })
  }

  // Filter inputs
  const distanceFilter = document.getElementById('distanceFilter')
  const priceFilter = document.getElementById('priceFilter')
  const ratingFilter = document.getElementById('ratingFilter')
  
  if (distanceFilter) {
    distanceFilter.addEventListener('input', (e) => {
      filters.maxDistance = parseInt(e.target.value)
      updateFilterDisplay()
      filterPetpals()
    })
  }
  
  if (priceFilter) {
    priceFilter.addEventListener('input', (e) => {
      filters.maxPrice = parseInt(e.target.value)
      updateFilterDisplay()
      filterPetpals()
    })
  }
  
  if (ratingFilter) {
    ratingFilter.addEventListener('input', (e) => {
      filters.minRating = parseFloat(e.target.value)
      updateFilterDisplay()
      filterPetpals()
    })
  }

  // Search input
  const searchInput = document.getElementById('searchInput')
  if (searchInput) {
    searchInput.addEventListener('input', filterPetpals)
  }

  // Initialize
  initServicesFilter()
  updateFilterDisplay()
  filterPetpals()
})
