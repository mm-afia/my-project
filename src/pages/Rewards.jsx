import { useState } from 'react'
import { Gift, Star, ShoppingBag, CheckCircle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const Rewards = () => {
  const { points, usePoints } = useApp()
  const [redeemed, setRedeemed] = useState([])

  const rewards = [
    {
      id: 'discount10',
      name: '$10 Pet Shop Discount',
      points: 100,
      description: 'Get $10 off your next purchase at partner pet shops',
      icon: ShoppingBag
    },
    {
      id: 'discount25',
      name: '$25 Pet Shop Discount',
      points: 250,
      description: 'Get $25 off your next purchase at partner pet shops',
      icon: ShoppingBag
    },
    {
      id: 'free1hr',
      name: 'Free 1-Hour Pet Sitting',
      points: 150,
      description: 'Redeem for a free 1-hour pet sitting session',
      icon: Gift
    },
    {
      id: 'free2hr',
      name: 'Free 2-Hour Pet Sitting',
      points: 300,
      description: 'Redeem for a free 2-hour pet sitting session',
      icon: Gift
    },
    {
      id: 'premium',
      name: 'Premium Service Upgrade',
      points: 200,
      description: 'Upgrade any booking to premium service package',
      icon: Star
    }
  ]

  const handleRedeem = (reward) => {
    if (points >= reward.points) {
      if (usePoints(reward.points)) {
        setRedeemed([...redeemed, reward.id])
        alert(`Successfully redeemed ${reward.name}!`)
      }
    } else {
      alert(`You need ${reward.points} points. You currently have ${points} points.`)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Rewards Center</h1>
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 mb-1">Your Points Balance</p>
              <p className="text-4xl font-bold">{points}</p>
            </div>
            <Gift className="w-16 h-16 opacity-80" />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Rewards</h2>
        <p className="text-gray-600">
          Earn points with every booking! 10% of your booking total becomes points.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward) => {
          const Icon = reward.icon
          const isRedeemed = redeemed.includes(reward.id)
          const canAfford = points >= reward.points

          return (
            <div
              key={reward.id}
              className={`bg-white rounded-lg shadow-md p-6 border-2 transition ${
                isRedeemed
                  ? 'border-green-500 bg-green-50'
                  : canAfford
                  ? 'border-primary-200 hover:border-primary-400'
                  : 'border-gray-200 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                {isRedeemed && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">{reward.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{reward.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-primary-600" />
                  <span className="font-semibold text-gray-900">{reward.points} points</span>
                </div>
                <button
                  onClick={() => handleRedeem(reward)}
                  disabled={isRedeemed || !canAfford}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    isRedeemed
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : canAfford
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isRedeemed ? 'Redeemed' : canAfford ? 'Redeem' : 'Not Enough Points'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-2">How to Earn Points</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Book a pet pal - Earn 10% of booking total as points</li>
          <li>• Complete a booking - Additional 50 points</li>
          <li>• Leave a review - 25 points</li>
          <li>• Refer a friend - 100 points</li>
        </ul>
      </div>
    </div>
  )
}

export default Rewards
