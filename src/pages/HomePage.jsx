import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Star, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import EventCard from '../components/EventCard'

// Enhanced smooth scroll utility
const smoothScrollTo = (element, offset = 80) => {
  if (!element) return
  
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const resultsRef = useRef(null)
  const navigate = useNavigate()

  // Scroll to results when search or category changes
  useEffect(() => {
    if ((searchTerm || selectedCategory) && resultsRef.current) {
      // Add a small delay to ensure DOM is updated and add smooth animation
      setTimeout(() => {
        smoothScrollTo(resultsRef.current, 100)
      }, 150)
    }
  }, [searchTerm, selectedCategory])

  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Navigate to explore page with search term
      navigate(`/explore?search=${encodeURIComponent(searchTerm.trim())}`)
    } else if (resultsRef.current) {
      setTimeout(() => {
        smoothScrollTo(resultsRef.current, 100)
      }, 150)
    }
  }

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(selectedCategory === categoryName ? '' : categoryName)
    // Scroll will be triggered by useEffect
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  
  const featuredEvents = [
    {
      id: 1,
      title: "Luxury Brunch at Burj Al Arab",
      venue: "Al Muntaha Restaurant",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 124,
      price: 299,
      location: "Burj Al Arab",
      category: "Brunch",
      time: "11:00 AM - 3:00 PM"
    },
    {
      id: 2,
      title: "Rooftop Party Experience",
      venue: "Sky Lounge Dubai",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 89,
      price: 199,
      location: "Downtown Dubai",
      category: "Party",
      time: "7:00 PM - 12:00 AM"
    },
    {
      id: 3,
      title: "Beach Club Brunch",
      venue: "Azure Beach Club",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 156,
      price: 249,
      location: "Palm Jumeirah",
      category: "Beach",
      time: "12:00 PM - 4:00 PM"
    },
    {
      id: 4,
      title: "Fine Dining Experience",
      venue: "Michelin Star Restaurant",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      rating: 4.9,
      reviews: 203,
      price: 399,
      location: "DIFC",
      category: "Dining",
      time: "7:00 PM - 11:00 PM"
    }
  ]

  const categories = [
    { name: "Brunch", icon: "🥂" },
    { name: "Rooftop", icon: "🌃" },
    { name: "Beach", icon: "🏖️" },
    { name: "Dining", icon: "🍽️" },
    { name: "Events", icon: "🎉" },
    { name: "Nightlife", icon: "🌙" }
  ]

  const topVenues = [
    {
      id: 1,
      name: "Azure Beach Club",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      rating: 4.7,
      reviews: 156,
      location: "Palm Jumeirah"
    },
    {
      id: 2,
      name: "Sky Lounge Dubai",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
      rating: 4.6,
      reviews: 89,
      location: "Downtown Dubai"
    },
    {
      id: 3,
      name: "Grand Ballroom",
      image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop",
      rating: 4.8,
      reviews: 124,
      location: "Business Bay"
    }
  ]

  // Filter events based on search and category
  const filteredEvents = featuredEvents.filter(event => {
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || event.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Airbnb Style */}
      <section className="relative h-[70vh] min-h-[600px]">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <motion.h1 
              className="text-5xl md:text-6xl font-semibold text-white mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Discover amazing experiences
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Find events, venues, and dining experiences in Dubai
            </motion.p>
            
            {/* Minimal & Elegant Search Bar */}
            <motion.div 
              className="max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <div className="relative group">
                <motion.div 
                  className="absolute inset-0 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to right, #A76DB7, #6CB5F8, #F26D40)'
                  }}
                  animate={{ 
                    scale: [1, 1.02, 1],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Card className="relative bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                  <CardContent className="p-2">
                    <div className="flex items-center">
                      <div className="flex-1 flex items-center px-6 py-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <Search className="w-5 h-5 text-gray-400 mr-4 group-hover:text-brand-purple transition-colors duration-300" style={{ color: '#A76DB7' }} />
                        </motion.div>
                        <input
                          type="text"
                          placeholder="Search events, venues, or experiences..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="flex-1 text-lg text-gray-700 placeholder:text-gray-400 bg-transparent outline-none"
                        />
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="lg"
                          onClick={handleSearch}
                          className="m-2 px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-white"
                          style={{
                            background: 'linear-gradient(to right, #A76DB7, #6CB5F8)',
                          }}
                        >
                          {searchTerm.trim() ? 'Search' : 'Explore'}
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Category Filters Under Search Bar */}
              <motion.div 
                className="flex flex-wrap justify-center gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.name
                        ? 'text-white shadow-lg'
                        : 'bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30'
                    }`}
                    style={selectedCategory === category.name ? {
                      background: 'linear-gradient(to right, #A76DB7, #6CB5F8)'
                    } : {}}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.7 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </motion.button>
                ))}
              </motion.div>
              
              {/* Elegant Quick Filters */}
              <motion.div 
                className="flex flex-wrap justify-center gap-3 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                {[
                  { label: 'Events', path: '/events' },
                  { label: 'Venues', path: '/venues' },
                  { label: 'Fine Dining', path: '/explore?category=dining' },
                  { label: 'Special Offers', path: '/explore?offers=true' }
                ].map((filter, index) => (
                  <motion.div
                    key={filter.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.3 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -3
                    }}
                  >
                    <Link
                      to={filter.path}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 rounded-full text-sm font-medium transition-all duration-300"
                    >
                      {filter.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Events - Airbnb Grid Style */}
      <section ref={resultsRef} className="py-12 px-4 sm:px-6 lg:px-20 scroll-target">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-gray-900">
              {selectedCategory || searchTerm ? `Search Results (${filteredEvents.length})` : 'Featured experiences'}
            </h2>
            <Link to="/events">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" className="text-sm font-semibold">
                  Show all
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {filteredEvents.map((event, index) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>

          {filteredEvents.length === 0 && (selectedCategory || searchTerm) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Card className="text-center py-16">
                <CardContent>
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ 
                      rotate: [0, -10, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    🔍
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    No experiences found
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Try adjusting your search criteria or browse all experiences
                  </motion.p>
                  <motion.div 
                    className="flex gap-4 justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={() => { setSearchTerm(''); setSelectedCategory('') }}>
                        Clear Filters
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" asChild>
                        <Link to="/events">Browse All Events</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Top Venues - Airbnb Style */}
      <section className="py-12 px-4 sm:px-6 lg:px-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Popular venues
            </h2>
            <p className="text-gray-600">
              Discover the most loved venues in Dubai
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Link to={`/venues/${venue.id}`} className="group">
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <motion.img 
                        src={venue.image} 
                        alt={venue.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{venue.name}</h3>
                        <div className="flex items-center gap-1">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Star className="w-4 h-4 fill-current" />
                          </motion.div>
                          <span className="text-sm font-medium">{venue.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{venue.location}</p>
                      <p className="text-sm text-gray-600">{venue.reviews} reviews</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiration Section - Airbnb Style */}
      <section className="py-16 px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-2xl font-semibold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Inspiration for your next experience
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Link to="/events" className="group">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
                    alt="Dining"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.div 
                    className="absolute bottom-6 left-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl font-semibold mb-2">Unique dining</h3>
                    <p className="text-lg">Experiences hosted by locals</p>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Link to="/venues" className="group">
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <motion.img 
                    src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop"
                    alt="Venues"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.div 
                    className="absolute bottom-6 left-6 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-3xl font-semibold mb-2">Amazing venues</h3>
                    <p className="text-lg">Perfect spaces for any occasion</p>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage