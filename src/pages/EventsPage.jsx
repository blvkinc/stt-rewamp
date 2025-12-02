import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, Calendar, MapPin, ArrowRight, TrendingUp, Users, Gift } from 'lucide-react'

const EventsPage = () => {
  const featuredCategories = [
    { name: "Luxury Brunch", icon: "🥂", count: 45, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop" },
    { name: "Rooftop Parties", icon: "🌃", count: 32, image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop" },
    { name: "Beach Clubs", icon: "🏖️", count: 28, image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop" },
    { name: "Corporate Events", icon: "💼", count: 38, image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop" },
    { name: "Weddings", icon: "💒", count: 25, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop" },
    { name: "Live Music", icon: "🎵", count: 42, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop" }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Luxury Brunch at Burj Al Arab",
      venue: "Al Muntaha Restaurant",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      date: "Feb 20, 2024",
      time: "11:00 AM - 3:00 PM",
      price: 299,
      rating: 4.8,
      reviews: 124,
      location: "Burj Al Arab",
      category: "Luxury Brunch",
      attendees: 45
    },
    {
      id: 2,
      title: "Rooftop Party Experience",
      venue: "Sky Lounge Dubai",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
      date: "Feb 22, 2024",
      time: "7:00 PM - 12:00 AM",
      price: 199,
      rating: 4.6,
      reviews: 89,
      location: "Downtown Dubai",
      category: "Party",
      attendees: 120
    },
    {
      id: 3,
      title: "Beach Club Brunch",
      venue: "Azure Beach Club",
      image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop",
      date: "Feb 25, 2024",
      time: "12:00 PM - 4:00 PM",
      price: 249,
      rating: 4.7,
      reviews: 156,
      location: "Palm Jumeirah",
      category: "Beach Brunch",
      attendees: 80
    }
  ]

  const trendingEvents = [
    { name: "Valentine's Day Special", growth: "+45%", bookings: 234 },
    { name: "Weekend Brunch Series", growth: "+32%", bookings: 189 },
    { name: "Ladies Night Events", growth: "+28%", bookings: 156 }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-100 via-neutral-50 to-accent-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-200/20 to-accent-100/20"></div>
        <div className="relative max-w-7xl mx-auto container-padding section-padding">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-700 mb-8 shadow-soft">
              🎉 Discover Amazing Events in Dubai
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-neutral-800 leading-tight">
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Event Experience
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              From luxury brunches to rooftop parties, discover curated events that match your style
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-3 shadow-soft-lg border border-neutral-100 mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search events by name, category, or venue..."
                    className="w-full pl-12 pr-4 py-4 text-neutral-800 rounded-2xl bg-neutral-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all duration-300"
                  />
                </div>
                <Link to="/explore?tab=events" className="btn-primary whitespace-nowrap px-8 py-4 text-center">
                  Explore Events
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
                <div className="text-neutral-600">Active Events</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary-600 mb-2">50K+</div>
                <div className="text-neutral-600">Happy Guests</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary-600 mb-2">150+</div>
                <div className="text-neutral-600">Partner Venues</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary-600 mb-2">4.8★</div>
                <div className="text-neutral-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Browse by Category</h2>
            <p className="text-neutral-600 text-xl max-w-2xl mx-auto">Explore events tailored to your interests and preferences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => (
              <Link
                key={index}
                to={`/explore?tab=events&category=${encodeURIComponent(category.name)}`}
                className="group relative overflow-hidden rounded-3xl shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90">{category.count} events available</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Upcoming Events</h2>
              <p className="text-neutral-600 text-xl">Don't miss out on these popular experiences</p>
            </div>
            <Link to="/explore?tab=events" className="btn-secondary flex items-center space-x-2 px-6 py-3">
              <span>View All Events</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-neutral-100 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-neutral-700">
                      {event.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-neutral-600 mb-4">{event.venue}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-neutral-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-500 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-primary-600">AED {event.price}</div>
                    <span className="text-sm text-neutral-500">per person</span>
                  </div>
                  
                  <Link 
                    to={`/events/${event.id}`}
                    className="w-full btn-primary text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Events */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Trending Now</h2>
            <p className="text-neutral-600 text-xl">Most popular events this week</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingEvents.map((trend, index) => (
              <div key={index} className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-100">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-600" />
                  <span className="text-2xl font-bold text-green-600">{trend.growth}</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-800 mb-2">{trend.name}</h3>
                <p className="text-neutral-600">{trend.bookings} bookings this week</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="section-padding bg-gradient-to-br from-neutral-800 to-neutral-900 text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Book Events With Us?</h2>
            <p className="text-neutral-300 text-xl max-w-2xl mx-auto">Experience the best event booking platform in Dubai</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Gift className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Best Prices</h3>
              <p className="text-neutral-300 text-lg leading-relaxed">Exclusive deals and packages you won't find anywhere else</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-400 to-accent-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Verified Events</h3>
              <p className="text-neutral-300 text-lg leading-relaxed">All events are verified and quality-checked by our team</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Easy Booking</h3>
              <p className="text-neutral-300 text-lg leading-relaxed">Simple, fast, and secure booking process in just a few clicks</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-100 via-accent-50 to-neutral-100">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <div className="bg-white rounded-3xl p-12 shadow-soft-lg border border-neutral-100">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">Ready to Explore?</h2>
            <p className="text-neutral-600 text-xl mb-8 max-w-2xl mx-auto">
              Browse through hundreds of amazing events and find your perfect experience today
            </p>
            
            <Link 
              to="/explore?tab=events"
              className="btn-primary text-lg px-12 py-4 inline-flex items-center space-x-2"
            >
              <span>Browse All Events</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <p className="text-neutral-500 text-sm mt-6">
              Join 50,000+ happy customers who found their perfect event
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventsPage