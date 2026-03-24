import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ConfigProvider, App as AntApp } from 'antd'
import { AuthProvider } from '@shared/context/AuthContext'
import { MerchantProvider } from '@shared/context/MerchantContext'
import MerchantLayout from './components/MerchantLayout'
import MerchantAuthPage from './pages/MerchantAuthPage'
import MerchantOnboardingPage from './pages/MerchantOnboardingPage'
import MerchantDashboard from './pages/MerchantDashboard'
import MerchantEventsPage from './pages/EventsPage'
import CreateEventPage from './pages/CreateEventPage'
import MerchantPackagesPage from './pages/PackagesPage'
import CreatePackagePage from './pages/CreatePackagePage'
import PackageEditRedirect from './pages/PackageEditRedirect'
import BookingsPage from './pages/BookingsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import PromotionsPage from './pages/PromotionsPage'
import AdvertisingPage from './pages/AdvertisingPage'
import SettingsPage from './pages/SettingsPage'
import EventDetailPage from './pages/EventDetailPage'
import CustomersPage from './pages/CustomersPage'
import FAQListPage from './pages/FAQListPage'
import CreateFAQPage from './pages/CreateFAQPage'
import MerchantPlansPage from './pages/MerchantPlansPage'
import MerchantProfilePage from './pages/MerchantProfilePage'

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
          <MerchantProvider>
            <Router>
              <Routes>
                {/* Auth & Onboarding (no sidebar layout) */}
                <Route path="/auth" element={<MerchantAuthPage />} />
                <Route path="/onboarding" element={<MerchantOnboardingPage />} />

                {/* Dashboard routes (with sidebar layout) */}
                <Route path="/" element={<MerchantLayout />}>
                  <Route index element={<MerchantDashboard />} />
                  <Route path="dashboard" element={<MerchantDashboard />} />
                  <Route path="events" element={<MerchantEventsPage />} />
                  <Route path="events/create" element={<CreateEventPage />} />
                  <Route path="events/:id/edit" element={<CreateEventPage />} />
                  <Route path="events/:id" element={<EventDetailPage />} />
                  <Route path="packages" element={<MerchantPackagesPage />} />
                  <Route path="packages/create" element={<CreatePackagePage />} />
                  <Route path="packages/:id/edit" element={<PackageEditRedirect />} />
                  <Route path="bookings" element={<BookingsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="promotions" element={<PromotionsPage />} />
                  <Route path="advertising" element={<AdvertisingPage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="customers" element={<CustomersPage />} />
                  <Route path="faqs" element={<FAQListPage />} />
                  <Route path="faqs/create" element={<CreateFAQPage />} />
                  <Route path="faqs/:id/edit" element={<CreateFAQPage />} />
                  <Route path="profile" element={<MerchantProfilePage />} />
                  <Route path="plans" element={<MerchantPlansPage />} />
                </Route>
              </Routes>
            </Router>
          </MerchantProvider>
        </AuthProvider>
      </AntApp>
    </ConfigProvider>
  )
}

export default App
