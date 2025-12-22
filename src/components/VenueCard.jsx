import { Link } from 'react-router-dom'
import { MapPin, Star, Calendar, ArrowRight, Users, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

const VenueCard = ({ venue, viewMode = 'grid' }) => {
  // Provide default values for missing properties
  const safeVenue = {
    amenities: [],
    description: '',
    address: venue.location || '',
    rating: venue.rating || 4.5,
    reviews: venue.reviews || 0,
    upcomingEvents: venue.upcomingEvents || 0,
    capacity: venue.capacity || 'N/A',
    ...venue
  }

  if (viewMode === 'list') {
    return (
      <Link to={`/venues/${safeVenue.id}`} className="group">
        <Card className="overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white rounded-3xl">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto">
              <img 
                src={safeVenue.image} 
                alt={safeVenue.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <Badge className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full font-medium shadow-lg">
                {safeVenue.category}
              </Badge>
              
              <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                {safeVenue.priceRange}
              </div>
            </div>
            
            <CardContent className="flex-1 p-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm font-semibold">{safeVenue.rating}</span>
                  <span className="text-sm text-gray-500">({safeVenue.reviews})</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Users className="w-4 h-4" />
                  <span>{safeVenue.capacity}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                {safeVenue.name}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {safeVenue.description}
              </p>
              
              <div className="flex items-center gap-2 text-gray-500 mb-4">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>{safeVenue.address}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {safeVenue.amenities && safeVenue.amenities.slice(0, 4).map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-3 py-1">
                    {amenity}
                  </Badge>
                ))}
                {safeVenue.amenities && safeVenue.amenities.length > 4 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 rounded-full px-3 py-1">
                    +{safeVenue.amenities.length - 4} more
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 text-rose-400" />
                  <span>{safeVenue.upcomingEvents} upcoming events</span>
                </div>
                <div className="flex items-center text-rose-600 text-sm font-medium group-hover:text-rose-700">
                  View details
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link to={`/venues/${safeVenue.id}`} className="group">
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-3xl">
        <div className="relative aspect-[4/3]">
          <img 
            src={safeVenue.image} 
            alt={safeVenue.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <Badge className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white px-3 py-1.5 rounded-full font-medium shadow-lg">
            {safeVenue.category}
          </Badge>
          
          {/* Capacity Badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <div className="flex items-center gap-1 text-white text-sm">
              <Users className="w-3 h-3" />
              <span className="text-xs font-medium">{safeVenue.capacity}</span>
            </div>
          </div>
          
          {/* Price Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              {safeVenue.priceRange}
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-sm font-semibold">{safeVenue.rating}</span>
              <span className="text-sm text-gray-500">({safeVenue.reviews})</span>
            </div>
          </div>
          
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors text-lg leading-tight">
            {safeVenue.name}
          </h3>
          
          <p className="text-gray-600 mb-4">
            {safeVenue.description || safeVenue.address}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>{safeVenue.address}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {safeVenue.amenities && safeVenue.amenities.slice(0, 2).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-2 py-1">
                {amenity}
              </Badge>
            ))}
            {safeVenue.amenities && safeVenue.amenities.length > 2 && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-1">
                +{safeVenue.amenities.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4 text-rose-400" />
              <span>{safeVenue.upcomingEvents} events</span>
            </div>
            
            {/* Hover Action */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center text-rose-600 text-sm font-medium">
                View venue
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default VenueCard