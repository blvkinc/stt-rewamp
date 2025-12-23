import React, { useState, useEffect } from 'react'
import { Navigate, Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  Eye,
  Upload,
  DollarSign,
  Users,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const CreatePackagePage = () => {
  const { merchant, isMerchantAuthenticated, events, addPackage, updatePackage } = useMerchant()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eventId: '',
    price: '',
    originalPrice: '',
    maxGuests: 2,
    minGuests: 1,
    status: 'draft',
    features: [],
    inclusions: [],
    exclusions: [],
    images: [],
    validFrom: '',
    validUntil: '',
    availableDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    },
    timeSlots: [],
    cancellationPolicy: '',
    termsAndConditions: ''
  })

  useEffect(() => {
    if (isEditMode && events.length > 0) {
      // Find package across all events
      let foundPackage = null
      let foundEventId = null

      for (const event of events) {
        const pkg = (event.packages || []).find(p => p.id === parseInt(id) || p.id === id)
        if (pkg) {
          foundPackage = pkg
          foundEventId = event.id
          break
        }
      }

      if (foundPackage) {
        setFormData({
          ...foundPackage,
          eventId: foundEventId // Ensure eventId is set
        })
      }
    }
  }, [isEditMode, id, events])

  const [newFeature, setNewFeature] = useState('')
  const [newInclusion, setNewInclusion] = useState('')
  const [newExclusion, setNewExclusion] = useState('')
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      availableDays: {
        ...prev.availableDays,
        [day]: !prev.availableDays[day]
      }
    }))
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setFormData(prev => ({
        ...prev,
        inclusions: [...prev.inclusions, newInclusion.trim()]
      }))
      setNewInclusion('')
    }
  }

  const removeInclusion = (index) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }))
  }

  const addExclusion = () => {
    if (newExclusion.trim()) {
      setFormData(prev => ({
        ...prev,
        exclusions: [...prev.exclusions, newExclusion.trim()]
      }))
      setNewExclusion('')
    }
  }

  const removeExclusion = (index) => {
    setFormData(prev => ({
      ...prev,
      exclusions: prev.exclusions.filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Package name is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.eventId) newErrors.eventId = 'Please select an event'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required'
    if (formData.maxGuests < formData.minGuests) newErrors.maxGuests = 'Max guests must be greater than min guests'
    if (formData.features.length === 0) newErrors.features = 'Add at least one feature'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (status) => {
    if (!validateForm()) {
      return
    }

    setSaving(true)

    try {
      const packageData = {
        ...formData,
        status,
      }

      if (isEditMode) {
        updatePackage(parseInt(id) || id, packageData)
      } else {
        addPackage(formData.eventId, packageData)
      }

      // Navigate back to packages page
      navigate('/merchant/packages')
    } catch (error) {
      console.error('Error saving package:', error)
      setErrors({ submit: 'Failed to save package. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  // Mock events data
  const mockEvents = events.length > 0 ? events : [
    { id: 1, name: 'Weekend Brunch' },
    { id: 2, name: 'Business Lunch' },
    { id: 3, name: 'Romantic Dinner' },
    { id: 4, name: 'Family Celebration' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/merchant/packages"
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">{isEditMode ? 'Edit Package' : 'Create Package'}</h1>
            <p className="text-neutral-600">{isEditMode ? 'Update package details' : 'Design a custom package for your event'}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="btn-secondary flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save as Draft</span>
          </button>
          <button
            onClick={() => handleSubmit('active')}
            disabled={saving}
            className="flex items-center space-x-2 px-6 py-2 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
              boxShadow: '0 4px 15px rgba(24, 144, 255, 0.4)',
              fontWeight: 600
            }}
          >
            <CheckCircle className="w-5 h-5" />
            <span>{saving ? 'Saving...' : (isEditMode ? 'Update Package' : 'Publish Package')}</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-800">{errors.submit}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">Basic Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Premium Brunch Package"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-300 outline-none ${errors.name ? 'border-red-300' : 'border-neutral-200'
                      }`}
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what makes this package special..."
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-300 outline-none ${errors.description ? 'border-red-300' : 'border-neutral-200'
                      }`}
                  />
                  {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Select Event *
                  </label>
                  <select
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-300 outline-none ${errors.eventId ? 'border-red-300' : 'border-neutral-200'
                      }`}
                  >
                    <option value="">Choose an event</option>
                    {mockEvents.map(event => (
                      <option key={event.id} value={event.id}>{event.name}</option>
                    ))}
                  </select>
                  {errors.eventId && <p className="text-red-600 text-sm mt-1">{errors.eventId}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">Pricing</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Price (AED) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="299"
                      min="0"
                      step="0.01"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-300 outline-none ${errors.price ? 'border-red-300' : 'border-neutral-200'
                        }`}
                    />
                  </div>
                  {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Original Price (AED)
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="349"
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                    />
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Optional: Show discount</p>
                </div>
              </div>

              {formData.price && formData.originalPrice && formData.originalPrice > formData.price && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <p className="text-green-800 font-medium">
                    Discount: AED {(formData.originalPrice - formData.price).toFixed(2)}
                    ({(((formData.originalPrice - formData.price) / formData.originalPrice) * 100).toFixed(0)}% off)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Guest Capacity */}
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">Guest Capacity</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Minimum Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="number"
                      name="minGuests"
                      value={formData.minGuests}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Maximum Guests *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                    <input
                      type="number"
                      name="maxGuests"
                      value={formData.maxGuests}
                      onChange={handleInputChange}
                      min="1"
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-300 outline-none ${errors.maxGuests ? 'border-red-300' : 'border-neutral-200'
                        }`}
                    />
                  </div>
                  {errors.maxGuests && <p className="text-red-600 text-sm mt-1">{errors.maxGuests}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Package Features */}
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">Package Features *</h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="e.g., Welcome drink on arrival"
                    className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                  />
                  <button
                    onClick={addFeature}
                    className="btn-primary px-6"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {errors.features && formData.features.length === 0 && (
                  <p className="text-red-600 text-sm">{errors.features}</p>
                )}

                <div className="space-y-2">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                        <span className="text-neutral-800">{feature}</span>
                      </div>
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inclusions */}
            <div className="card border border-neutral-100">
              <div className="p-6">
                <h2 className="text-lg font-bold text-neutral-800 mb-4">What's Included</h2>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newInclusion}
                      onChange={(e) => setNewInclusion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInclusion())}
                      placeholder="e.g., Valet parking"
                      className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none text-sm"
                    />
                    <button
                      onClick={addInclusion}
                      className="btn-primary px-4 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.inclusions.map((inclusion, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                        <span className="text-sm text-neutral-800">{inclusion}</span>
                        <button
                          onClick={() => removeInclusion(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Exclusions */}
            <div className="card border border-neutral-100">
              <div className="p-6">
                <h2 className="text-lg font-bold text-neutral-800 mb-4">What's Not Included</h2>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newExclusion}
                      onChange={(e) => setNewExclusion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExclusion())}
                      placeholder="e.g., Transportation"
                      className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none text-sm"
                    />
                    <button
                      onClick={addExclusion}
                      className="btn-primary px-4 text-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {formData.exclusions.map((exclusion, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                        <span className="text-sm text-neutral-800">{exclusion}</span>
                        <button
                          onClick={() => removeExclusion(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">Availability</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Valid From
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="date"
                        name="validFrom"
                        value={formData.validFrom}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Valid Until
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                      <input
                        type="date"
                        name="validUntil"
                        value={formData.validUntil}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Available Days
                  </label>
                  <div className="grid grid-cols-7 gap-2">
                    {Object.keys(formData.availableDays).map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${formData.availableDays[day]
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                          }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">Policies</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Cancellation Policy
                  </label>
                  <textarea
                    name="cancellationPolicy"
                    value={formData.cancellationPolicy}
                    onChange={handleInputChange}
                    placeholder="e.g., Free cancellation up to 24 hours before the event..."
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Terms & Conditions
                  </label>
                  <textarea
                    name="termsAndConditions"
                    value={formData.termsAndConditions}
                    onChange={handleInputChange}
                    placeholder="Enter terms and conditions for this package..."
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Sidebar */}
        <div className="lg:col-span-1">
          <div className="card border border-neutral-100 sticky top-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-neutral-800">Preview</h3>
                <Eye className="w-5 h-5 text-neutral-400" />
              </div>

              <div className="space-y-4">
                {formData.name && (
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Package Name</p>
                    <p className="font-bold text-neutral-800">{formData.name}</p>
                  </div>
                )}

                {formData.price && (
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Price</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-primary-600">AED {formData.price}</p>
                      {formData.originalPrice && formData.originalPrice > formData.price && (
                        <p className="text-lg text-neutral-500 line-through">AED {formData.originalPrice}</p>
                      )}
                    </div>
                  </div>
                )}

                {formData.maxGuests && (
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Capacity</p>
                    <p className="text-neutral-800">Up to {formData.maxGuests} guests</p>
                  </div>
                )}

                {formData.features.length > 0 && (
                  <div>
                    <p className="text-sm text-neutral-500 mb-2">Features</p>
                    <div className="space-y-1">
                      {formData.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-neutral-700">
                          <CheckCircle className="w-4 h-4 text-primary-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {formData.features.length > 3 && (
                        <p className="text-sm text-neutral-500">+{formData.features.length - 3} more</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-neutral-200">
                  <p className="text-sm text-neutral-500 mb-2">Status</p>
                  <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700">
                    Draft
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default CreatePackagePage