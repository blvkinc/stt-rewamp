import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { 
  BarChart3, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Star,
  Clock,
  Plus,
  ArrowUpRight
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const MerchantDashboard = () => {
  const { merchant, events, isMerchantAuthenticated } = useMerchant()

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Redirect super admins to their dashboard
  if (merchant?.role === 'super_admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  // Mock analytics data
  const analytics = {
    totalRevenue: merchant?.totalRevenue || 15420,
    totalBookings: merchant?.totalBookings || 89,
    totalEvents: events.length || 12,
    avgRating: merchant?.rating || 4.6,
    monthlyGrowth: 12.5,
    recentBookings: [
      {
        id: 1,
        customerName: "Sarah Ahmed",
        event: "Weekend Brunch",
        date: "2024-12-15",
        amount: 299,
        status: "Confirmed"
      },
      {
        id: 2,
        customerName: "Michael Johnson",
        event: "Business Lunch",
        date: "2024-12-14",
        amount: 149,
        status: "Completed"
      },
      {
        id: 3,
        customerName: "Fatima Al-Zahra",
        event: "Anniversary Dinner",
        date: "2024-12-13",
        amount: 399,
        status: "Confirmed"
      }
    ],
    topEvents: [
      {
        id: 1,
        name: "Weekend Brunch Buffet",
        bookings: 24,
        revenue: 7176,
        rating: 4.8
      },
      {
        id: 2,
        name: "Business Lunch Special",
        bookings: 18,
        revenue: 2682,
        rating: 4.5
      },
      {
        id: 3,
        name: "Romantic Dinner",
        bookings: 15,
        revenue: 5985,
        rating: 4.9
      }
    ]
  }

  const StatCard = ({ title, value, icon: Icon, change, color = "primary" }) => (
    <div className="card border border-neutral-100 hover:shadow-soft-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-neutral-600 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-neutral-800 mt-2">{value}</p>
            {change && (
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-green-600 text-sm font-medium">+{change}%</span>
                <span className="text-neutral-500 text-sm ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-2xl flex items-center justify-center shadow-soft`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <MerchantLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              Welcome back, {merchant?.businessName}!
            </h1>
            <p className="text-neutral-600">Here's what's happening with your business today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create Event</span>
            </button>
          </div>
        </div>

        {/* Status Alert */}
        {merchant?.status === 'Pending Approval' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-800">Application Under Review</h3>
                <p className="text-yellow-700">
                  Your venue application is being reviewed. You'll be notified once approved.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={`AED ${analytics.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            change={analytics.monthlyGrowth}
            color="primary"
          />
          <StatCard
            title="Total Bookings"
            value={analytics.totalBookings}
            icon={Calendar}
            change={8.2}
            color="accent"
          />
          <StatCard
            title="Active Events"
            value={analytics.totalEvents}
            icon={BarChart3}
            color="primary"
          />
          <StatCard
            title="Average Rating"
            value={analytics.avgRating}
            icon={Star}
            color="accent"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">Recent Bookings</h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {analytics.recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-2xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-800">{booking.customerName}</p>
                        <p className="text-neutral-600 text-sm">{booking.event}</p>
                        <p className="text-neutral-500 text-xs">{booking.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">AED {booking.amount}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performing Events */}
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-800">Top Performing Events</h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {analytics.topEvents.map((event, index) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-800">{event.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-600">
                          <span>{event.bookings} bookings</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{event.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">AED {event.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Packages Section */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-800">Your Packages</h2>
                <p className="text-neutral-600 text-sm">Create and manage custom packages for your events</p>
              </div>
              <div className="flex space-x-3">
                <Link to="/merchant/packages" className="btn-secondary flex items-center space-x-2">
                  <span>View All</span>
                </Link>
                <Link to="/merchant/packages/create" className="btn-primary flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Create Package</span>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Package Card 1 */}
              <div className="border border-neutral-200 rounded-2xl p-6 hover:shadow-soft-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-neutral-800 text-lg mb-1">Classic Package</h3>
                    <p className="text-neutral-600 text-sm">Standard dining experience</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary-600 mb-1">AED 299</div>
                  <p className="text-neutral-500 text-sm">per person</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <Users className="w-4 h-4" />
                    <span>Up to 2 guests</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>45 bookings</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 btn-secondary text-sm py-2">Edit</button>
                  <button className="flex-1 btn-primary text-sm py-2">View</button>
                </div>
              </div>

              {/* Package Card 2 */}
              <div className="border border-neutral-200 rounded-2xl p-6 hover:shadow-soft-lg transition-all duration-300 relative">
                <div className="absolute -top-3 left-6">
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-neutral-800 text-lg mb-1">Premium Package</h3>
                    <p className="text-neutral-600 text-sm">Enhanced experience</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary-600 mb-1">AED 449</div>
                  <p className="text-neutral-500 text-sm">per person</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <Users className="w-4 h-4" />
                    <span>Up to 4 guests</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>89 bookings</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 btn-secondary text-sm py-2">Edit</button>
                  <button className="flex-1 btn-primary text-sm py-2">View</button>
                </div>
              </div>

              {/* Package Card 3 */}
              <div className="border border-neutral-200 rounded-2xl p-6 hover:shadow-soft-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-neutral-800 text-lg mb-1">VIP Package</h3>
                    <p className="text-neutral-600 text-sm">Ultimate luxury</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-primary-600 mb-1">AED 699</div>
                  <p className="text-neutral-500 text-sm">per person</p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <Users className="w-4 h-4" />
                    <span>Up to 6 guests</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <Calendar className="w-4 h-4" />
                    <span>32 bookings</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 btn-secondary text-sm py-2">Edit</button>
                  <button className="flex-1 btn-primary text-sm py-2">View</button>
                </div>
              </div>
            </div>

            {/* Package Quick Actions */}
            <div className="pt-6 border-t border-neutral-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center space-x-2 p-4 border border-neutral-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-neutral-800">View Analytics</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 border border-neutral-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                  <BarChart3 className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-neutral-800">Compare Packages</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 border border-neutral-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                  <Plus className="w-5 h-5 text-primary-600" />
                  <span className="font-medium text-neutral-800">Duplicate Package</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <h2 className="text-xl font-bold text-neutral-800 mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl border border-primary-200 hover:shadow-soft-lg transition-all duration-300 text-left group">
                <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">Create New Event</h3>
                <p className="text-neutral-600 text-sm">Add a new dining experience</p>
              </button>

              <button className="p-6 bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl border border-accent-200 hover:shadow-soft-lg transition-all duration-300 text-left group">
                <div className="w-12 h-12 bg-accent-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">View Analytics</h3>
                <p className="text-neutral-600 text-sm">Track your performance</p>
              </button>

              <button className="p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-200 hover:shadow-soft-lg transition-all duration-300 text-left group">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">Promote Events</h3>
                <p className="text-neutral-600 text-sm">Boost your visibility</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </MerchantLayout>
  )
}

export default MerchantDashboard