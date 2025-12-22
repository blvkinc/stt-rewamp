import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, MapPin, Phone, Mail, Building, CreditCard, AlertCircle, CheckCircle } from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'

const MerchantOnboardingPage = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { registerMerchant } = useMerchant()

  const [formData, setFormData] = useState({
    // Business Info
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Venue Info
    venueName: '',
    venueType: '',
    address: '',
    city: 'Dubai',
    description: '',
    capacity: '',
    
    // Documents
    businessLicense: null,
    tradeLicense: null,
    
    // Banking
    bankName: '',
    accountNumber: '',
    iban: '',
    
    // Additional
    website: '',
    instagram: '',
    facebook: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    })
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const result = await registerMerchant({
        businessName: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        venueData: {
          venueName: formData.venueName,
          venueType: formData.venueType,
          address: formData.address,
          city: formData.city,
          description: formData.description,
          capacity: formData.capacity,
          website: formData.website,
          instagram: formData.instagram,
          facebook: formData.facebook
        }
      })

      if (result.success) {
        setSuccess('Application submitted successfully! You will be notified once approved.')
        setTimeout(() => {
          navigate('/merchant/dashboard')
        }, 2000)
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  const venueTypes = [
    'Restaurant',
    'Cafe',
    'Bar & Lounge',
    'Hotel Restaurant',
    'Beach Club',
    'Rooftop Venue',
    'Fine Dining',
    'Casual Dining',
    'Fast Casual',
    'Other'
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto container-padding pt-24 pb-12">
        {/* Back Button */}
        <Link to="/merchant/auth" className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary-500 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Login</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-800 mb-4">Join Set The Table</h1>
          <p className="text-xl text-neutral-600">Partner with Dubai's premier dining platform</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-semibold shadow-soft transition-all duration-300 ${
                  step >= stepNumber 
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white scale-110' 
                    : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
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
                Step {step} of 4: {
                  step === 1 ? 'Business Information' :
                  step === 2 ? 'Venue Details' :
                  step === 3 ? 'Documents & Banking' :
                  'Review & Submit'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card border border-neutral-100">
          <div className="p-8">
            {/* Error/Success Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-red-700">{error}</span>
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-green-700">{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Business Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-6">Business Information</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Business Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                        placeholder="Your Restaurant Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                          placeholder="business@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300"
                          placeholder="+971 4 123 4567"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="Minimum 6 characters"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Venue Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-6">Venue Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Venue Name *
                      </label>
                      <input
                        type="text"
                        name="venueName"
                        value={formData.venueName}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="Main venue name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Venue Type *
                      </label>
                      <select
                        name="venueType"
                        value={formData.venueType}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                      >
                        <option value="">Select venue type</option>
                        {venueTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 text-neutral-400 w-5 h-5" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-300 outline-none bg-white transition-all duration-300 resize-none"
                        placeholder="Full venue address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="input-field"
                        placeholder="Dubai"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Capacity (guests)
                      </label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className="input-field"
                        placeholder="Maximum capacity"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Venue Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Describe your venue, cuisine, ambiance, and unique features..."
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Documents & Banking */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-6">Documents & Banking</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Business License *
                      </label>
                      <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 text-center hover:border-primary-400 transition-colors">
                        <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                        <input
                          type="file"
                          name="businessLicense"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="business-license"
                        />
                        <label htmlFor="business-license" className="cursor-pointer">
                          <span className="text-primary-600 font-medium">Upload file</span>
                          <p className="text-sm text-neutral-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Trade License *
                      </label>
                      <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 text-center hover:border-primary-400 transition-colors">
                        <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                        <input
                          type="file"
                          name="tradeLicense"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="hidden"
                          id="trade-license"
                        />
                        <label htmlFor="trade-license" className="cursor-pointer">
                          <span className="text-primary-600 font-medium">Upload file</span>
                          <p className="text-sm text-neutral-500 mt-1">PDF, JPG, PNG up to 5MB</p>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Banking Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Bank Name *
                        </label>
                        <input
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleInputChange}
                          required
                          className="input-field"
                          placeholder="Emirates NBD"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Account Number *
                        </label>
                        <input
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                          required
                          className="input-field"
                          placeholder="Account number"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          IBAN *
                        </label>
                        <input
                          type="text"
                          name="iban"
                          value={formData.iban}
                          onChange={handleInputChange}
                          required
                          className="input-field"
                          placeholder="AE07 0331 2345 6789 0123 456"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-4">Social Media (Optional)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Website
                        </label>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Instagram
                        </label>
                        <input
                          type="text"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="@yourrestaurant"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Facebook
                        </label>
                        <input
                          type="text"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="Facebook page name"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-neutral-800 mb-6">Review & Submit</h2>
                  
                  <div className="bg-neutral-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-4">Application Summary</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-neutral-700 mb-2">Business Information</h4>
                        <p className="text-neutral-600">Business: {formData.businessName}</p>
                        <p className="text-neutral-600">Email: {formData.email}</p>
                        <p className="text-neutral-600">Phone: {formData.phone}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-neutral-700 mb-2">Venue Details</h4>
                        <p className="text-neutral-600">Venue: {formData.venueName}</p>
                        <p className="text-neutral-600">Type: {formData.venueType}</p>
                        <p className="text-neutral-600">City: {formData.city}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
                    <ul className="text-blue-700 space-y-1">
                      <li>• Your application will be reviewed within 2-3 business days</li>
                      <li>• We'll verify your documents and venue information</li>
                      <li>• You'll receive an email notification about the approval status</li>
                      <li>• Once approved, you can start creating events and managing bookings</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary"
                  >
                    Previous
                  </button>
                )}
                
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MerchantOnboardingPage