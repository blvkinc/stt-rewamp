import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider, App as AntApp } from 'antd'
import { AuthProvider } from './shared/context/AuthContext'
import { BookingProvider } from './shared/context/BookingContext'
import { MerchantProvider } from './shared/context/MerchantContext'
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

// Merchant Pages
import MerchantLayout from './merchant/components/MerchantLayout'
import MerchantAuthPage from './merchant/pages/MerchantAuthPage'
import MerchantOnboardingPage from './merchant/pages/MerchantOnboardingPage'
import MerchantDashboard from './merchant/pages/MerchantDashboard'
import MerchantEventsPage from './merchant/pages/EventsPage'
import CreateEventPage from './merchant/pages/CreateEventPage'
import MerchantPackagesPage from './merchant/pages/PackagesPage'
import CreatePackagePage from './merchant/pages/CreatePackagePage'
import PackageEditRedirect from './merchant/pages/PackageEditRedirect'
import BookingsPage from './merchant/pages/BookingsPage'
import AnalyticsPage from './merchant/pages/AnalyticsPage'
import PromotionsPage from './merchant/pages/PromotionsPage'
import AdvertisingPage from './merchant/pages/AdvertisingPage'
import SettingsPage from './merchant/pages/SettingsPage'
import EventDetailPage from './merchant/pages/EventDetailPage'
import CustomersPage from './merchant/pages/CustomersPage'
import FAQListPage from './merchant/pages/FAQListPage'
import CreateFAQPage from './merchant/pages/CreateFAQPage'
import MerchantPlansPage from './merchant/pages/MerchantPlansPage'

// Super Admin Pages
import SuperAdminDashboard from './admin/pages/SuperAdminDashboard'
import VenuesManagement from './admin/pages/VenuesManagement'
import CategoriesManagement from './admin/pages/CategoriesManagement'
import PackagesManagement from './admin/pages/PackagesManagement'
import FAQsManagement from './admin/pages/FAQsManagement'
import MerchantsManagement from './admin/pages/MerchantsManagement'
import ApprovalsManagement from './admin/pages/ApprovalsManagement'
import UsersManagement from './admin/pages/UsersManagement'
import EventsManagement from './admin/pages/EventsManagement'
import PaymentsManagement from './admin/pages/PaymentsManagement'
import SystemSettings from './admin/pages/SystemSettings'
import AnalyticsManagement from './admin/pages/AnalyticsManagement'
import InviteMerchant from './admin/pages/InviteMerchant'
import EditMerchantPage from './admin/pages/EditMerchantPage'
import MerchantCreatePage from './admin/pages/MerchantCreatePage'
import VenueDetailPage from './admin/pages/VenueDetailPage'
import ApprovalQueuePage from './admin/pages/ApprovalQueuePage'
import SystemLogsPage from './admin/pages/SystemLogsPage'
import ReportsPage from './admin/pages/ReportsPage'
import MerchantProfilePage from './merchant/pages/MerchantProfilePage'
import AdminProfilePage from './admin/pages/AdminProfilePage'

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
            <CartProvider>
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
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/cart/checkout" element={<CartCheckoutPage />} />
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
                    <Route path="packages/:id/edit" element={<PackageEditRedirect />} />
                    <Route path="bookings" element={<BookingsPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="promotions" element={<PromotionsPage />} />
                    <Route path="advertising" element={<AdvertisingPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="events/:id" element={<EventDetailPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                    <Route path="faqs" element={<FAQListPage />} />
                    <Route path="faqs/create" element={<CreateFAQPage />} />
                    <Route path="faqs/:id/edit" element={<CreateFAQPage />} />
                    <Route path="profile" element={<MerchantProfilePage />} />
                    <Route path="plans" element={<MerchantPlansPage />} />
                  </Route>

                  {/* Super Admin Routes */}
                  <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
                  {/* VenuesManagement merged into MerchantsManagement */}
                  <Route path="/admin/venues" element={<VenuesManagement />} />
                  <Route path="/admin/venues/:venueId" element={<VenueDetailPage />} />
                  <Route path="/admin/merchants" element={<MerchantsManagement />} />
                  <Route path="/admin/merchants/invite" element={<InviteMerchant />} />
                  <Route path="/admin/merchants/new" element={<MerchantCreatePage />} />
                  <Route path="/admin/merchants/:id/edit" element={<EditMerchantPage />} />
                  <Route path="/admin/users" element={<UsersManagement />} />
                  <Route path="/admin/events" element={<EventsManagement />} />
                  <Route path="/admin/packages" element={<PackagesManagement />} />
                  <Route path="/admin/categories" element={<CategoriesManagement />} />
                  <Route path="/admin/faqs" element={<FAQsManagement />} />
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
            </CartProvider>
          </BookingProvider>
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  )
}

export default App
