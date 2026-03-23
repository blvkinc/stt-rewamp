import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './shared/context/AuthContext'
import { BookingProvider } from './shared/context/BookingContext'
import { CartProvider } from './shared/context/CartContext'
import Navbar from './web/components/Navbar'
import Footer from './web/components/Footer'
import HomePage from './web/pages/HomePage'
import EventsPage from './web/pages/EventsPage'
import EventDetailsPage from './web/pages/EventDetailsPage'
import VenuesPage from './web/pages/VenuesPage'
import VenueDetailsPage from './web/pages/VenueDetailsPage'
import PackagesPage from './web/pages/PackagesPage'
import PackageDetailPage from './web/pages/PackageDetailPage'
import ExplorePage from './web/pages/ExplorePage'
import BookingPage from './web/pages/BookingPage'
import ProfilePage from './web/pages/ProfilePage'
import AuthPage from './web/pages/AuthPage'
import PremiumUpgradePage from './web/pages/PremiumUpgradePage'
import ReviewPage from './web/pages/ReviewPage'
import CartPage from './web/pages/CartPage'
import CartCheckoutPage from './web/pages/CartCheckoutPage'

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/events/:id" element={<EventDetailsPage />} />
                  <Route path="/venues" element={<VenuesPage />} />
                  <Route path="/venues/:id" element={<VenueDetailsPage />} />
                  <Route path="/packages/:eventId" element={<PackagesPage />} />
                  <Route path="/packages/detail/:packageId" element={<PackageDetailPage />} />
                  <Route path="/booking/:id" element={<BookingPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/premium" element={<PremiumUpgradePage />} />
                  <Route path="/review/:bookingId" element={<ReviewPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/cart/checkout" element={<CartCheckoutPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </BookingProvider>
    </AuthProvider>
  )
}

export default App
