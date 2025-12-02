import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Copy,
  Eye,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  MoreVertical,
  Star,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const PackagesPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPackages, setSelectedPackages] = useState([])

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock packages data
  const packages = [
    {
      id: 1,
      name: 'Classic Brunch Package',
      description: 'Perfect introduction to our luxury brunch experience',
      price: 299,
      originalPrice: 349,
      status: 'active',
      event: 'Weekend Brunch',
      maxGuests: 2,
      bookings: 45,
      revenue: 13455,
      rating: 4.7,
      reviews: 32,
      features: ['Welcome drink', 'International buffet', 'Soft beverages', '2-hour dining', 'Valet parking'],
      createdAt: '2024-01-15',
      lastModified: '2024-02-01'
    },
    {
      id: 2,
      name: 'Premium Brunch Package',
      description: 'Enhanced experience with premium beverages and extras',
      price: 449,
      originalPrice: 529,
      status: 'active',
      event: 'Weekend Brunch',
      maxGuests: 4,
      bookings: 89,
      revenue: 39961,
      rating: 4.9,
      reviews: 67,
      features: ['Premium cocktail', 'International buffet', 'Premium beverages', '3-hour dining', 'Ocean view', 'Valet parking', 'Dessert selection'],
      createdAt: '2024-01-10',
      lastModified: '2024-02-05',
      popular: true
    },
    {
      id: 3,
      name: 'VIP Experience Package',
      description: 'Ultimate luxury with exclusive perks and personalized service',
      price: 699,
      originalPrice: 799,
      status: 'active',
      event: 'Weekend Brunch',
      maxGuests: 6,
      bookings: 32,
      revenue: 22368,
      rating: 5.0,
      reviews: 28,
      features: ['Private reception', 'VIP buffet', 'Premium champagne', '4-hour dining', 'Panoramic views', 'Personal sommelier', 'Spa access', 'Photography'],
      createdAt: '2024-01-20',
      lastModified: '2024-02-03'
    },
    {
      id: 4,
      name: 'Business Lunch Package',
      description: 'Professional dining experience for corporate meetings',
      price: 149,
      originalPrice: 179,
      status: 'active',
      event: 'Business Lunch',
      maxGuests: 4,
      bookings: 28,
      revenue: 4172,
      rating: 4.5,
      reviews: 18,
      features: ['Private dining room', 'Business menu', 'Coffee & tea', 'WiFi', 'Presentation equipment'],
      createdAt: '2024-01-25',
      lastModified: '2024-01-30'
    },
    {
      id: 5,
      name: 'Romantic Dinner Package',
      description: 'Intimate dining experience for couples',
      price: 399,
      originalPrice: 449,
      status: 'draft',
      event: 'Romantic Dinner',
      maxGuests: 2,
      bookings: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      features: ['Private table', 'Candlelight setup', '5-course menu', 'Wine pairing', 'Live music', 'Roses'],
      createdAt: '2024-02-10',
      lastModified: '2024-02-10'
    },
    {
      id: 6,
      name: 'Family Celebration Package',
      description: 'Perfect for family gatherings and celebrations',
      price: 899,
      originalPrice: 999,
      status: 'inactive',
      event: 'Family Events',
      maxGuests: 8,
      bookings: 15,
      revenue: 13485,
      rating: 4.6,
      reviews: 12,
      features: ['Private area', 'Family menu', 'Kids activities', 'Cake included', 'Decorations', 'Photography'],
      createdAt: '2023-12-01',
      lastModified: '2024-01-15'
    }
  ]

  // Filter packages
  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.event.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Calculate stats
  const stats = {
    total: packages.length,
    active: packages.filter(p => p.status === 'active').length,
    totalBookings: packages.reduce((sum, p) => sum + p.bookings, 0),
    totalRevenue: packages.reduce((sum, p) => sum + p.revenue, 0),
    avgRating: (packages.reduce((sum, p) => sum + p.rating, 0) / packages.filter(p => p.rating > 0).length).toFixed(1)
  }

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      draft: 'bg-yellow-100 text-yellow-700'
    }
    return styles[status] || styles.draft
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />
      case 'inactive': return <XCircle className="w-4 h-4" />
      case 'draft': return <Clock className="w-4 h-4" />
      default: return null
    }
  }

  return (
    <MerchantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Packages</h1>
            <p className="text-neutral-600">Create and manage your event packages</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="btn-secondary flex items-center space-x-2">
              <Copy className="w-5 h-5" />
              <span>Duplicate</span>
            </button>
            <Link to="/merchant/packages/create" className="btn-primary flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Create Package</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Total Packages</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">{stats.total}</p>
                  <p className="text-sm text-neutral-500 mt-1">{stats.active} active</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Total Bookings</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">{stats.totalBookings}</p>
                  <p className="text-sm text-green-600 mt-1">+12% this month</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">AED {stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-1">+18% this month</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Average Rating</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">{stats.avgRating}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-neutral-500 ml-1">out of 5.0</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-neutral-600 text-sm font-medium">Avg. Package Price</p>
                  <p className="text-3xl font-bold text-neutral-800 mt-2">AED {Math.round(packages.reduce((sum, p) => sum + p.price, 0) / packages.length)}</p>
                  <p className="text-sm text-neutral-500 mt-1">per person</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card border border-neutral-100">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search packages by name, description, or event..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Price Range</label>
                    <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none">
                      <option>All Prices</option>
                      <option>Under AED 200</option>
                      <option>AED 200-400</option>
                      <option>AED 400-600</option>
                      <option>Above AED 600</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Event Type</label>
                    <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none">
                      <option>All Events</option>
                      <option>Weekend Brunch</option>
                      <option>Business Lunch</option>
                      <option>Romantic Dinner</option>
                      <option>Family Events</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Guest Capacity</label>
                    <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none">
                      <option>All Capacities</option>
                      <option>1-2 guests</option>
                      <option>3-4 guests</option>
                      <option>5-6 guests</option>
                      <option>7+ guests</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Sort By</label>
                    <select className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none">
                      <option>Most Recent</option>
                      <option>Most Popular</option>
                      <option>Highest Revenue</option>
                      <option>Best Rating</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <div key={pkg.id} className="card border border-neutral-100 hover:shadow-soft-lg transition-all duration-300 relative">
              {pkg.popular && (
                <div className="absolute -top-3 left-6 z-10">
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-800 mb-1">{pkg.name}</h3>
                    <p className="text-sm text-neutral-600 mb-2">{pkg.description}</p>
                    <p className="text-xs text-neutral-500">{pkg.event}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(pkg.status)}`}>
                      {getStatusIcon(pkg.status)}
                      <span className="capitalize">{pkg.status}</span>
                    </span>
                    <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-neutral-600" />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-primary-600">AED {pkg.price}</span>
                    {pkg.originalPrice > pkg.price && (
                      <span className="text-lg text-neutral-500 line-through">AED {pkg.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500">per person</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-neutral-200">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Bookings</p>
                    <p className="text-lg font-bold text-neutral-800">{pkg.bookings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Revenue</p>
                    <p className="text-lg font-bold text-neutral-800">{pkg.revenue > 0 ? `${(pkg.revenue / 1000).toFixed(1)}K` : '0'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Rating</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <p className="text-lg font-bold text-neutral-800">{pkg.rating > 0 ? pkg.rating : 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-neutral-700 mb-2">Includes:</p>
                  <div className="space-y-1">
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs text-neutral-600">
                        <CheckCircle className="w-3 h-3 text-primary-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {pkg.features.length > 3 && (
                      <p className="text-xs text-neutral-500">+{pkg.features.length - 3} more features</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <button className="flex items-center justify-center space-x-1 px-3 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 px-3 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-sm">
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 px-3 py-2 border border-neutral-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors text-sm">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="card border border-neutral-100">
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">No packages found</h3>
              <p className="text-neutral-600 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterStatus('all')
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </MerchantLayout>
  )
}

export default PackagesPage