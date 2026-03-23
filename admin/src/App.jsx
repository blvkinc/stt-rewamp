import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider, App as AntApp } from 'antd'
import { MerchantProvider } from './shared/context/MerchantContext'
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
        <MerchantProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
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
      </AntApp>
    </ConfigProvider>
  )
}

export default App
