import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, Filter, MapPin, Star, Calendar, Clock, Users, Grid, List, Settings, ArrowRight, Heart, Gift } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import EventCard from '../components/EventCard'
import VenueCard from '../components/VenueCard'

const ExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // Filters
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    location: searchParams.get('location') || 'all',
    priceRange: searchParams.get('price') || 'all',
    date: searchParams.get('date') || '',
    rating: searchParams.get('rating') || 'all',
    availability: searchParams.get('availability') || 'all'
  })

  // Mock data
  const [results, setResults] = useState({
    events: [],
    venues: [],
    packages: [],
    total: 0
  })

  useEffect(() => {
    performSearch()
  }, [searchTerm, activeTab, filters])

  const performSearch = async () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockEvents = [
        {
          id: 1,
          title: "Luxury Brunch at Burj Al Arab",
          venue: "Al Muntaha Restaurant",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
          rating: 4.8,
          reviews: 124,
          price: 299,
          location: "Burj Al Arab",
          time: "11:00 AM - 3:00 PM",
          category: "Luxury Brunch",
          date: "2024-02-20",
          availability: "available"
        },
        {
          id: 2,
          title: "Rooftop Party Experience",
          venue: "Sky Lounge Dubai",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
          rating: 4.6,
          reviews: 89,
          price: 199,
          location: "Downtown Dubai",
          time: "7:00 PM - 12:00 AM",
          category: "Party",
          date: "2024-02-22",
          availability: "limited"
        },
        {
          id: 3,
          title: "Beach Club Brunch",
          venue: "Azure Beach Club",
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop",
          rating: 4.7,
          reviews: 156,
          price: 249,
          location: "Palm Jumeirah",
          time: "12:00 PM - 4:00 PM",
          category: "Beach Brunch",
          date: "2024-02-25",
          availability: "available"
        }
      ]

      const mockVenues = [
        {
          id: 1,
          name: "Azure Beach Club",
          category: "Beach Club",
          image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop",
          rating: 4.7,
          reviews: 156,
          location: "Palm Jumeirah",
          address: "Palm Jumeirah, Dubai",
          description: "Luxury beachfront club with stunning ocean views and world-class dining",
          upcomingEvents: 3,
          priceRange: "AED 200-400",
          amenities: ["Beach Access", "Pool", "Valet Parking", "WiFi", "Live Music"]
        },
        {
          id: 2,
          name: "Sky Lounge Dubai",
          category: "Rooftop Bar",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
          rating: 4.6,
          reviews: 89,
          location: "Downtown Dubai",
          address: "Downtown Dubai, UAE",
          description: "Sophisticated rooftop bar with panoramic city views and craft cocktails",
          upcomingEvents: 5,
          priceRange: "AED 150-300",
          amenities: ["City Views", "Cocktail Bar", "Outdoor Seating", "DJ", "VIP Area"]
        }
      ]

      const mockPackages = [
        {
          id: 1,
          name: "Classic Brunch Package",
          event: "Luxury Brunch at Burj Al Arab",
          venue: "Al Muntaha Restaurant",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
          price: 299,
          originalPrice: 349,
          rating: 4.8,
          reviews: 124,
          features: ["Welcome drink", "International buffet", "Soft beverages", "2-hour dining"],
          category: "Luxury Brunch",
          location: "Burj Al Arab",
          maxGuests: 2
        },
        {
          id: 2,
          name: "Premium Brunch Package",
          event: "Luxury Brunch at Burj Al Arab",
          venue: "Al Muntaha Restaurant",
          image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
          price: 449,
          originalPrice: 529,
          rating: 4.8,
          reviews: 124,
          features: ["Premium cocktail", "International buffet", "Premium beverages", "Ocean view"],
          category: "Luxury Brunch",
          location: "Burj Al Arab",
          maxGuests: 4,
          popular: true
        },
        {
          id: 3,
          name: "Rooftop Party Package",
          event: "Rooftop Party Experience",
          venue: "Sky Lounge Dubai",
          image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop",
          price: 199,
          originalPrice: 249,
          rating: 4.6,
          reviews: 89,
          features: ["Welcome drinks", "DJ entertainment", "City views", "Dancing area"],
          category: "Party",
          location: "Downtown Dubai",
          maxGuests: 6
        }
      ]

      // Apply filters
      let filteredEvents = mockEvents
      let filteredVenues = mockVenues
      let filteredPackages = mockPackages

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        filteredEvents = filteredEvents.filter(event => 
          event.title.toLowerCase().includes(searchLower) ||
          event.venue.toLowerCase().includes(searchLower) ||
          event.category.toLowerCase().includes(searchLower)
        )
        filteredVenues = filteredVenues.filter(venue =>
          venue.name.toLowerCase().includes(searchLower) ||
          venue.category.toLowerCase().includes(searchLower) ||
          venue.location.toLowerCase().includes(searchLower)
        )
        filteredPackages = filteredPackages.filter(pkg =>
          pkg.name.toLowerCase().includes(searchLower) ||
          pkg.event.toLowerCase().includes(searchLower) ||
          pkg.venue.toLowerCase().includes(searchLower)
        )
      }

      if (filters.category !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.category === filters.category)
        filteredPackages = filteredPackages.filter(pkg => pkg.category === filters.category)
      }

      if (filters.location !== 'all') {
        filteredEvents = filteredEvents.filter(event => event.location === filters.location)
        filteredVenues = filteredVenues.filter(venue => venue.location === filters.location)
        filteredPackages = filteredPackages.filter(pkg => pkg.location === filters.location)
      }

      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(p => p.replace('+', ''))
        filteredEvents = filteredEvents.filter(event => {
          if (max) return event.price >= parseInt(min) && event.price <= parseInt(max)
          return event.price >= parseInt(min)
        })
        filteredPackages = filteredPackages.filter(pkg => {
          if (max) return pkg.price >= parseInt(min) && pkg.price <= parseInt(max)
          return pkg.price >= parseInt(min)
        })
      }

      setResults({
        events: filteredEvents,
        venues: filteredVenues,
        packages: filteredPackages,
        total: filteredEvents.length + filteredVenues.length + filteredPackages.length
      })
      setLoading(false)
    }, 500)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const newSearchParams = new URLSearchParams(searchParams)
    if (searchTerm) {
      newSearchParams.set('q', searchTerm)
    } else {
      newSearchParams.delete('q')
    }
    setSearchParams(newSearchParams)
  }

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    const newSearchParams = new URLSearchParams(searchParams)
    if (value && value !== 'all') {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    setSearchParams(newSearchParams)
  }

  const clearFilters = () => {
    setFilters({
      category: 'all',
      location: 'all',
      priceRange: 'all',
      date: '',
      rating: 'all',
      availability: 'all'
    })
    setSearchParams(new URLSearchParams({ q: searchTerm, tab: activeTab }))
  }

  const categories = [
    'Luxury Brunch', 'Party', 'Beach Brunch', 'Family Friendly', 'Business Lunch', 'Date Night'
  ]

  const locations = [
    'Downtown Dubai', 'Palm Jumeirah', 'Burj Al Arab', 'DIFC', 'Bur Dubai', 'Dubai Marina'
  ]

  const priceRanges = [
    { value: '0-150', label: 'Under AED 150' },
    { value: '150-250', label: 'AED 150 - 250' },
    { value: '250-350', label: 'AED 250 - 350' },
    { value: '350+', label: 'Above AED 350' }
  ]

  const getActiveResults = () => {
    switch (activeTab) {
      case 'events': return results.events
      case 'venues': return results.venues
      case 'packages': return results.packages
      default: return [...results.events, ...results.venues, ...results.packages]
    }
  }

  const renderResults = () => {
    const activeResults = getActiveResults()
    
    if (loading) {
      return (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing experiences...</p>
        </div>
      )
    }

    if (activeResults.length === 0) {
      return (
        <Card className="text-center py-16">
          <CardContent>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className={`grid gap-6 ${
        viewMode === 'list' 
          ? 'grid-cols-1' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {activeResults.map((item, index) => {
          if (item.title) {
            // Event - use EventCard component
            return <EventCard key={`event-${item.id}`} event={item} />
          } else if (item.name && item.upcomingEvents !== undefined) {
            // Venue - use VenueCard component
            return <VenueCard key={`venue-${item.id}`} venue={item} />
          } else {
            // Package Card - keep custom implementation for now
            return (
              <Link key={`package-${item.id}`} to={`/packages/${item.id}`} className="group">
                <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative aspect-[4/3]">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.popular && (
                      <Badge className="absolute top-3 left-3 bg-yellow-400 text-yellow-900">
                        Popular
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-400" />
                        <span className="text-xs font-medium">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{item.event}</p>
                    <p className="text-xs text-gray-500 mb-3">{item.venue} • {item.location}</p>
                    
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                      <Users className="w-3 h-3" />
                      Up to {item.maxGuests} guests
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-rose-600">AED {item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">AED {item.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">per person</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          }
        })}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Elegant Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&h=1080&fit=crop"
            alt="Dubai Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {/* Minimal Typography */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Explore Dubai
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-xl mx-auto">
            Discover events, venues, and experiences
          </p>
          
          {/* Ultra Minimal Search Bar */}
          <div className="max-w-lg mx-auto">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-1">
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="flex-1 flex items-center px-4 py-3">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <Input
                      placeholder="Search experiences..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 border-0 bg-transparent focus:ring-0 placeholder:text-gray-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="m-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-xl font-medium"
                  >
                    Search
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12">
        {/* Enhanced Tabs and Controls */}
        <Card className="mb-8 border-0 shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <Tabs value={activeTab} onValueChange={(value) => {
                setActiveTab(value)
                const newSearchParams = new URLSearchParams(searchParams)
                newSearchParams.set('tab', value)
                setSearchParams(newSearchParams)
              }} className="w-full lg:w-auto">
                <TabsList className="grid w-full grid-cols-4 lg:w-auto bg-gray-100 rounded-2xl p-1">
                  <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
                    <span className="mr-2">🎯</span>
                    All ({results.total})
                  </TabsTrigger>
                  <TabsTrigger value="events" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
                    <span className="mr-2">🎉</span>
                    Events ({results.events.length})
                  </TabsTrigger>
                  <TabsTrigger value="venues" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
                    <span className="mr-2">🏛️</span>
                    Venues ({results.venues.length})
                  </TabsTrigger>
                  <TabsTrigger value="packages" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md">
                    <span className="mr-2">📦</span>
                    Packages ({results.packages.length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex items-center gap-4">
                <Button
                  variant={showFilters ? "default" : "outline"}
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-2xl px-6"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {showFilters && <span className="ml-1 text-xs bg-white/20 px-2 py-1 rounded-full">ON</span>}
                </Button>
                <div className="flex bg-gray-100 rounded-2xl p-1">
                  <Button
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-xl"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-xl"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Filters */}
        {showFilters && (
          <Card className="mb-8 border-0 shadow-lg rounded-3xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <span className="mr-3">🎛️</span>
                  Refine Your Search
                </h3>
                <Button variant="ghost" onClick={clearFilters} className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-2xl">
                  Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <span className="mr-2">🏷️</span>
                    Category
                  </label>
                  <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                    <SelectTrigger className="rounded-2xl border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <span className="mr-2">📍</span>
                    Location
                  </label>
                  <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
                    <SelectTrigger className="rounded-2xl border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <span className="mr-2">💰</span>
                    Price Range
                  </label>
                  <Select value={filters.priceRange} onValueChange={(value) => updateFilter('priceRange', value)}>
                    <SelectTrigger className="rounded-2xl border-gray-200 focus:border-purple-300 focus:ring-purple-200">
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      {priceRanges.map(range => (
                        <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center">
                    <span className="mr-2">📅</span>
                    Date
                  </label>
                  <Input
                    type="date"
                    value={filters.date}
                    onChange={(e) => updateFilter('date', e.target.value)}
                    placeholder="Select date"
                    className="rounded-2xl border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600 flex items-center">
                  <span className="mr-2">🎯</span>
                  <span className="font-semibold text-purple-600">{getActiveResults().length}</span>
                  <span className="ml-1">results found</span>
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={clearFilters} className="rounded-2xl">
                    Reset
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="all" className="mt-0">
            {renderResults()}
          </TabsContent>
          <TabsContent value="events" className="mt-0">
            {renderResults()}
          </TabsContent>
          <TabsContent value="venues" className="mt-0">
            {renderResults()}
          </TabsContent>
          <TabsContent value="packages" className="mt-0">
            {renderResults()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ExplorePage