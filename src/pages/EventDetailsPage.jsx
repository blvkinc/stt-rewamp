import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, MapPin, Clock, Heart, Share2, Calendar, Phone, Mail, ArrowLeft, ArrowRight, Users, Check, ChevronDown, Sparkles } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { motion } from 'framer-motion'

const EventDetailsPage = () => {
  const { id: _id } = useParams()
  const navigate = useNavigate()
  const [selectedPackage, setSelectedPackage] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [guestCount, setGuestCount] = useState(2)
  const [activeTab, setActiveTab] = useState('overview')

  // Mock event data
  const event = {
    id: 1,
    title: "Luxury Brunch at Burj Al Arab",
    venue: "Al Muntaha Restaurant",
    venueId: 1,
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop"
    ],
    rating: 4.8,
    reviews: 124,
    location: "Burj Al Arab, Dubai",
    time: "11:00 AM - 3:00 PM",
    category: "Luxury Brunch",
    description: "Experience the ultimate luxury brunch at the iconic Burj Al Arab. Indulge in a world-class culinary journey with breathtaking views of the Arabian Gulf. Our carefully curated menu features international cuisine prepared by award-winning chefs.",
    highlights: [
      "Panoramic views of Dubai coastline",
      "International buffet with live cooking stations",
      "Premium beverages included",
      "Valet parking available",
      "Family-friendly environment",
      "Live entertainment"
    ],
    venueDetails: {
      id: 1,
      name: "Al Muntaha Restaurant",
      description: "Located 200 meters above the Arabian Gulf at the iconic Burj Al Arab, Al Muntaha offers an unparalleled dining experience with breathtaking panoramic views.",
      address: "Burj Al Arab, Jumeirah Street, Dubai",
      phone: "+971 4 301 7600",
      email: "reservations@burjalarab.com",
      website: "www.burjalarab.com/almuntaha",
      capacity: 200,
      rating: 4.9,
      reviews: 342,
      priceRange: "AED 300-800",
      amenities: [
        "Panoramic Views",
        "Valet Parking",
        "WiFi",
        "Air Conditioning",
        "Private Dining Rooms",
        "Wheelchair Accessible",
        "Live Music",
        "Bar Service"
      ],
      images: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop"
      ],
      openingHours: {
        monday: "12:00 PM - 11:00 PM",
        tuesday: "12:00 PM - 11:00 PM",
        wednesday: "12:00 PM - 11:00 PM",
        thursday: "12:00 PM - 12:00 AM",
        friday: "11:00 AM - 12:00 AM",
        saturday: "11:00 AM - 12:00 AM",
        sunday: "11:00 AM - 11:00 PM"
      },
      dressCode: "Smart casual to formal attire",
      parkingInfo: "Complimentary valet parking available",
      upcomingEvents: 12
    },
    packages: [
      {
        id: 1,
        name: 'Classic Brunch Package',
        price: 299,
        originalPrice: 349,
        description: 'Perfect introduction to our luxury brunch experience',
        maxGuests: 2,
        popular: false,
        features: ['Welcome drink on arrival', 'Access to international buffet', 'Soft beverages included', '2-hour dining experience', 'Complimentary valet parking']
      },
      {
        id: 2,
        name: 'Premium Brunch Package',
        price: 449,
        originalPrice: 529,
        description: 'Enhanced experience with premium beverages and extras',
        maxGuests: 4,
        popular: true,
        features: ['Premium welcome cocktail', 'Access to international buffet', 'Premium beverages included', '3-hour dining experience', 'Complimentary valet parking', 'Priority seating with ocean view', 'Complimentary dessert selection']
      },
      {
        id: 3,
        name: 'VIP Experience Package',
        price: 699,
        originalPrice: 799,
        description: 'Ultimate luxury with exclusive perks and personalized service',
        maxGuests: 6,
        popular: false,
        features: ['Private welcome reception', 'Access to exclusive VIP buffet', 'Premium champagne & beverages', '4-hour dining experience', 'Complimentary valet parking', 'Private dining area with panoramic views', 'Personal sommelier service', 'Complimentary spa access', 'Professional photography session']
      }
    ],
    contact: {
      phone: '+971 4 301 7600',
      email: 'reservations@burjalarab.com'
    },
    policies: [
      'Smart casual dress code required',
      'Children under 12 receive 50% discount',
      'Cancellation allowed up to 24 hours before',
      'No outside food or beverages allowed'
    ]
  }

  const reviews = [
    {
      id: 1,
      name: "Sarah Ahmed",
      rating: 5,
      date: "2 weeks ago",
      comment: "Absolutely incredible experience! The food was exceptional and the service was impeccable. The views are breathtaking."
    },
    {
      id: 2,
      name: "Michael Johnson",
      rating: 4,
      date: "1 month ago",
      comment: "Great brunch with amazing variety. A bit pricey but worth it for the experience and location."
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      rating: 5,
      date: "1 month ago",
      comment: "Perfect for special occasions. The staff went above and beyond to make our anniversary memorable."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-6">
        <Link to="/events" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Events</span>
        </Link>
      </div>

      {/* Premium Image Gallery - Airbnb Grid Style */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-sm">
          <div className="md:col-span-2 relative h-full">
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
            />
          </div>
          <div className="hidden md:flex flex-col gap-2 h-full">
            <div className="h-1/2 relative">
              <img src={event.images[1]} className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Gallery" />
            </div>
            <div className="h-1/2 relative">
              <img src={event.images[2]} className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Gallery" />
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2 h-full">
            <div className="h-1/2 relative">
              <img src={event.images[3]} className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Gallery" />
            </div>
            <div className="h-1/2 relative">
              <img src={event.images[4]} className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" alt="Gallery" />
              <div className="absolute bottom-4 right-4 bg-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
                Show all photos
              </div>
            </div>
          </div>
          {/* Mobile Only: Show count indicator instead of full grid */}
          <div className="md:hidden absolute bottom-4 right-4 z-10">
            <div className="bg-black/60 text-white backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold">
              1/{event.images.length}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="px-3 py-1 text-sm bg-gray-100 text-gray-700">
                  {event.category}
                </Badge>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors hover:underline">
                    <Heart className="w-5 h-5" />
                    <span className="text-sm font-medium">Save</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors hover:underline">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">{event.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="font-medium text-gray-900">{event.venue}</span>
                <span>•</span>
                <span className="underline">{event.location}</span>
              </div>

              <div className="flex items-center space-x-6 mt-4">
                <div className="flex items-center space-x-1 p-1 bg-gray-50 rounded-lg px-2">
                  <Star className="w-4 h-4 text-gray-900 fill-current" />
                  <span className="font-semibold text-gray-900">{event.rating}</span>
                  <span className="text-gray-500 underline ml-1">{event.reviews} reviews</span>
                </div>
              </div>
            </div>

            {/* Overview Tabs */}
            <div className="mb-8">
              <nav className="flex space-x-8 border-b border-gray-100">
                {[
                  { id: 'overview', name: 'Overview' },
                  { id: 'venue', name: 'Venue' },
                  { id: 'packages', name: 'Packages' },
                  { id: 'reviews', name: 'Reviews' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 px-1 font-medium text-sm transition-all border-b-2 ${activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About this experience</h2>
                  <p className="text-gray-600 leading-relaxed text-lg mb-8">{event.description}</p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50">
                        <Check className="w-5 h-5 text-gray-900 mt-0.5" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Things to know</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Policies</h4>
                      <ul className="space-y-2">
                        {event.policies.map((policy, index) => (
                          <li key={index} className="flex items-start space-x-2 text-gray-600 text-sm">
                            <span>•</span>
                            <span>{policy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Contact Host</h4>
                      <a href="#" className="flex items-center space-x-2 text-gray-600 mb-2 hover:underline">
                        <Phone className="w-4 h-4" />
                        <span>Contact Venue</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ... Other tabs would go here, simplified for brevity but maintaining structure ... */}
            {activeTab === 'packages' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose your package</h2>
                <div className="grid grid-cols-1 gap-6">
                  {event.packages.map((pkg) => (
                    <Card key={pkg.id} className={`rounded-2xl overflow-hidden transition-all ${pkg.popular ? 'border-brand-purple shadow-md' : 'border-gray-200'}`}>
                      {pkg.popular && <div className="bg-brand-purple text-white text-xs font-bold px-3 py-1 text-center">MOST POPULAR</div>}
                      <div className="p-6 md:flex justify-between items-center gap-6">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                          <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {pkg.features.slice(0, 3).map((f, i) => (
                              <Badge key={i} variant="secondary" className="text-xs bg-gray-100 text-gray-600 font-normal">{f}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <span className="text-2xl font-bold">AED {pkg.price}</span>
                            {pkg.originalPrice && <span className="text-sm text-gray-400 line-through">AED {pkg.originalPrice}</span>}
                          </div>
                          <span className="text-xs text-gray-500">per person</span>
                          <Button className="w-full mt-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800" onClick={() => setSelectedPackage(pkg.id)}>
                            Select
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <Card className="rounded-2xl shadow-xl border-0 overflow-hidden ring-1 ring-black/5">
                <CardContent className="p-6">
                  {/* Package Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Package</label>
                    <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                      <SelectTrigger className="w-full rounded-xl border-gray-200 h-12">
                        <SelectValue placeholder="Choose a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {event.packages.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.id}>
                            <div className="flex justify-between w-full gap-4 items-center">
                              <span className="font-medium">{pkg.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {!selectedPackage ? (
                    <div className="text-center py-4 px-4 bg-orange-50 rounded-xl border border-orange-100 mb-4 animate-in fade-in zoom-in-95 duration-300">
                      <Sparkles className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                      <p className="text-sm font-medium text-orange-800">Please select a package above to view pricing and availability.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-end mb-6 animate-in fade-in slide-in-from-bottom-2">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">AED {event.packages.find(p => p.id === selectedPackage)?.price}</span>
                          <span className="text-gray-500 text-sm"> / person</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-current text-gray-900" />
                          <span className="font-semibold">{event.rating}</span>
                          <span className="text-gray-500 underline">({event.reviews})</span>
                        </div>
                      </div>

                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 delay-100">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="col-span-2 border border-gray-300 rounded-t-xl p-3 hover:border-black transition-colors cursor-pointer">
                            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Date</label>
                            <input type="date" className="w-full outline-none text-sm bg-transparent cursor-pointer" />
                          </div>
                          <div className="col-span-2 border-x border-b border-gray-300 rounded-b-xl p-3 hover:border-black transition-colors cursor-pointer">
                            <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">Guests</label>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{guestCount} guests</span>
                              <div className="flex gap-2">
                                <button onClick={() => setGuestCount(Math.max(1, guestCount - 1))} className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100">-</button>
                                <button onClick={() => setGuestCount(guestCount + 1)} className="w-6 h-6 rounded-full border flex items-center justify-center hover:bg-gray-100">+</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 pb-2">
                          <Button
                            size="lg"
                            className="w-full h-12 text-lg font-semibold rounded-xl bg-gradient-to-r from-brand-purple to-brand-orange hover:opacity-90 shadow-lg"
                            onClick={() => {
                              navigate(`/booking/${event.id}`, {
                                state: {
                                  event: event.title,
                                  venue: event.venue,
                                  date: selectedDate || new Date().toISOString().split('T')[0],
                                  time: event.time,
                                  price: event.packages.find(p => p.id === selectedPackage)?.price,
                                  guests: guestCount,
                                  package: event.packages.find(p => p.id === selectedPackage)?.name,
                                  image: event.images[0]
                                }
                              })
                            }}
                          >
                            Reserve
                          </Button>
                        </div>

                        <p className="text-center text-xs text-gray-500">You won't be charged yet</p>

                        <div className="space-y-2 pt-4 border-t border-gray-100 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span className="truncate max-w-[150px]">{event.packages.find(p => p.id === selectedPackage)?.name} x {guestCount}</span>
                            <span>AED {(event.packages.find(p => p.id === selectedPackage)?.price || 0) * guestCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="underline">Service fee</span>
                            <span>AED 45</span>
                          </div>
                          <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100 mt-2">
                            <span>Total</span>
                            <span>AED {(event.packages.find(p => p.id === selectedPackage)?.price || 0) * guestCount + 45}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="mt-6 text-center">
                <button className="flex items-center justify-center space-x-2 text-gray-500 hover:text-gray-900 mx-auto text-sm font-medium">
                  <Share2 className="w-4 h-4" />
                  <span>Share this experience</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage
