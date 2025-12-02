import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, MapPin, ArrowRight, Building, Users, Award, TrendingUp } from 'lucide-react'

const VenuesPage = () => {
  const venueCategories = [
    { name: "Beach Clubs", icon: "🏖️", count: 28, image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop" },
    { name: "Rooftop Bars", icon: "🌃", count: 32, image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop" },
    { name: "Fine Dining", icon: "🍽️", count: 45, image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop" },
    { name: "Conference Centers", icon: "💼", count: 22, image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop" },
    { name: "Banquet Halls", icon: "🎭", count: 35, image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=400&h=300&fit=crop" },
    { name: "Garden Venues", icon: "🌳", count: 18, image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop" }
  ]

  const featuredVenues = [
    {
      id: 1,
      name: "Azure Beach Club",
      category: "Beach Club",
      image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 156,
      location: "Palm Jumeirah",
      capacity: 300,
      priceRange: "AED 200-400",
      amenities: ["Beach Access", "Pool", "Valet Parking", "WiFi"],
      upcomingEvents: 8
    },
    {
      id: 2,
      name: "Sky Lounge Dubai",
      category: "Rooftop Bar",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
      location: "Downtown Dubai",
      capacity: 200,
      priceRange: "AED 150-300",
      amenities: ["City Views", "Cocktail Bar", "Outdoor Seating", "DJ"],
      upcomingEvents: 12
    },
    {
      id: 3,
      name: "Grand Convention Center",
      category: "Conference Center",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 203,
      location: "DIFC",
      capacity: 500,
      priceRange: "AED 300-600",
      amenities: ["AV Equipment", "WiFi", "Catering", "Parking"],
      upcomingEvents: 15
    }
  ]

  const topLocations = [
    { name: "Downtown Dubai", venues: 45, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop" },
    { name: "Palm Jumeirah", venues: 32, image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=400&h=300&fit=crop" },
    { name: "Dubai Marina", venues: 38, image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&h=300&fit=crop" },
    { name: "DIFC", venues: 28, image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=300&fit=crop" }
  ]

  const venueFeatures = [
    { icon: Building, title: "150+ Premium Venues", description: "Carefully curated selection of Dubai's finest venues" },
    { icon: Award, title: "Quality Verified", description: "All venues are inspected and quality-certified" },
    { icon: Users, title: "Expert Support", description: "Dedicated team to help you find the perfect venue" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-100 via-neutral-50 to-accent-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-200/20 to-accent-100/20"></div>
        <div className="relative max-w-7xl mx-auto container-padding section-padding">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-primary-700 mb-8 shadow-soft">
              🏢 Dubai's Premier Venue Directory
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-neutral-800 leading-tight">
              Discover Perfect
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Event Venues
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              From beachfront clubs to rooftop bars, find the ideal venue for your next event
            </p>
            
            {/* Search Bar */}
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-3 shadow-soft-lg border border-neutral-100 mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search venues by name, location, or type..."
                    className="w-full pl-12 pr-4 py-4 text-neutral-800 rounded-2xl bg-neutral-50 border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white transition-all duration-300"
                  />
                </div>
                <Link to="/explore?tab=venues" className="btn-primary whitespace-nowrap px-8 py-4 text-center">
                  Explore Venues
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary-600 mb-2">150+</div>
                <div className="text-neutral-600">Premium Venues</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary-600 mb-2">25K+</div>
                <div className="text-neutral-600">Events Hosted</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary-600 mb-2">12</div>
                <div className="text-neutral-600">Dubai Locations</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary-600 mb-2">4.7★</div>
                <div className="text-neutral-600">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue Categories */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Browse by Type</h2>
            <p className="text-neutral-600 text-xl max-w-2xl mx-auto">Find the perfect venue type for your event</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venueCategories.map((category, index) => (
              <Link
                key={index}
                to={`/explore?tab=venues&category=${encodeURIComponent(category.name)}`}
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
                    <p className="text-white/90">{category.count} venues available</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-primary-50/30">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Featured Venues</h2>
              <p className="text-neutral-600 text-xl">Most popular venues this month</p>
            </div>
            <Link to="/explore?tab=venues" className="btn-secondary flex items-center space-x-2 px-6 py-3">
              <span>View All Venues</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVenues.map((venue) => (
              <div key={venue.id} className="bg-white rounded-2xl overflow-hidden shadow-soft border border-neutral-100 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-neutral-700">
                      {venue.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{venue.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800 mb-2 group-hover:text-primary-600 transition-colors">
                    {venue.name}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-neutral-500 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-neutral-500 text-sm">
                      <Users className="w-4 h-4" />
                      <span>Capacity: {venue.capacity} guests</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.amenities.slice(0, 3).map((amenity, index) => (
                      <span key={index} className="px-2 py-1 bg-neutral-100 text-neutral-700 rounded-lg text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-bold text-primary-600">{venue.priceRange}</div>
                    <span className="text-sm text-neutral-500">{venue.upcomingEvents} events</span>
                  </div>
                  
                  <Link 
                    to={`/venues/${venue.id}`}
                    className="w-full btn-primary text-center block"
                  >
                    View Venue
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Locations */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-6">Explore by Location</h2>
            <p className="text-neutral-600 text-xl">Discover venues in Dubai's most popular areas</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topLocations.map((location, index) => (
              <Link
                key={index}
                to={`/explore?tab=venues&location=${encodeURIComponent(location.name)}`}
                className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-bold mb-1">{location.name}</h3>
                    <p className="text-white/90 text-sm">{location.venues} venues</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Venues */}
      <section className="section-padding bg-gradient-to-br from-neutral-800 to-neutral-900 text-white">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Our Venues?</h2>
            <p className="text-neutral-300 text-xl max-w-2xl mx-auto">Premium venues with exceptional service and amenities</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {venueFeatures.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-300 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-100 via-accent-50 to-neutral-100">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <div className="bg-white rounded-3xl p-12 shadow-soft-lg border border-neutral-100">
            <h2 className="text-4xl font-bold text-neutral-800 mb-4">Find Your Perfect Venue</h2>
            <p className="text-neutral-600 text-xl mb-8 max-w-2xl mx-auto">
              Browse through our curated selection of premium venues and book your ideal space today
            </p>
            
            <Link 
              to="/explore?tab=venues"
              className="btn-primary text-lg px-12 py-4 inline-flex items-center space-x-2"
            >
              <span>Browse All Venues</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <p className="text-neutral-500 text-sm mt-6">
              Trusted by 150+ venues and 25,000+ successful events
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default VenuesPage