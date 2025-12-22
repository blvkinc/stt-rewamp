import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Check, Star, Users, Clock, Calendar, ArrowRight, Gift, MapPin, ArrowLeft, Share2, Heart } from 'lucide-react'

const PackageDetailPage = () => {
  const { packageId } = useParams()
  const navigate = useNavigate()
  const [packageData, setPackageData] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [guestCount, setGuestCount] = useState(2)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock package data - replace with actual API call
    const mockPackage = {
      id: parseInt(packageId),
      name: "Premium Brunch Package",
      event: "Luxury Brunch at Burj Al Arab",
      eventId: 1,
      venue: "Al Muntaha Restaurant",
      venueId: 1,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
      ],
      price: 449,
      originalPrice: 529,
      rating: 4.8,
      reviews: 124,
      location: "Burj Al Arab, Dubai",
      category: "Luxury Brunch",
      duration: "3 hours",
      maxGuests: 4,
      minGuests: 1,
      popular: true,
      description: "Indulge in an extraordinary culinary journey with our Premium Brunch Package at the iconic Al Muntaha Restaurant. Located 200 meters above the Arabian Gulf, this exclusive experience combines world-class cuisine with breathtaking panoramic views.",
      highlights: [
        "Panoramic views of Dubai coastline",
        "Award-winning international cuisine",
        "Premium beverage selection",
        "Professional service team",
        "Exclusive dining atmosphere"
      ],
      features: [
        "Premium welcome cocktail on arrival",
        "Access to international buffet with live cooking stations",
        "Premium beverages including champagne and wine",
        "3-hour dining experience with flexible timing",
        "Complimentary valet parking",
        "Priority seating with guaranteed ocean view",
        "Complimentary gourmet dessert selection",
        "Professional photography service available"
      ],
      inclusions: [
        "Welcome drink",
        "International buffet",
        "Premium beverages",
        "Ocean view seating",
        "Valet parking",
        "Service charge"
      ],
      exclusions: [
        "Transportation to venue",
        "Additional beverages beyond package",
        "Photography service (optional)",
        "Spa services"
      ],
      availableDates: [
        "2024-02-20",
        "2024-02-22",
        "2024-02-25",
        "2024-02-27",
        "2024-03-01",
        "2024-03-03"
      ],
      timeSlots: [
        { time: "11:00 AM - 2:00 PM", available: true },
        { time: "12:30 PM - 3:30 PM", available: true },
        { time: "2:00 PM - 5:00 PM", available: false }
      ],
      cancellationPolicy: "Free cancellation up to 24 hours before the event. 50% refund for cancellations within 24 hours.",
      dietaryOptions: ["Vegetarian", "Vegan", "Gluten-free", "Halal"],
      ageRestriction: "All ages welcome. Children under 5 dine free.",
      dressCode: "Smart casual to formal attire recommended"
    }
    
    setTimeout(() => {
      setPackageData(mockPackage)
      setLoading(false)
    }, 1000)
  }, [packageId])

  const handleBooking = () => {
    if (!selectedDate) {
      alert('Please select a date')
      return
    }
    navigate(`/booking/${packageData.eventId}?package=${packageData.id}&date=${selectedDate}&guests=${guestCount}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Package not found</h2>
          <Link to="/explore" className="btn-primary">
            Browse Packages
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = packageData.price * guestCount
  const savings = (packageData.originalPrice - packageData.price) * guestCount

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white shadow-soft border-b border-neutral-100">
        <div className="max-w-7xl mx-auto container-padding pt-24 pb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-neutral-600 hover:text-primary-600 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="p-2 text-neutral-600 hover:text-primary-600 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-4">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <span>•</span>
            <Link to="/explore" className="hover:text-primary-600">Explore</Link>
            <span>•</span>
            <Link to="/explore?tab=packages" className="hover:text-primary-600">Packages</Link>
            <span>•</span>
            <span>{packageData.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto container-padding py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package Header */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                {packageData.popular && (
                  <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                )}
                <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm font-medium">
                  {packageData.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-neutral-800 mb-4">{packageData.name}</h1>
              
              <div className="flex items-center space-x-6 text-neutral-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{packageData.rating}</span>
                  <span>({packageData.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-5 h-5" />
                  <span>{packageData.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-5 h-5" />
                  <span>{packageData.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-5 h-5" />
                  <span>Up to {packageData.maxGuests} guests</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-primary-600">AED {packageData.price}</span>
                  {packageData.originalPrice > packageData.price && (
                    <span className="text-lg text-neutral-500 line-through">AED {packageData.originalPrice}</span>
                  )}
                  <span className="text-neutral-600">per person</span>
                </div>
                {savings > 0 && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Gift className="w-4 h-4" />
                    <span>Save AED {packageData.originalPrice - packageData.price}</span>
                  </div>
                )}
              </div>
              
              <p className="text-lg text-neutral-700 leading-relaxed">{packageData.description}</p>
            </div>

            {/* Image Gallery */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packageData.images.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-2xl">
                    <img 
                      src={image} 
                      alt={`${packageData.name} ${index + 1}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">Experience Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-xl border border-neutral-100">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="text-neutral-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">What's Included</h3>
              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageData.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary-600" />
                      </div>
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                <h4 className="text-lg font-bold text-neutral-800 mb-4">Included</h4>
                <ul className="space-y-2">
                  {packageData.inclusions.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-6 border border-neutral-100">
                <h4 className="text-lg font-bold text-neutral-800 mb-4">Not Included</h4>
                <ul className="space-y-2">
                  {packageData.exclusions.map((item, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-4 h-4 text-red-500">×</span>
                      <span className="text-neutral-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-100">
              <h3 className="text-xl font-bold text-neutral-800 mb-4">Important Information</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-neutral-800 mb-2">Cancellation Policy</h4>
                  <p className="text-neutral-600">{packageData.cancellationPolicy}</p>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800 mb-2">Dress Code</h4>
                  <p className="text-neutral-600">{packageData.dressCode}</p>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800 mb-2">Age Restriction</h4>
                  <p className="text-neutral-600">{packageData.ageRestriction}</p>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-800 mb-2">Dietary Options</h4>
                  <div className="flex flex-wrap gap-2">
                    {packageData.dietaryOptions.map((option, index) => (
                      <span key={index} className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-neutral-100 sticky top-8">
              <h3 className="text-xl font-bold text-neutral-800 mb-6">Book This Package</h3>
              
              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Select Date</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none"
                >
                  <option value="">Choose a date</option>
                  {packageData.availableDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Available Times</label>
                  <div className="space-y-2">
                    {packageData.timeSlots.map((slot, index) => (
                      <button
                        key={index}
                        disabled={!slot.available}
                        className={`w-full p-3 text-left rounded-xl border transition-all duration-200 ${
                          slot.available
                            ? 'border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
                            : 'border-neutral-100 bg-neutral-50 text-neutral-400 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{slot.time}</span>
                          <span className={`text-sm ${slot.available ? 'text-green-600' : 'text-red-500'}`}>
                            {slot.available ? 'Available' : 'Sold Out'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Guest Count */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Number of Guests</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setGuestCount(Math.max(packageData.minGuests, guestCount - 1))}
                    className="w-10 h-10 border border-neutral-200 rounded-xl flex items-center justify-center hover:bg-neutral-50"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-medium">{guestCount} guests</span>
                  <button
                    onClick={() => setGuestCount(Math.min(packageData.maxGuests, guestCount + 1))}
                    className="w-10 h-10 border border-neutral-200 rounded-xl flex items-center justify-center hover:bg-neutral-50"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-neutral-500 mt-1">
                  Min: {packageData.minGuests}, Max: {packageData.maxGuests} guests
                </p>
              </div>

              {/* Price Summary */}
              <div className="space-y-3 mb-6 p-4 bg-neutral-50 rounded-xl">
                <div className="flex justify-between">
                  <span className="text-neutral-600">AED {packageData.price} × {guestCount} guests</span>
                  <span className="font-medium">AED {totalPrice}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Total Savings</span>
                    <span className="font-medium">-AED {savings}</span>
                  </div>
                )}
                <hr className="border-neutral-200" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-neutral-800">Total</span>
                  <span className="text-2xl font-bold text-primary-600">AED {totalPrice}</span>
                </div>
              </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDate}
                className="w-full btn-primary flex items-center justify-center space-x-2 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Book Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Additional Links */}
              <div className="space-y-2 text-center">
                <Link 
                  to={`/events/${packageData.eventId}`}
                  className="block text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Full Event Details
                </Link>
                <Link 
                  to={`/venues/${packageData.venueId}`}
                  className="block text-neutral-600 hover:text-neutral-700"
                >
                  About {packageData.venue}
                </Link>
              </div>

              <p className="text-xs text-neutral-500 text-center mt-4">
                Free cancellation up to 24 hours before the event
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackageDetailPage