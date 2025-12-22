import React from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, Clock, Heart, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`} className="group">
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-3xl">
        <div className="relative aspect-[4/3]">
          <img
            alt={event.title}
            src={event.image}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Heart Button */}
          <div className="absolute top-4 right-4">
            <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
              <Heart className="w-4 h-4 text-gray-600 hover:text-rose-500" />
            </button>
          </div>
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white px-3 py-1.5 rounded-full font-medium shadow-lg">
              {event.category}
            </Badge>
          </div>
          
          {/* Price Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
              AED {event.price}
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-yellow-400" />
              <span className="text-sm font-semibold">{event.rating}</span>
              <span className="text-sm text-gray-500">({event.reviews})</span>
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              per person
            </div>
          </div>
          
          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors text-lg leading-tight">
            {event.title}
          </h3>
          
          <p className="text-gray-600 mb-4 font-medium">
            {event.venue}
          </p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>{event.time}</span>
            </div>
          </div>
          
          {/* Hover Action */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full h-px bg-gradient-to-r from-rose-200 via-pink-200 to-orange-200 mb-3" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Available now</span>
              <div className="flex items-center text-rose-600 text-sm font-medium">
                Book now
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default EventCard
