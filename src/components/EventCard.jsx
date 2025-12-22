import { Link } from 'react-router-dom'
import { Star, MapPin, Clock, Heart, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="group">
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
              alt={event.title}
              src={event.image}
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
            
            {/* Heart Button */}
            <motion.div 
              className="absolute top-4 right-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.button 
                className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(255, 255, 255, 1)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Heart className="w-4 h-4 text-gray-600 hover:text-brand-red" />
                </motion.div>
              </motion.button>
            </motion.div>
            
            {/* Category Badge */}
            <motion.div 
              className="absolute bottom-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white px-3 py-1.5 rounded-full font-medium shadow-lg">
                  {event.category}
                </Badge>
              </motion.div>
            </motion.div>
            
            {/* Price Badge */}
            <motion.div 
              className="absolute top-4 left-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <motion.div 
                className="px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg text-white"
                style={{
                  background: 'linear-gradient(to right, #D7415C, #F26D40)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(212, 65, 92, 0.4)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                AED {event.price}
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
                <span className="text-sm font-semibold">{event.rating}</span>
                <span className="text-sm text-gray-500">({event.reviews})</span>
              </div>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                per person
              </div>
            </motion.div>
            
            <motion.h3 
              className="font-bold text-gray-900 mb-2 transition-colors text-lg leading-tight hover:text-red-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {event.title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 mb-4 font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              {event.venue}
            </motion.p>
            
            <motion.div 
              className="space-y-2 text-sm text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <MapPin className="w-4 h-4" style={{ color: '#D7415C' }} />
                <span>{event.location}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Clock className="w-4 h-4" style={{ color: '#D7415C' }} />
                <span>{event.time}</span>
              </motion.div>
            </motion.div>
            
            {/* Hover Action */}
            <motion.div 
              className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0, y: 0 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-full h-px bg-gradient-to-r from-brand-red/20 via-brand-orange/20 to-brand-yellow/20 mb-3"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Available now</span>
                <motion.div 
                  className="flex items-center text-sm font-medium"
                  style={{ color: '#D7415C' }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  Book now
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}

export default EventCard
