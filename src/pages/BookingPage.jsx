import React, { useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Shield, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useBooking } from '../context/BookingContext'

const BookingPage = () => {
  const { id } = useParams()
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { addBooking } = useBooking()
  
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialRequests: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })

  // Redirect to auth if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process booking
      const newBooking = addBooking({
        event: booking.event,
        venue: booking.venue,
        date: booking.date,
        time: booking.time,
        price: booking.price,
        guests: 2,
        package: booking.package,
        image: booking.image
      })
      
      alert('Booking confirmed! You will receive a confirmation email shortly.')
      setTimeout(() => {
        navigate('/profile')
      }, 2000)
    }
  }

  // Mock booking data
  const booking = {
    event: "Luxury Brunch at Burj Al Arab",
    venue: "Al Muntaha Restaurant",
    date: "2024-12-15",
    time: "11:00 AM - 3:00 PM",
    package: "Couple Package",
    guests: 2,
    price: 549,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto container-padding pt-24 pb-12">
        {/* Back Button */}
        <Link to={`/events/${id}`} className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary-500 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Event Details</span>
        </Link>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-semibold shadow-soft transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white scale-110' 
                    : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {step > stepNumber ? <Check className="w-6 h-6" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-20 h-2 mx-3 rounded-full transition-all duration-300 ${
                    step > stepNumber ? 'bg-gradient-to-r from-primary-500 to-primary-600' : 'bg-neutral-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <div className="text-center">
              <div className="text-lg font-semibold text-neutral-700">
                Step {step} of 3: {
                  step === 1 ? 'Guest Information' :
                  step === 2 ? 'Payment Details' :
                  'Confirmation'
                }
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  {step === 1 && (
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Guest Information</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Special Requests (Optional)
                        </label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleInputChange}
                          rows={3}
                          className="input-field"
                          placeholder="Any dietary restrictions, celebrations, or special requirements..."
                        />
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Payment Details</h2>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Card Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="1234 5678 9012 3456"
                            className="input-field pr-12"
                          />
                          <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            required
                            placeholder="MM/YY"
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                            placeholder="123"
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                          className="input-field"
                        />
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg mb-6">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <Shield className="w-5 h-5" />
                          <span className="text-sm">Your payment information is secure and encrypted</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900 mb-6">Booking Confirmation</h2>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                        <div className="flex items-center space-x-2 text-green-700 mb-2">
                          <Check className="w-5 h-5" />
                          <span className="font-medium">Booking Confirmed!</span>
                        </div>
                        <p className="text-green-600">
                          Your booking has been successfully confirmed. You will receive a confirmation email shortly.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Booking Reference:</span>
                          <span className="font-medium text-slate-900">STT-{Date.now()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Guest Name:</span>
                          <span className="font-medium text-slate-900">
                            {formData.firstName} {formData.lastName}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Email:</span>
                          <span className="font-medium text-slate-900">{formData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Phone:</span>
                          <span className="font-medium text-slate-900">{formData.phone}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="btn-secondary"
                      >
                        Previous
                      </button>
                    )}
                    <button
                      type="submit"
                      className="btn-primary ml-auto"
                    >
                      {step === 3 ? 'Done' : step === 2 ? 'Confirm Payment' : 'Continue'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Booking Summary</h3>
                
                <div className="mb-4">
                  <img
                    src={booking.image}
                    alt={booking.event}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-slate-900">{booking.event}</h4>
                  <p className="text-slate-600 text-sm">{booking.venue}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Date:</span>
                    <span className="text-slate-900">{booking.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Time:</span>
                    <span className="text-slate-900">{booking.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Package:</span>
                    <span className="text-slate-900">{booking.package}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Guests:</span>
                    <span className="text-slate-900">{booking.guests}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-primary-500">AED {booking.price}</span>
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

export default BookingPage
