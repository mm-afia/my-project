export const petpals = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    rating: 4.9,
    reviewCount: 127,
    distance: 0.8,
    price: 35,
    services: ['Dog Walking', 'Pet Sitting', 'Overnight Care'],
    description: 'Experienced pet sitter with 5+ years of caring for dogs and cats. I love all animals and provide personalized care.',
    availability: {
      monday: { start: '09:00', end: '18:00' },
      tuesday: { start: '09:00', end: '18:00' },
      wednesday: { start: '09:00', end: '18:00' },
      thursday: { start: '09:00', end: '18:00' },
      friday: { start: '09:00', end: '18:00' },
      saturday: { start: '10:00', end: '16:00' },
      sunday: { start: '10:00', end: '16:00' }
    },
    location: { lat: 37.7849, lng: -122.4094 }
  },
  {
    id: '2',
    name: 'Mike Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    rating: 4.8,
    reviewCount: 89,
    distance: 1.2,
    price: 30,
    services: ['Dog Walking', 'Pet Feeding', 'Playtime'],
    description: 'Active pet lover who enjoys long walks and play sessions. Specialized in high-energy dogs.',
    availability: {
      monday: { start: '08:00', end: '20:00' },
      tuesday: { start: '08:00', end: '20:00' },
      wednesday: { start: '08:00', end: '20:00' },
      thursday: { start: '08:00', end: '20:00' },
      friday: { start: '08:00', end: '20:00' },
      saturday: { start: '09:00', end: '17:00' },
      sunday: { start: '09:00', end: '17:00' }
    },
    location: { lat: 37.7649, lng: -122.4294 }
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    rating: 5.0,
    reviewCount: 203,
    distance: 1.5,
    price: 40,
    services: ['Pet Sitting', 'Overnight Care', 'Grooming', 'Medication'],
    description: 'Certified veterinary assistant with expertise in special needs pets. Available for extended stays.',
    availability: {
      monday: { start: '07:00', end: '22:00' },
      tuesday: { start: '07:00', end: '22:00' },
      wednesday: { start: '07:00', end: '22:00' },
      thursday: { start: '07:00', end: '22:00' },
      friday: { start: '07:00', end: '22:00' },
      saturday: { start: '08:00', end: '20:00' },
      sunday: { start: '08:00', end: '20:00' }
    },
    location: { lat: 37.7549, lng: -122.4394 }
  },
  {
    id: '4',
    name: 'David Kim',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    rating: 4.7,
    reviewCount: 56,
    distance: 2.1,
    price: 28,
    services: ['Dog Walking', 'Pet Feeding'],
    description: 'Part-time pet sitter and full-time animal enthusiast. Great with puppies and senior dogs.',
    availability: {
      monday: { start: '17:00', end: '21:00' },
      tuesday: { start: '17:00', end: '21:00' },
      wednesday: { start: '17:00', end: '21:00' },
      thursday: { start: '17:00', end: '21:00' },
      friday: { start: '17:00', end: '21:00' },
      saturday: { start: '10:00', end: '18:00' },
      sunday: { start: '10:00', end: '18:00' }
    },
    location: { lat: 37.7949, lng: -122.3994 }
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    rating: 4.9,
    reviewCount: 145,
    distance: 0.5,
    price: 45,
    services: ['Pet Sitting', 'Overnight Care', 'Training', 'Grooming'],
    description: 'Professional pet care provider with training certification. I offer comprehensive pet care services.',
    availability: {
      monday: { start: '06:00', end: '23:00' },
      tuesday: { start: '06:00', end: '23:00' },
      wednesday: { start: '06:00', end: '23:00' },
      thursday: { start: '06:00', end: '23:00' },
      friday: { start: '06:00', end: '23:00' },
      saturday: { start: '07:00', end: '22:00' },
      sunday: { start: '07:00', end: '22:00' }
    },
    location: { lat: 37.7749, lng: -122.4194 }
  }
]

export const servicePackages = [
  { id: 'basic', name: 'Basic Care', price: 0, includes: ['Feeding', 'Water refill', 'Quick check-in'] },
  { id: 'standard', name: 'Standard Care', price: 10, includes: ['Basic Care', '30-min walk', 'Playtime'] },
  { id: 'premium', name: 'Premium Care', price: 20, includes: ['Standard Care', '60-min walk', 'Grooming', 'Photo updates'] },
  { id: 'overnight', name: 'Overnight Stay', price: 50, includes: ['Premium Care', '24/7 supervision', 'Sleepover'] }
]
