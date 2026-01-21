function renderNavbar() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html'
  const navbar = document.getElementById('navbar')
  
  if (!navbar) return
  
  const isActive = (path) => currentPath === path || (currentPath === '' && path === 'index.html')
  
  navbar.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <a href="index.html" class="flex items-center space-x-2">
          <span class="text-2xl">🐾</span>
          <span class="text-xl font-bold text-primary-600">PetPal</span>
        </a>

        <div class="flex items-center space-x-6">
          <a
            href="index.html"
            class="flex items-center space-x-1 px-3 py-2 rounded-md transition ${isActive('index.html') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'}"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span class="hidden sm:inline">Home</span>
          </a>

          <a
            href="petpals.html"
            class="flex items-center space-x-1 px-3 py-2 rounded-md transition ${isActive('petpals.html') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'}"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="hidden sm:inline">Find</span>
          </a>

          <a
            href="my-bookings.html"
            class="flex items-center space-x-1 px-3 py-2 rounded-md transition ${isActive('my-bookings.html') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'}"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span class="hidden sm:inline">Bookings</span>
          </a>

          <a
            href="rewards.html"
            class="flex items-center space-x-1 px-3 py-2 rounded-md transition relative ${isActive('rewards.html') ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:text-primary-600'}"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
            </svg>
            <span class="hidden sm:inline">Rewards</span>
            <span class="points-badge absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center" style="display: none;">0</span>
          </a>
        </div>
      </div>
    </div>
  `
  
  AppState.updatePointsDisplay()
}

document.addEventListener('DOMContentLoaded', renderNavbar)
