const rewards = [
  {
    id: 'discount10',
    name: '$10 Pet Shop Discount',
    points: 100,
    description: 'Get $10 off your next purchase at partner pet shops',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
  },
  {
    id: 'discount25',
    name: '$25 Pet Shop Discount',
    points: 250,
    description: 'Get $25 off your next purchase at partner pet shops',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
  },
  {
    id: 'free1hr',
    name: 'Free 1-Hour Pet Sitting',
    points: 150,
    description: 'Redeem for a free 1-hour pet sitting session',
    icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
  },
  {
    id: 'free2hr',
    name: 'Free 2-Hour Pet Sitting',
    points: 300,
    description: 'Redeem for a free 2-hour pet sitting session',
    icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7'
  },
  {
    id: 'premium',
    name: 'Premium Service Upgrade',
    points: 200,
    description: 'Upgrade any booking to premium service package',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
  }
]

let redeemed = JSON.parse(localStorage.getItem('redeemed') || '[]')

function renderRewards() {
  const points = AppState.getPoints()
  const container = document.getElementById('rewardsContainer')
  
  if (!container) return

  container.innerHTML = rewards.map(reward => {
    const isRedeemed = redeemed.includes(reward.id)
    const canAfford = points >= reward.points

    return `
      <div class="bg-white rounded-lg shadow-md p-6 border-2 transition ${
        isRedeemed
          ? 'border-green-500 bg-green-50'
          : canAfford
          ? 'border-primary-200 hover:border-primary-400'
          : 'border-gray-200 opacity-75'
      }">
        <div class="flex items-start justify-between mb-4">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${reward.icon}"></path>
            </svg>
          </div>
          ${isRedeemed ? `
            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          ` : ''}
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">${reward.name}</h3>
        <p class="text-gray-600 text-sm mb-4">${reward.description}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
            </svg>
            <span class="font-semibold text-gray-900">${reward.points} points</span>
          </div>
          <button
            onclick="handleRedeem('${reward.id}', ${reward.points})"
            disabled="${isRedeemed || !canAfford}"
            class="px-4 py-2 rounded-lg font-semibold transition ${
              isRedeemed
                ? 'bg-green-500 text-white cursor-not-allowed'
                : canAfford
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }"
          >
            ${isRedeemed ? 'Redeemed' : canAfford ? 'Redeem' : 'Not Enough Points'}
          </button>
        </div>
      </div>
    `
  }).join('')
}

function handleRedeem(rewardId, points) {
  if (AppState.usePoints(points)) {
    redeemed.push(rewardId)
    localStorage.setItem('redeemed', JSON.stringify(redeemed))
    alert(`Successfully redeemed ${rewards.find(r => r.id === rewardId).name}!`)
    renderRewards()
  } else {
    alert(`You need ${points} points. You currently have ${AppState.getPoints()} points.`)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  AppState.updatePointsDisplay()
  renderRewards()
})
