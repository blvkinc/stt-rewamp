import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Clock, Heart, Share2, Calendar, Phone, Mail, ArrowLeft, ArrowRight, Users, Check } from 'lucide-react'

const EventDetailsPage = () => {
  const { id: _id } = useParams()
  const [selectedPackage, setSelectedPackage] = useState('individual')
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
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop"
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
    <div className="min-h-screen bg-neutral-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto container-padding py-6">
        <Link to="/events" className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </Link>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2">
            <img
              src={event.images[0]}
              alt={event.title}
              className="w-full h-96 object-cover rounded-3xl shadow-soft-lg"
            />
          </div>
          <div className="space-y-6">
            {event.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${event.title} ${index + 2}`}
                className="w-full h-44 object-cover rounded-2xl shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-primary-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{event.title}</h1>
              <p className="text-xl text-slate-600 mb-4">{event.venue}</p>
              
              <div className="flex items-center space-x-6 text-slate-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{event.rating}</span>
                  <span>({event.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="border-b border-neutral-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', name: 'Overview' },
                    { id: 'venue', name: 'Venue Details' },
                    { id: 'packages', name: 'Packages' },
                    { id: 'reviews', name: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Description */}
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-4">About This Experience</h2>
                  <p className="text-slate-600 leading-relaxed mb-6">{event.description}</p>
                  
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Highlights</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {event.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2 text-slate-600">
                        <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Policies */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Important Information</h3>
                  <ul className="space-y-2">
                    {event.policies.map((policy, index) => (
                      <li key={index} className="flex items-start space-x-2 text-slate-600">
                        <div className="w-2 h-2 bg-slate-400 rounded-full mt-2"></div>
                        <span>{policy}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'venue' && (
              <div className="space-y-8">
                {/* Venue Header */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-neutral-800 mb-2">{event.venueDetails.name}</h2>
                      <p className="text-neutral-600 text-lg mb-4">{event.venueDetails.description}</p>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{event.venueDetails.rating}</span>
                          <span className="text-neutral-500">({event.venueDetails.reviews} reviews)</span>
                        </div>
                        <span className="text-neutral-300">•</span>
                        <span className="text-neutral-600">{event.venueDetails.priceRange}</span>
                      </div>
                    </div>
                    <Link 
                      to={`/venues/${event.venueDetails.id}`}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <span>View Full Venue</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Venue Images */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {event.venueDetails.images.map((image, index) => (
                      <div key={index} className="relative overflow-hidden rounded-xl">
                        <img 
                          src={image} 
                          alt={`${event.venueDetails.name} ${index + 1}`}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                    <h3 className="text-xl font-bold text-neutral-800 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-neutral-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-neutral-800">Address</p>
                          <p className="text-neutral-600">{event.venueDetails.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-neutral-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-neutral-800">Phone</p>
                          <a href={`tel:${event.venueDetails.phone}`} className="text-primary-600 hover:text-primary-700">
                            {event.venueDetails.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-neutral-500 mt-0.5" />
                        <div>
                          <p className="font-medium text-neutral-800">Email</p>
                          <a href={`mailto:${event.venueDetails.email}`} className="text-primary-600 hover:text-primary-700">
                            {event.venueDetails.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                    <h3 className="text-xl font-bold text-neutral-800 mb-4">Venue Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium text-neutral-800">Capacity</p>
                        <p className="text-neutral-600">{event.venueDetails.capacity} guests</p>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800">Dress Code</p>
                        <p className="text-neutral-600">{event.venueDetails.dressCode}</p>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800">Parking</p>
                        <p className="text-neutral-600">{event.venueDetails.parkingInfo}</p>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-800">Upcoming Events</p>
                        <p className="text-neutral-600">{event.venueDetails.upcomingEvents} events scheduled</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">Venue Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {event.venueDetails.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-primary-600" />
                        <span className="text-neutral-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">Opening Hours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(event.venueDetails.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                        <span className="font-medium text-neutral-800 capitalize">{day}</span>
                        <span className="text-neutral-600">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold text-slate-900">Available Packages</h2>
                  <Link 
                    to={`/packages/${event.id}`}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <span>View All Packages</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {event.packages.map((pkg) => (
                    <div key={pkg.id} className="bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-soft-lg transition-all duration-300 relative">
                      {pkg.popular && (
                        <div className="absolute -top-3 left-6">
                          <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-neutral-800 mb-2">{pkg.name}</h3>
                        <p className="text-neutral-600 text-sm mb-4">{pkg.description}</p>
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <Users className="w-4 h-4 text-neutral-500" />
                          <span className="text-sm text-neutral-600">Up to {pkg.maxGuests} guests</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-2xl font-bold text-primary-600">AED {pkg.price}</span>
                          {pkg.originalPrice > pkg.price && (
                            <span className="text-lg text-neutral-500 line-through">AED {pkg.originalPrice}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        {pkg.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-neutral-700">{feature}</span>
                          </div>
                        ))}
                        {pkg.features.length > 3 && (
                          <p className="text-sm text-neutral-500">+{pkg.features.length - 3} more features</p>
                        )}
                      </div>
                      
                      <Link 
                        to={`/packages/detail/${pkg.id}`}
                        className="w-full btn-primary text-center block"
                      >
                        View Package Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Reviews</h2>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-slate-100 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-medium">
                              {review.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{review.name}</div>
                            <div className="text-sm text-slate-500">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">Book Your Experience</h3>
                
                {/* Package Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-3">Select Package</label>
                  <div className="space-y-3">
                    {event.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors relative ${
                          selectedPackage === pkg.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-slate-200 hover:border-primary-300'
                        }`}
                        onClick={() => setSelectedPackage(pkg.id)}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-2 -right-2">
                            <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Popular
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-slate-900">{pkg.name}</h4>
                          <div className="text-right">
                            <span className="text-lg font-bold text-primary-500">AED {pkg.price}</span>
                            {pkg.originalPrice > pkg.price && (
                              <div className="text-sm text-slate-500 line-through">AED {pkg.originalPrice}</div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{pkg.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <Users className="w-3 h-3" />
                          <span>Up to {pkg.maxGuests} guests</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link 
                    to={`/packages/${event.id}`}
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium text-sm mt-3"
                  >
                    View detailed package comparison →
                  </Link>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Guest Count */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Number of Guests</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium text-slate-900 min-w-[2rem] text-center">
                      {guestCount}
                    </span>
                    <button
                      onClick={() => setGuestCount(guestCount + 1)}
                      className="w-10 h-10 border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-slate-200 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-primary-500">
                      AED {(event.packages.find(p => p.id === selectedPackage)?.price || 0) * guestCount}
                    </span>
                  </div>
                  <div className="text-sm text-slate-500 text-right">
                    AED {event.packages.find(p => p.id === selectedPackage)?.price || 0} × {guestCount} guests
                  </div>
                </div>

                {/* Book Button */}
                <Link
                  to={`/booking/${event.id}`}
                  className="block w-full text-center btn-primary mb-4"
                >
                  Book Now
                </Link>

                {/* Contact */}
                <div className="text-center text-sm text-slate-600">
                  <p className="mb-2">Need help? Contact us:</p>
                  <div className="flex items-center justify-center space-x-4">
                    <a href={`tel:${event.contact.phone}`} className="flex items-center space-x-1 hover:text-primary-500">
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </a>
                    <a href={`mailto:${event.contact.email}`} className="flex items-center space-x-1 hover:text-primary-500">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailsPage
