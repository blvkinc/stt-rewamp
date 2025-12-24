import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider, App as AntApp } from 'antd'
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
import MerchantLayout from './components/merchant/MerchantLayout'
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
import EditMerchantPage from './pages/admin/EditMerchantPage'
import MerchantCreatePage from './pages/admin/MerchantCreatePage'
import VenueDetailPage from './pages/admin/VenueDetailPage'
import ApprovalQueuePage from './pages/admin/ApprovalQueuePage'
import SystemLogsPage from './pages/admin/SystemLogsPage'
import ReportsPage from './pages/admin/ReportsPage'
import MerchantProfilePage from './pages/merchant/MerchantProfilePage'
import AdminProfilePage from './pages/admin/AdminProfilePage'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <AntApp>
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

                  <Route path="/merchant" element={<MerchantLayout />}>
                    <Route path="dashboard" element={<MerchantDashboard />} />
                    <Route path="events" element={<MerchantEventsPage />} />
                    <Route path="events/create" element={<CreateEventPage />} />
                    <Route path="events/:id/edit" element={<CreateEventPage />} />
                    <Route path="packages" element={<MerchantPackagesPage />} />
                    <Route path="packages/create" element={<CreatePackagePage />} />
                    <Route path="packages/:id/edit" element={<CreatePackagePage />} />
                    <Route path="bookings" element={<BookingsPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="promotions" element={<PromotionsPage />} />
                    <Route path="advertising" element={<AdvertisingPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="events/:id" element={<EventDetailPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                    <Route path="profile" element={<MerchantProfilePage />} />
                  </Route>

                  {/* Super Admin Routes */}
                  <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
                  {/* VenuesManagement merged into MerchantsManagement */}
                  <Route path="/admin/venues/:venueId" element={<VenueDetailPage />} />
                  <Route path="/admin/merchants" element={<MerchantsManagement />} />
                  <Route path="/admin/merchants/invite" element={<InviteMerchant />} />
                  <Route path="/admin/merchants/new" element={<MerchantCreatePage />} />
                  <Route path="/admin/merchants/:id/edit" element={<EditMerchantPage />} />
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
                  <Route path="/admin/profile" element={<AdminProfilePage />} />
                </Routes>
              </Router>
            </MerchantProvider>
          </BookingProvider>
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  )
}

export default App
