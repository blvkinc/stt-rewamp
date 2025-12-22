import { Link } from 'react-router-dom'
import { MapPin, Star, Calendar, ArrowRight, Users, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
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
        <motion.div
          whileHover={{ 
            y: -8,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-3xl">
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-2/5 aspect-[4/3] md:aspect-auto">
                <motion.img 
                  src={safeVenue.image} 
                  alt={safeVenue.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Badge className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full font-medium shadow-lg">
                    {safeVenue.category}
                  </Badge>
                </motion.div>
                
                <motion.div 
                  className="absolute top-4 right-4 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg"
                  style={{
                    background: 'linear-gradient(to right, #D7415C, #F26D40)'
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {safeVenue.priceRange}
                </motion.div>
              </div>
              
              <CardContent className="flex-1 p-8">
                <motion.div 
                  className="flex items-center justify-between mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <div className="flex items-center gap-1">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                    </motion.div>
                    <span className="text-sm font-semibold">{safeVenue.rating}</span>
                    <span className="text-sm text-gray-500">({safeVenue.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    <Users className="w-4 h-4" />
                    <span>{safeVenue.capacity}</span>
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-gray-900 mb-3 transition-colors hover:text-red-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  {safeVenue.name}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {safeVenue.description}
                </motion.p>
                
                <motion.div 
                  className="flex items-center gap-2 text-gray-500 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-4 h-4" style={{ color: '#D7415C' }} />
                  <span>{safeVenue.address}</span>
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  {safeVenue.amenities && safeVenue.amenities.slice(0, 4).map((amenity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + (index * 0.1), duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-3 py-1">
                        {amenity}
                      </Badge>
                    </motion.div>
                  ))}
                  {safeVenue.amenities && safeVenue.amenities.length > 4 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 rounded-full px-3 py-1">
                        +{safeVenue.amenities.length - 4} more
                      </Badge>
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                >
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-gray-500"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Calendar className="w-4 h-4" style={{ color: '#D7415C' }} />
                    <span>{safeVenue.upcomingEvents} upcoming events</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center text-sm font-medium"
                    style={{ color: '#D7415C' }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    View details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.div>
                </motion.div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </Link>
    )
  }

  return (
    <Link to={`/venues/${safeVenue.id}`} className="group">
      <motion.div
        whileHover={{ 
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="overflow-hidden border-0 shadow-sm bg-white rounded-3xl">
          <div className="relative aspect-[4/3]">
            <motion.img 
              src={safeVenue.image} 
              alt={safeVenue.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Category Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Badge className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white px-3 py-1.5 rounded-full font-medium shadow-lg">
                {safeVenue.category}
              </Badge>
            </motion.div>
            
            {/* Capacity Badge */}
            <motion.div 
              className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full p-2 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-1 text-white text-sm">
                <Users className="w-3 h-3" />
                <span className="text-xs font-medium">{safeVenue.capacity}</span>
              </div>
            </motion.div>
            
            {/* Price Badge */}
            <motion.div 
              className="absolute top-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <motion.div 
                className="text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg"
                style={{
                  background: 'linear-gradient(to right, #D7415C, #F26D40)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(212, 65, 92, 0.4)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {safeVenue.priceRange}
              </motion.div>
            </motion.div>
          </div>
          
          <CardContent className="p-6">
            <motion.div 
              className="flex items-start justify-between mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="flex items-center gap-1">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: 1.2 }}
                >
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                </motion.div>
                <span className="text-sm font-semibold">{safeVenue.rating}</span>
                <span className="text-sm text-gray-500">({safeVenue.reviews})</span>
              </div>
            </motion.div>
            
            <motion.h3 
              className="font-bold text-gray-900 mb-2 transition-colors text-lg leading-tight hover:text-red-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {safeVenue.name}
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {safeVenue.description || safeVenue.address}
            </motion.p>
            
            <motion.div 
              className="flex items-center gap-2 text-sm text-gray-500 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              whileHover={{ x: 5 }}
            >
              <MapPin className="w-4 h-4" style={{ color: '#D7415C' }} />
              <span>{safeVenue.address}</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-1 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              {safeVenue.amenities && safeVenue.amenities.slice(0, 2).map((amenity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + (index * 0.1), duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-2 py-1">
                    {amenity}
                  </Badge>
                </motion.div>
              ))}
              {safeVenue.amenities && safeVenue.amenities.length > 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-1">
                    +{safeVenue.amenities.length - 2}
                  </Badge>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              <motion.div 
                className="flex items-center gap-1 text-sm text-gray-500"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Calendar className="w-4 h-4" style={{ color: '#D7415C' }} />
                <span>{safeVenue.upcomingEvents} events</span>
              </motion.div>
              
              {/* Hover Action */}
              <motion.div 
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="flex items-center text-sm font-medium"
                  style={{ color: '#D7415C' }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  View venue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

export default VenueCard