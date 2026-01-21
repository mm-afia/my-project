let selectedDate = ''
let selectedTime = ''
let duration = 2
let selectedPackage = 'standard'
let usePointsDiscount = false

function renderBookingForm(petpal) {
  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  return `
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>Select Date</span>
      </h2>
      <input type="date" id="dateInput" min="${today}" max="${maxDate}" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4 flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Select Time</span>
      </h2>
      <input type="time" id="timeInput" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Duration</h2>
      <div class="flex items-center space-x-4">
        <button onclick="changeDuration(-1)" class="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50">-</button>
        <span class="text-lg font-semibold"><span id="durationValue">2</span> <span id="durationUnit">hours</span></span>
        <button onclick="changeDuration(1)" class="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50">+</button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold mb-4">Service Package</h2>
      <div class="space-y-3">
        ${servicePackages.map(pkg => `
          <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition package-option ${selectedPackage === pkg.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}" data-package="${pkg.id}">
            <input type="radio" name="package" value="${pkg.id}" ${selectedPackage === pkg.id ? 'checked' : ''} class="mt-1 mr-3" />
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <span class="font-semibold">${pkg.name}</span>
                <span class="text-primary-600 font-semibold">${pkg.price === 0 ? 'Free' : `+$${pkg.price}`}</span>
              </div>
              <ul class="text-sm text-gray-600 space-y-1">
                ${pkg.includes.map(item => `
                  <li class="flex items-center space-x-2">
                    <svg class="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </label>
        `).join('')}
      </div>
    </div>
  `
}

function updateBookingSummary(petpal) {
  const packageInfo = servicePackages.find(p => p.id === selectedPackage) || servicePackages[1]
  const basePrice = petpal.price * duration
  const packagePrice = packageInfo.price
  const subtotal = basePrice + packagePrice
  const points = AppState.getPoints()
  const pointsDiscount = usePointsDiscount && points >= 100 ? 10 : 0
  const total = Math.max(0, subtotal - pointsDiscount)

  const summary = document.getElementById('bookingSummary')
  if (!summary) return

  summary.innerHTML = `
    <div class="space-y-3 mb-4">
      <div class="flex justify-between text-gray-600">
        <span>Base Rate (${duration} hrs)</span>
        <span>$${basePrice.toFixed(2)}</span>
      </div>
      <div class="flex justify-between text-gray-600">
        <span>Package</span>
        <span>$${packagePrice.toFixed(2)}</span>
      </div>
      ${pointsDiscount > 0 ? `
        <div class="flex justify-between text-green-600">
          <span>Points Discount</span>
          <span>-$${pointsDiscount.toFixed(2)}</span>
        </div>
      ` : ''}
      <div class="border-t pt-3 flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span class="text-primary-600">$${total.toFixed(2)}</span>
      </div>
    </div>

    ${points >= 100 ? `
      <div class="mb-4 p-3 bg-primary-50 rounded-lg">
        <label class="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" id="pointsDiscountCheck" ${usePointsDiscount ? 'checked' : ''} />
          <span class="text-sm">Use 100 points for $10 off</span>
        </label>
      </div>
    ` : ''}

    <div class="mb-4 p-3 bg-yellow-50 rounded-lg">
      <div class="flex items-center space-x-2 text-sm">
        <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
        </svg>
        <span class="text-yellow-800">Earn ${Math.floor(total * 0.1)} points with this booking!</span>
      </div>
    </div>

    <button onclick="handleBooking('${petpal.id}')" class="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition">
      Confirm Booking
    </button>
  `

  const checkbox = document.getElementById('pointsDiscountCheck')
  if (checkbox) {
    checkbox.addEventListener('change', (e) => {
      usePointsDiscount = e.target.checked
      updateBookingSummary(petpal)
    })
  }
}

function changeDuration(delta) {
  duration = Math.max(1, duration + delta)
  document.getElementById('durationValue').textContent = duration
  document.getElementById('durationUnit').textContent = duration === 1 ? 'hour' : 'hours'
  
  const urlParams = new URLSearchParams(window.location.search)
  const petpalId = urlParams.get('id')
  const petpal = getPetpalById(petpalId)
  if (petpal) updateBookingSummary(petpal)
}

function handleBooking(petpalId) {
  if (!selectedDate || !selectedTime) {
    alert('Please select date and time')
    return
  }

  const petpal = getPetpalById(petpalId)
  if (!petpal) return

  if (usePointsDiscount) {
    if (!AppState.usePoints(100)) {
      alert('Not enough points!')
      return
    }
  }

  const packageInfo = servicePackages.find(p => p.id === selectedPackage) || servicePackages[1]
  const basePrice = petpal.price * duration
  const packagePrice = packageInfo.price
  const subtotal = basePrice + packagePrice
  const pointsDiscount = usePointsDiscount && AppState.getPoints() >= 100 ? 10 : 0
  const total = Math.max(0, subtotal - pointsDiscount)

  const booking = AppState.addBooking({
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
  window.location.href = 'my-bookings.html'
}

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search)
  const petpalId = urlParams.get('id')
  const petpal = getPetpalById(petpalId)

  if (!petpal) {
    document.getElementById('pageTitle').textContent = 'Pet Pal not found'
    return
  }

  document.getElementById('pageTitle').textContent = `Book ${petpal.name}`
  document.getElementById('bookingForm').innerHTML = renderBookingForm(petpal)
  updateBookingSummary(petpal)

  // Package selection
  document.querySelectorAll('.package-option').forEach(option => {
    option.addEventListener('click', (e) => {
      if (e.target.type !== 'radio') {
        const radio = option.querySelector('input[type="radio"]')
        radio.checked = true
        selectedPackage = radio.value
        document.querySelectorAll('.package-option').forEach(opt => {
          opt.classList.remove('border-primary-500', 'bg-primary-50')
          opt.classList.add('border-gray-200')
        })
        option.classList.add('border-primary-500', 'bg-primary-50')
        option.classList.remove('border-gray-200')
        updateBookingSummary(petpal)
      }
    })
  })

  // Date and time inputs
  document.getElementById('dateInput').addEventListener('change', (e) => {
    selectedDate = e.target.value
  })

  document.getElementById('timeInput').addEventListener('change', (e) => {
    selectedTime = e.target.value
  })
})
