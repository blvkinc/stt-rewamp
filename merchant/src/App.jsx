import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider, App as AntApp } from 'antd'
import { MerchantProvider } from './shared/context/MerchantContext'
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
import MerchantProfilePage from './merchant/pages/MerchantProfilePage'

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
        <MerchantProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/merchant/dashboard" replace />} />
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
            </Routes>
          </Router>
        </MerchantProvider>
      </AntApp>
    </ConfigProvider>
  )
}

export default App
