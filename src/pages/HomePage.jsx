import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Star, ChevronRight } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'

const HomePage = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Luxury Brunch at Burj Al Arab",
      venue: "Al Muntaha Restaurant",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 124,
      price: 299,
      location: "Burj Al Arab",
      category: "Brunch"
    },
    {
      id: 2,
      title: "Rooftop Party Experience",
      venue: "Sky Lounge Dubai",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 89,
      price: 199,
      location: "Downtown Dubai",
      category: "Party"
    },
    {
      id: 3,
      title: "Beach Club Brunch",
      venue: "Azure Beach Club",
      image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 156,
      price: 249,
      location: "Palm Jumeirah",
      category: "Beach"
    },
    {
      id: 4,
      title: "Fine Dining Experience",
      venue: "Michelin Star Restaurant",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 203,
      price: 399,
      location: "DIFC",
      category: "Dining"
    }
  ]

  const categories = [
    { name: "Brunch", icon: "🥂", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop" },
    { name: "Rooftop", icon: "🌃", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=400&fit=crop" },
    { name: "Beach", icon: "🏖️", image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=400&fit=crop" },
    { name: "Dining", icon: "🍽️", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop" },
    { name: "Events", icon: "🎉", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=400&fit=crop" },
    { name: "Nightlife", icon: "🌙", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop" }
  ]

  const topVenues = [
    {
      id: 1,
      name: "Azure Beach Club",
      image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 156,
      location: "Palm Jumeirah"
    },
    {
      id: 2,
      name: "Sky Lounge Dubai",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 89,
      location: "Downtown Dubai"
    },
    {
      id: 3,
      name: "Grand Ballroom",
      image: "https://images.unsplash.com/photo-1519167758481-83f29da8c2b6?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 124,
      location: "Business Bay"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Airbnb Style */}
      <section className="relative h-[70vh] min-h-[600px]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <h1 className="text-5xl md:text-6xl font-semibold text-white mb-6">
              Not sure where to dine?
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover unique dining experiences and events
            </p>
            
            {/* Minimal & Elegant Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <Card className="relative bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                  <CardContent className="p-2">
                    <div className="flex items-center">
                      <div className="flex-1 flex items-center px-6 py-4">
                        <Search className="w-5 h-5 text-gray-400 mr-4 group-hover:text-rose-500 transition-colors duration-300" />
                        <input
                          type="text"
                          placeholder="Where would you like to dine tonight?"
                          className="flex-1 text-lg text-gray-700 placeholder:text-gray-400 bg-transparent outline-none"
                        />
                      </div>
                      <Button
                        size="lg"
                        className="m-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        Discover
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Elegant Quick Filters */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {['Tonight', 'This Weekend', 'Fine Dining', 'Rooftop', 'Beach Club'].map((filter, index) => (
                  <button
                    key={filter}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories - Airbnb Style */}
      <section className="py-12 px-4 sm:px-6 lg:px-20 border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category, index) => (
              <Link 
                key={index} 
                to={`/events?category=${category.name}`}
                className="flex flex-col items-center gap-2 min-w-[80px] group"
              >
                <div className="w-6 h-6 text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {category.icon}
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900 transition-colors whitespace-nowrap">
                  {category.name}
                </span>
                <div className="h-0.5 w-full bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events - Airbnb Grid Style */}
      <section className="py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Featured experiences
            </h2>
            <Link to="/events">
              <Button variant="ghost" className="text-sm font-semibold">
                Show all
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`} className="group">
                <div className="space-y-3">
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {event.location}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{event.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.venue}</p>
                    <p className="text-sm">
                      <span className="font-semibold text-gray-900">AED {event.price}</span>
                      <span className="text-gray-600"> per person</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Venues - Airbnb Style */}
      <section className="py-12 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Popular venues
            </h2>
            <p className="text-gray-600">
              Discover the most loved venues in Dubai
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topVenues.map((venue) => (
              <Link key={venue.id} to={`/venues/${venue.id}`} className="group">
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <img 
                      src={venue.image} 
                      alt={venue.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{venue.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{venue.location}</p>
                    <p className="text-sm text-gray-600">{venue.reviews} reviews</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Section - Airbnb Style */}
      <section className="py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Inspiration for your next experience
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/events" className="group">
              <div className="relative h-80 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop"
                  alt="Dining"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-semibold mb-2">Unique dining</h3>
                  <p className="text-lg">Experiences hosted by locals</p>
                </div>
              </div>
            </Link>
            
            <Link to="/venues" className="group">
              <div className="relative h-80 rounded-xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=800&h=600&fit=crop"
                  alt="Venues"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-semibold mb-2">Amazing venues</h3>
                  <p className="text-lg">Perfect spaces for any occasion</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage