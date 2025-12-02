import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Building,
  Plus,
  Tag,
  TrendingUp,
  Bell,
  Package
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'

const MerchantLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { merchant, logoutMerchant } = useMerchant()

  const navigation = [
    { name: 'Dashboard', href: '/merchant/dashboard', icon: LayoutDashboard },
    { name: 'Events', href: '/merchant/events', icon: Calendar },
    { name: 'Packages', href: '/merchant/packages', icon: Package },
    { name: 'Bookings', href: '/merchant/bookings', icon: Users },
    { name: 'Customers', href: '/merchant/customers', icon: Users },
    { name: 'Analytics', href: '/merchant/analytics', icon: BarChart3 },
    { name: 'Promotions', href: '/merchant/promotions', icon: Tag },
    { name: 'Advertising', href: '/merchant/advertising', icon: TrendingUp },
    { name: 'Settings', href: '/merchant/settings', icon: Settings },
  ]

  const handleLogout = () => {
    logoutMerchant()
    navigate('/merchant/auth')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-soft-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-screen">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-100">
            <Link to="/merchant/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-soft">
                <Building className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-neutral-800">STT Business</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Merchant Info */}
          <div className="p-6 border-b border-neutral-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                <Building className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-800 truncate">
                  {merchant?.businessName}
                </p>
                <p className="text-sm text-neutral-600 truncate">{merchant?.email}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                  merchant?.status === 'Approved' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {merchant?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-6 border-t border-neutral-100">
            <Link
              to="/merchant/events/create"
              className="w-full btn-primary flex items-center justify-center space-x-2 mb-4"
            >
              <Plus className="w-5 h-5" />
              <span>Create Event</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white shadow-soft border-b border-neutral-100 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-xl"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              {/* Notifications */}
              <button className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-2xl transition-all duration-200 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-semibold text-neutral-800 text-sm">
                    {merchant?.businessName}
                  </p>
                  <p className="text-neutral-600 text-xs">{merchant?.subscriptionType} Plan</p>
                </div>
                <div className="w-10 h-10 bg-primary-100 rounded-2xl flex items-center justify-center">
                  <Building className="w-5 h-5 text-primary-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MerchantLayout