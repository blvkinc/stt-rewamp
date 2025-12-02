import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { BookingProvider } from './context/BookingContext'
import { MerchantProvider } from './context/MerchantContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import EventsPage from './pages/EventsPage'
import EventDetailsPage from './pages/EventDetailsPage'
import VenuesPage from './pages/VenuesPage'
import VenueDetailsPage from './pages/VenueDetailsPage'
import PackagesPage from './pages/PackagesPage'
import PackageDetailPage from './pages/PackageDetailPage'
import ExplorePage from './pages/ExplorePage'
import BookingPage from './pages/BookingPage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import PremiumUpgradePage from './pages/PremiumUpgradePage'
import ReviewPage from './pages/ReviewPage'

// Merchant Pages
import MerchantAuthPage from './pages/merchant/MerchantAuthPage'
import MerchantOnboardingPage from './pages/merchant/MerchantOnboardingPage'
import MerchantDashboard from './pages/merchant/MerchantDashboard'
import MerchantEventsPage from './pages/merchant/EventsPage'
import CreateEventPage from './pages/merchant/CreateEventPage'
import MerchantPackagesPage from './pages/merchant/PackagesPage'
import CreatePackagePage from './pages/merchant/CreatePackagePage'
import BookingsPage from './pages/merchant/BookingsPage'
import AnalyticsPage from './pages/merchant/AnalyticsPage'
import PromotionsPage from './pages/merchant/PromotionsPage'
import AdvertisingPage from './pages/merchant/AdvertisingPage'
import SettingsPage from './pages/merchant/SettingsPage'
import EventDetailPage from './pages/merchant/EventDetailPage'
import CustomersPage from './pages/merchant/CustomersPage'

// Super Admin Pages
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard'
import VenuesManagement from './pages/admin/VenuesManagement'
import MerchantsManagement from './pages/admin/MerchantsManagement'
import ApprovalsManagement from './pages/admin/ApprovalsManagement'
import UsersManagement from './pages/admin/UsersManagement'
import EventsManagement from './pages/admin/EventsManagement'
import PaymentsManagement from './pages/admin/PaymentsManagement'
import SystemSettings from './pages/admin/SystemSettings'
import AnalyticsManagement from './pages/admin/AnalyticsManagement'
import InviteMerchant from './pages/admin/InviteMerchant'
import VenueDetailPage from './pages/admin/VenueDetailPage'
import ApprovalQueuePage from './pages/admin/ApprovalQueuePage'
import SystemLogsPage from './pages/admin/SystemLogsPage'
import ReportsPage from './pages/admin/ReportsPage'

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <MerchantProvider>
          <Router>
            <Routes>
              {/* Customer Routes */}
              <Route path="/*" element={
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
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />

              {/* Merchant Routes */}
              <Route path="/merchant/auth" element={<MerchantAuthPage />} />
              <Route path="/merchant/onboarding" element={<MerchantOnboardingPage />} />
              <Route path="/merchant/dashboard" element={<MerchantDashboard />} />
              <Route path="/merchant/events" element={<MerchantEventsPage />} />
              <Route path="/merchant/events/create" element={<CreateEventPage />} />
              <Route path="/merchant/packages" element={<MerchantPackagesPage />} />
              <Route path="/merchant/packages/create" element={<CreatePackagePage />} />
              <Route path="/merchant/bookings" element={<BookingsPage />} />
              <Route path="/merchant/analytics" element={<AnalyticsPage />} />
              <Route path="/merchant/promotions" element={<PromotionsPage />} />
              <Route path="/merchant/advertising" element={<AdvertisingPage />} />
              <Route path="/merchant/settings" element={<SettingsPage />} />
              <Route path="/merchant/events/:id" element={<EventDetailPage />} />
              <Route path="/merchant/customers" element={<CustomersPage />} />

              {/* Super Admin Routes */}
              <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/admin/venues" element={<VenuesManagement />} />
              <Route path="/admin/venues/:venueId" element={<VenueDetailPage />} />
              <Route path="/admin/merchants" element={<MerchantsManagement />} />
              <Route path="/admin/merchants/invite" element={<InviteMerchant />} />
              <Route path="/admin/users" element={<UsersManagement />} />
              <Route path="/admin/events" element={<EventsManagement />} />
              <Route path="/admin/approvals" element={<ApprovalsManagement />} />
              <Route path="/admin/approvals/queue" element={<ApprovalQueuePage />} />
              <Route path="/admin/payments" element={<PaymentsManagement />} />
              <Route path="/admin/analytics" element={<AnalyticsManagement />} />
              <Route path="/admin/system" element={<SystemSettings />} />
              <Route path="/admin/settings" element={<SystemSettings />} />
              <Route path="/admin/logs" element={<SystemLogsPage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
            </Routes>
          </Router>
        </MerchantProvider>
      </BookingProvider>
    </AuthProvider>
  )
}

export default App
