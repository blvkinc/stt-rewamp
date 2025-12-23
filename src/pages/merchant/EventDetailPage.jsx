import React, { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  Edit3,
  Eye,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Star,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  MessageSquare,
  Settings
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const EventDetailPage = () => {
  const { id } = useParams()
  const { merchant, events, isMerchantAuthenticated } = useMerchant()
  const [activeTab, setActiveTab] = useState('overview')
  const [event, setEvent] = useState(null)

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  useEffect(() => {
    // Find event by ID
    const foundEvent = events.find(e => e.id === parseInt(id))
    if (foundEvent) {
      setEvent(foundEvent)
    }
  }, [id, events])

  if (!event) {
    return (
      <MerchantLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-neutral-800 mb-4">Event Not Found</h2>
          <p className="text-neutral-600 mb-6">The event you're looking for doesn't exist.</p>
          <Link to="/merchant/events" className="btn-primary">
            Back to Events
          </Link>
        </div>
      </MerchantLayout>
    )
  }

  // Mock additional data
  const eventStats = {
    totalBookings: 24,
    totalRevenue: 7176,
    averageRating: 4.8,
    reviewCount: 18,
    conversionRate: 12.5
  }

  const recentBookings = [
    {
      id: 1,
      customerName: "Sarah Ahmed",
      package: "Premium Package",
      date: "2024-12-15",
      guests: 2,
      amount: 598,
      status: "Confirmed"
    },
    {
      id: 2,
      customerName: "Michael Johnson",
      package: "Individual Package",
      date: "2024-12-14",
      guests: 1,
      amount: 299,
      status: "Completed"
    },
    {
      id: 3,
      customerName: "Fatima Al-Zahra",
      package: "Couple Package",
      date: "2024-12-13",
      guests: 2,
      amount: 498,
      status: "Confirmed"
    }
  ]

  const reviews = [
    {
      id: 1,
      customerName: "John Doe",
      rating: 5,
      comment: "Amazing experience! The food was exceptional and the service was top-notch.",
      date: "2024-12-10",
      package: "Premium Package"
    },
    {
      id: 2,
      customerName: "Lisa Smith",
      rating: 4,
      comment: "Great atmosphere and delicious food. Will definitely come back!",
      date: "2024-12-08",
      package: "Individual Package"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700'
      case 'Draft':
        return 'bg-yellow-100 text-yellow-700'
      case 'Pending Approval':
        return 'bg-blue-100 text-blue-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4" />
      case 'Rejected':
        return <XCircle className="w-4 h-4" />
      case 'Pending Approval':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const StatCard = ({ title, value, icon: Icon, color = "primary" }) => (
    <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-neutral-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-neutral-800 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br from-${color}-400 to-${color}-600 rounded-2xl flex items-center justify-center shadow-soft`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <Link
            to="/merchant/events"
            className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary-500 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Events</span>
          </Link>
          <div className="flex items-center space-x-4 mb-2">
            <h1 className="text-3xl font-bold text-neutral-800">{event.title}</h1>
            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
              {getStatusIcon(event.status)}
              <span>{event.status}</span>
            </span>
          </div>
          <div className="flex items-center space-x-6 text-neutral-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{event.startTime} - {event.endTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{merchant?.businessName}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Link
            to={`/merchant/events/${event.id}/edit`}
            className="btn-secondary flex items-center space-x-2"
          >
            <Edit3 className="w-5 h-5" />
            <span>Edit Event</span>
          </Link>
          <Link
            to={`/events/${event.id}`}
            target="_blank"
            className="btn-primary flex items-center space-x-2"
          >
            <Eye className="w-5 h-5" />
            <span>View Live</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Bookings"
          value={eventStats.totalBookings}
          icon={Calendar}
          color="primary"
        />
        <StatCard
          title="Total Revenue"
          value={`AED ${eventStats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="accent"
        />
        <StatCard
          title="Average Rating"
          value={eventStats.averageRating}
          icon={Star}
          color="primary"
        />
        <StatCard
          title="Reviews"
          value={eventStats.reviewCount}
          icon={MessageSquare}
          color="accent"
        />
        <StatCard
          title="Conversion Rate"
          value={`${eventStats.conversionRate}%`}
          icon={BarChart3}
          color="primary"
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-soft">
        <div className="border-b border-neutral-100">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-colors ${activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Event Details */}
                <div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">Event Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-neutral-600">Description</label>
                      <p className="text-neutral-800 mt-1">{event.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-neutral-600">Event Type</label>
                        <p className="text-neutral-800 mt-1">{event.eventType}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-neutral-600">Capacity</label>
                        <p className="text-neutral-800 mt-1">{event.capacity} guests</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Packages */}
                <div>
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">Packages</h3>
                  <div className="space-y-3">
                    {event.packages?.map((pkg) => (
                      <div key={pkg.id} className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-neutral-800">{pkg.name}</h4>
                          <span className="text-lg font-bold text-primary-600">AED {pkg.price}</span>
                        </div>
                        <p className="text-neutral-600 text-sm mb-2">{pkg.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-500">
                          <span className="capitalize">{pkg.type}</span>
                          <span>•</span>
                          <span>{pkg.guestCount} guest{pkg.guestCount > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800">Recent Bookings</h3>
                <button className="btn-secondary">Export Bookings</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Customer</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Package</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Guests</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-neutral-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-4 px-4">
                          <div className="font-medium text-neutral-800">{booking.customerName}</div>
                        </td>
                        <td className="py-4 px-4 text-neutral-600">{booking.package}</td>
                        <td className="py-4 px-4 text-neutral-600">{booking.date}</td>
                        <td className="py-4 px-4 text-neutral-600">{booking.guests}</td>
                        <td className="py-4 px-4 font-medium text-primary-600">AED {booking.amount}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${booking.status === 'Confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                            }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-neutral-800">Customer Reviews</h3>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-neutral-800">{eventStats.averageRating}</span>
                  <span className="text-neutral-600">({eventStats.reviewCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-neutral-800">{review.customerName}</h4>
                        <p className="text-sm text-neutral-600">{review.package} • {review.date}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-neutral-300'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-neutral-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Analytics Dashboard</h3>
              <p className="text-neutral-600">Detailed analytics and insights coming soon...</p>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Event Settings</h3>
              <p className="text-neutral-600">Advanced event configuration options coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default EventDetailPage