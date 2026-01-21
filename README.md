# PetPal App 🐾

A modern, user-friendly static website to find and book pet pals near you.

## Features

- 🔍 **Search & Filter**: Find pet pals by proximity, price, and service packages
- 📅 **Booking System**: Book pet pals based on their availability
- 💬 **Chat**: Communicate with pet pals in real-time
- ⭐ **Ratings**: Rate and review your pet pal experience
- 🎁 **Rewards**: Earn points with every booking, redeem for discounts or free services

## Getting Started

This is a **static website** - no installation or build process required!

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Use a Local Server (Recommended)
For the best experience, use a local web server:

**Python:**
```bash
python -m http.server 8000
```

**Node.js (if you have it):**
```bash
npx http-server
```

**PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Project Structure

```
/
├── index.html          # Home page
├── petpals.html       # Pet pal listing page
├── petpal-detail.html  # Pet pal detail page
├── booking.html        # Booking page
├── chat.html           # Chat page
├── rewards.html        # Rewards page
├── my-bookings.html    # My bookings page
└── js/
    ├── data.js         # Mock data
    ├── app.js          # State management
    ├── navbar.js       # Navigation component
    ├── home.js         # Home page logic
    ├── petpals-list.js # Listing page logic
    ├── petpal-detail.js # Detail page logic
    ├── booking.js      # Booking logic
    ├── chat.js         # Chat logic
    ├── rewards.js      # Rewards logic
    └── my-bookings.js  # Bookings logic
```

## Tech Stack

- **HTML5** - Structure
- **Tailwind CSS** (via CDN) - Styling
- **Vanilla JavaScript** - Interactivity
- **LocalStorage** - Data persistence

## Features Details

- **No Build Step**: Just open and use!
- **No Dependencies**: Everything works out of the box
- **Responsive Design**: Works on mobile and desktop
- **Data Persistence**: Uses browser localStorage to save your bookings, messages, and points

Enjoy finding the perfect pet pal for your furry friends! 🐕🐱
