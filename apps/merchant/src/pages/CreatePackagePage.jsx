import React, { useState, useEffect } from 'react'
import { Navigate, Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Plus,
  X,
  Save,
  Eye,
  DollarSign,
  Users,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Settings,
  Tag,
  Gift
} from 'lucide-react'
import { useMerchant } from '@shared/context/MerchantContext'

const CreatePackagePage = () => {
  const { isMerchantAuthenticated, packageTemplates, addPackageTemplate, updatePackageTemplate } = useMerchant()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id

  const [activeTab, setActiveTab] = useState('basics') // basics, rules, availability, combos, discounts

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    maxGuests: 2,
    minGuests: 1,
    status: 'Draft',
    features: [],
    inclusions: [],
    exclusions: [],
    // newly added fields below matching context shape
    pricingRules: {
      type: 'individual',
      basePrice: '',
      genderPricing: { enabled: false, ladies: '', gents: '', kids: '' },
      timePricing: { enabled: false, type: 'early_bird', discountLimit: '', rules: [] },
      fixedPricing: { enabled: false, amount: '' }
    },
    availability: {
      type: 'day', // 'day' or 'time'
      slots: [], 
      validFrom: '',
      validUntil: '',
      inventory: '',
      timeCondition: {
        enabled: false,
        mode: 'available',
        startTime: '',
        endTime: '',
        days: []
      },
      dayBased: {
        enabled: false,
        applyAllDays: true,
        startTime: '',
        endTime: '',
        days: []
      }
    },
    combinations: {
      enabled: false,
      linkedPackages: []
    },
    discounts: {
      multiBooking: { enabled: false, count: '', price: '' },
      gender: { enabled: false, type: 'ladies_night', value: '' },
      age: { enabled: false, label: 'child', condition: 'below', age: 12, price: '' }
    },
    menus: {
      links: [],
      note: ''
    },
    otherServices: {
      type: 'fixed',
      value: ''
    },
    cancellationPolicy: '',
    termsAndConditions: ''
  })

  useEffect(() => {
    if (isEditMode && (packageTemplates || []).length > 0) {
      const foundTemplate = (packageTemplates || []).find(p => p.id === parseInt(id) || p.id === id)

      if (foundTemplate) {
        setFormData(prev => ({
          ...prev,
          ...foundTemplate,
          features: foundTemplate.features || [],
          inclusions: foundTemplate.inclusions || [],
          exclusions: foundTemplate.exclusions || [],
          pricingRules: foundTemplate.pricingRules || prev.pricingRules,
          availability: foundTemplate.availability || prev.availability,
          combinations: foundTemplate.combinations || prev.combinations,
          discounts: foundTemplate.discounts || prev.discounts,
          menus: foundTemplate.menus || prev.menus,
          otherServices: foundTemplate.otherServices || prev.otherServices
        }))
      }
    }
  }, [isEditMode, id, packageTemplates])

  const [newFeature, setNewFeature] = useState('')
  const [newInclusion, setNewInclusion] = useState('')
  const [newExclusion, setNewExclusion] = useState('')
  const [newMenuLink, setNewMenuLink] = useState('')
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'name' && !prev.slug
        ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') }
        : {})
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleNestedInputChange = (section, field, value) => {
    setFormData(prev => {
      const next = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }
      if (section === 'pricingRules' && field === 'type') {
        if (value === 'individual') {
          next.minGuests = 1
          next.maxGuests = 1
        } else if (value === 'couple') {
          next.minGuests = 2
          next.maxGuests = Math.max(2, Number(prev.maxGuests || 2))
        } else if (value === 'group') {
          next.minGuests = Math.max(4, Number(prev.minGuests || 1))
          next.maxGuests = Math.max(4, Number(prev.maxGuests || 4))
        }
      }
      return next
    })
  }

  const handleDeepNestedChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
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

  const addMenuLink = () => {
    if (newMenuLink.trim()) {
      setFormData(prev => ({
        ...prev,
        menus: {
          ...prev.menus,
          links: [...(prev.menus?.links || []), newMenuLink.trim()]
        }
      }))
      setNewMenuLink('')
    }
  }

  const removeMenuLink = (index) => {
    setFormData(prev => ({
      ...prev,
      menus: {
        ...prev.menus,
        links: (prev.menus?.links || []).filter((_, i) => i !== index)
      }
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Package name is required'
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.pricingRules.basePrice || formData.pricingRules.basePrice <= 0) newErrors.price = 'Valid base price is required'
    if (formData.maxGuests < formData.minGuests) newErrors.maxGuests = 'Max guests must be greater than min guests'

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
        updatePackageTemplate(parseInt(id) || id, packageData)
      } else {
        addPackageTemplate(packageData)
      }

      // Briefly wait then navigate
      setTimeout(() => {
        navigate('/packages')
      }, 500)
    } catch (error) {
      console.error('Error saving package:', error)
      setErrors({ submit: 'Failed to save package. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  // Mock events data
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/packages"
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-neutral-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">{isEditMode ? 'Edit Package Template' : 'Create Package Template'}</h1>
            <p className="text-neutral-600">{isEditMode ? 'Update template details' : 'Design a reusable package template for events'}</p>
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
            onClick={() => handleSubmit('pending')}
            disabled={saving}
            className="btn-secondary flex items-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Submit for Approval</span>
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
            <span>{saving ? 'Saving...' : (isEditMode ? 'Update Template' : 'Publish Template')}</span>
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

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 mb-6 overflow-x-auto scroller">
        {[
          { id: 'basics', label: '1. Basics', icon: Settings },
          { id: 'rules', label: '2. Rule Engine', icon: DollarSign },
          { id: 'availability', label: '3. Availability', icon: Calendar },
          { id: 'combos', label: '4. Combinations', icon: Plus },
          { id: 'discounts', label: '5. Discounts', icon: Gift },
          { id: 'menus', label: '6. Menus & Services', icon: Tag },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* TAB: BASICS */}
          {activeTab === 'basics' && (
            <>
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
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="e.g., premium-brunch-package"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary-300 outline-none ${errors.slug ? 'border-red-300' : 'border-neutral-200'
                      }`}
                  />
                  {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
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
                  <p className="text-sm text-neutral-500">
                    Templates can be reused across events. Event-specific rules are configured when attaching the template to an event.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

        {/* TAB: RULE ENGINE */}
        {activeTab === 'rules' && (
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">Package Pricing Rules</h2>
              <p className="text-sm text-neutral-500 mb-6">
                These act as defaults. Event-specific rules can override them when the template is attached to an event.
              </p>

              <div className="space-y-6">
                {/* Base Pricing */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <h3 className="text-lg font-bold text-neutral-800 mb-4">Base Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Package Type</label>
                      <select
                        value={formData.pricingRules.type}
                        onChange={(e) => handleNestedInputChange('pricingRules', 'type', e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                      >
                        <option value="individual">Individual</option>
                        <option value="couple">Couple</option>
                        <option value="group">Group</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Base Price (AED) *</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                        <input
                          type="number"
                          value={formData.pricingRules.basePrice}
                          onChange={(e) => handleNestedInputChange('pricingRules', 'basePrice', e.target.value)}
                          placeholder="299"
                          className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                        />
                      </div>
                      {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
                    </div>
                  </div>
                </div>

                {/* Gender Pricing */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-neutral-800">Gender Pricing overrides</h3>
                    <label className="flex flex-col relative items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.pricingRules.genderPricing.enabled}
                        onChange={(e) => handleDeepNestedChange('pricingRules', 'genderPricing', 'enabled', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  {formData.pricingRules.genderPricing.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <label className="block text-sm text-neutral-600 mb-1">Ladies Price</label>
                        <input
                          type="number"
                          value={formData.pricingRules.genderPricing.ladies}
                          onChange={(e) => handleDeepNestedChange('pricingRules', 'genderPricing', 'ladies', e.target.value)}
                          placeholder="AED"
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-neutral-600 mb-1">Gents Price</label>
                        <input
                          type="number"
                          value={formData.pricingRules.genderPricing.gents}
                          onChange={(e) => handleDeepNestedChange('pricingRules', 'genderPricing', 'gents', e.target.value)}
                          placeholder="AED"
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-neutral-600 mb-1">Kids Price</label>
                        <input
                          type="number"
                          value={formData.pricingRules.genderPricing.kids}
                          onChange={(e) => handleDeepNestedChange('pricingRules', 'genderPricing', 'kids', e.target.value)}
                          placeholder="AED"
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Time Based Pricing */}
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800">Time-based Pricing</h3>
                      <p className="text-sm text-neutral-500">Enable early bird or conditional pricing based on time.</p>
                    </div>
                    <label className="flex flex-col relative items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.pricingRules.timePricing.enabled}
                        onChange={(e) => handleDeepNestedChange('pricingRules', 'timePricing', 'enabled', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  {formData.pricingRules.timePricing.enabled && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-neutral-600 mb-1">Rule Type</label>
                          <select
                            value={formData.pricingRules.timePricing.type}
                            onChange={(e) => handleDeepNestedChange('pricingRules', 'timePricing', 'type', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            <option value="early_bird">Early Bird</option>
                            <option value="last_minute">Last Minute</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-neutral-600 mb-1">Max Limit (Tickets)</label>
                          <input
                            type="number"
                            value={formData.pricingRules.timePricing.discountLimit}
                            onChange={(e) => handleDeepNestedChange('pricingRules', 'timePricing', 'discountLimit', e.target.value)}
                            placeholder="Optional capacity cap"
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

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

        {/* TAB: AVAILABILITY */}
        {activeTab === 'availability' && (
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">Package Availability</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Rule Type</label>
                  <select
                    value={formData.availability.type}
                    onChange={(e) => handleNestedInputChange('availability', 'type', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                  >
                    <option value="day">Day Based (e.g. Every Monday)</option>
                    <option value="time">Date Time Based (e.g. Nov 1st to Dec 1st)</option>
                  </select>
                </div>

                {formData.availability.type === 'time' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Valid From</label>
                      <input
                        type="date"
                        value={formData.availability.validFrom}
                        onChange={(e) => handleNestedInputChange('availability', 'validFrom', e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Valid Until</label>
                      <input
                        type="date"
                        value={formData.availability.validUntil}
                        onChange={(e) => handleNestedInputChange('availability', 'validUntil', e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Inventory/Slots limit</label>
                  <input
                    type="number"
                    value={formData.availability.inventory}
                    onChange={(e) => handleNestedInputChange('availability', 'inventory', e.target.value)}
                    placeholder="E.g. 50 packages available"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Leave blank for unlimited quantity within guest capacity</p>
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800">Time-based Availability Condition</h3>
                      <p className="text-sm text-neutral-500">Set available or unavailable time windows.</p>
                    </div>
                    <label className="flex flex-col relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.availability.timeCondition.enabled}
                        onChange={(e) => handleDeepNestedChange('availability', 'timeCondition', 'enabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  {formData.availability.timeCondition.enabled && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-neutral-600 mb-1">Mode</label>
                          <select
                            value={formData.availability.timeCondition.mode}
                            onChange={(e) => handleDeepNestedChange('availability', 'timeCondition', 'mode', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            <option value="available">Available Times</option>
                            <option value="unavailable">Unavailable Times</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-neutral-600 mb-1">Start Time</label>
                          <input
                            type="time"
                            value={formData.availability.timeCondition.startTime}
                            onChange={(e) => handleDeepNestedChange('availability', 'timeCondition', 'startTime', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-neutral-600 mb-1">End Time</label>
                          <input
                            type="time"
                            value={formData.availability.timeCondition.endTime}
                            onChange={(e) => handleDeepNestedChange('availability', 'timeCondition', 'endTime', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-neutral-600 mb-2">Select Days</label>
                        <div className="flex flex-wrap gap-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <label key={day} className="flex items-center gap-2 text-sm text-neutral-700">
                              <input
                                type="checkbox"
                                checked={formData.availability.timeCondition.days.includes(day.toLowerCase())}
                                onChange={(e) => {
                                  const selected = formData.availability.timeCondition.days
                                  const next = e.target.checked
                                    ? [...selected, day.toLowerCase()]
                                    : selected.filter(d => d !== day.toLowerCase())
                                  handleDeepNestedChange('availability', 'timeCondition', 'days', next)
                                }}
                              />
                              {day}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800">Day-based Toggle</h3>
                      <p className="text-sm text-neutral-500">Apply the same time to all days or pick specific days.</p>
                    </div>
                    <label className="flex flex-col relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.availability.dayBased.enabled}
                        onChange={(e) => handleDeepNestedChange('availability', 'dayBased', 'enabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  {formData.availability.dayBased.enabled && (
                    <div className="space-y-4">
                      <label className="flex items-center gap-2 text-sm text-neutral-700">
                        <input
                          type="checkbox"
                          checked={formData.availability.dayBased.applyAllDays}
                          onChange={(e) => handleDeepNestedChange('availability', 'dayBased', 'applyAllDays', e.target.checked)}
                        />
                        Apply to all days
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-neutral-600 mb-1">Start Time</label>
                          <input
                            type="time"
                            value={formData.availability.dayBased.startTime}
                            onChange={(e) => handleDeepNestedChange('availability', 'dayBased', 'startTime', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-neutral-600 mb-1">End Time</label>
                          <input
                            type="time"
                            value={formData.availability.dayBased.endTime}
                            onChange={(e) => handleDeepNestedChange('availability', 'dayBased', 'endTime', e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>

                      {!formData.availability.dayBased.applyAllDays && (
                        <div>
                          <label className="block text-sm text-neutral-600 mb-2">Select Days</label>
                          <div className="flex flex-wrap gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                              <label key={day} className="flex items-center gap-2 text-sm text-neutral-700">
                                <input
                                  type="checkbox"
                                  checked={formData.availability.dayBased.days.includes(day.toLowerCase())}
                                  onChange={(e) => {
                                    const selected = formData.availability.dayBased.days
                                    const next = e.target.checked
                                      ? [...selected, day.toLowerCase()]
                                      : selected.filter(d => d !== day.toLowerCase())
                                    handleDeepNestedChange('availability', 'dayBased', 'days', next)
                                  }}
                                />
                                {day}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB: COMBOS */}
        {activeTab === 'combos' && (
          <div className="card border border-neutral-100">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-800">Package Combinations</h2>
                  <p className="text-sm text-neutral-500">Allow customers to combine this package with others.</p>
                </div>
                <label className="flex flex-col relative items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.combinations.enabled}
                    onChange={(e) => handleNestedInputChange('combinations', 'enabled', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              {formData.combinations.enabled ? (
                <div className="text-center p-8 bg-neutral-50 rounded-xl border border-neutral-200 border-dashed">
                  <Plus className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600 mb-4">Select existing packages from this event to combine capabilities</p>
                  <button className="btn-secondary">Add Combination Rule</button>
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm border border-yellow-200">
                  Package combinations are disabled. This will be sold as an exclusive standalone package.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: DISCOUNTS */}
        {activeTab === 'discounts' && (
          <div className="card border border-neutral-100">
            <div className="p-6">
              <h2 className="text-xl font-bold text-neutral-800 mb-6">Discounts & Offers</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-neutral-800">Multi-booking Discount</h3>
                    <input 
                      type="checkbox" 
                      onChange={(e) => handleDeepNestedChange('discounts', 'multiBooking', 'enabled', e.target.checked)}
                      checked={formData.discounts.multiBooking.enabled}
                    />
                  </div>
                  <p className="text-sm text-neutral-500 mb-4">Discount applies if customer books more than X packages</p>
                  {formData.discounts.multiBooking.enabled && (
                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="number" 
                        placeholder="Booking count trigger (e.g. 5)"
                        onChange={(e) => handleDeepNestedChange('discounts', 'multiBooking', 'count', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      />
                      <input 
                        type="number" 
                        placeholder="New Price per package"
                        onChange={(e) => handleDeepNestedChange('discounts', 'multiBooking', 'price', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-neutral-800">Gender-based Discount</h3>
                    <input
                      type="checkbox"
                      onChange={(e) => handleDeepNestedChange('discounts', 'gender', 'enabled', e.target.checked)}
                      checked={formData.discounts.gender.enabled}
                    />
                  </div>
                  <p className="text-sm text-neutral-500 mb-4">Apply pricing rules for Ladies Night or Other groups.</p>
                  {formData.discounts.gender.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <select
                        value={formData.discounts.gender.type}
                        onChange={(e) => handleDeepNestedChange('discounts', 'gender', 'type', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      >
                        <option value="ladies_night">Ladies Night</option>
                        <option value="others">Others</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Discount Value"
                        onChange={(e) => handleDeepNestedChange('discounts', 'gender', 'value', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      />
                      <select
                        value={formData.discounts.gender.unit || 'percentage'}
                        onChange={(e) => handleDeepNestedChange('discounts', 'gender', 'unit', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      >
                        <option value="percentage">%</option>
                        <option value="fixed">AED</option>
                      </select>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-neutral-800">Age-based Discount</h3>
                    <input
                      type="checkbox"
                      onChange={(e) => handleDeepNestedChange('discounts', 'age', 'enabled', e.target.checked)}
                      checked={formData.discounts.age.enabled}
                    />
                  </div>
                  <p className="text-sm text-neutral-500 mb-4">Apply child or senior pricing based on age rules.</p>
                  {formData.discounts.age.enabled && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <select
                        value={formData.discounts.age.label}
                        onChange={(e) => handleDeepNestedChange('discounts', 'age', 'label', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      >
                        <option value="child">Child</option>
                        <option value="senior">Senior</option>
                      </select>
                      <select
                        value={formData.discounts.age.condition}
                        onChange={(e) => handleDeepNestedChange('discounts', 'age', 'condition', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      >
                        <option value="below">Below</option>
                        <option value="above">Above</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Age"
                        onChange={(e) => handleDeepNestedChange('discounts', 'age', 'age', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      />
                      <input
                        type="number"
                        placeholder="Price (AED)"
                        onChange={(e) => handleDeepNestedChange('discounts', 'age', 'price', e.target.value)}
                        className="px-3 py-2 border rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menus' && (
          <div className="card border border-neutral-100">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-neutral-800 mb-2">Menus & Food/Drinks</h2>
                <p className="text-sm text-neutral-500">Upload or link menus for this package.</p>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-neutral-700">Menu Links</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMenuLink}
                    onChange={(e) => setNewMenuLink(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                  />
                  <button onClick={addMenuLink} className="btn-primary px-4">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2">
                  {(formData.menus?.links || []).map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                      <span className="text-sm text-neutral-700 truncate">{link}</span>
                      <button onClick={() => removeMenuLink(index)} className="text-red-600 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Menu Notes</label>
                <textarea
                  value={formData.menus?.note || ''}
                  onChange={(e) => handleNestedInputChange('menus', 'note', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-300 outline-none"
                  placeholder="Any specific menu notes or buffet coverage..."
                />
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-800 mb-4">Other Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={formData.otherServices.type}
                    onChange={(e) => handleNestedInputChange('otherServices', 'type', e.target.value)}
                    className="px-3 py-2 border rounded-lg"
                  >
                    <option value="fixed">Fixed Price</option>
                    <option value="percentage">Percentage of Base Price</option>
                  </select>
                  <input
                    type="number"
                    value={formData.otherServices.value}
                    onChange={(e) => handleNestedInputChange('otherServices', 'value', e.target.value)}
                    placeholder="Value"
                    className="px-3 py-2 border rounded-lg"
                  />
                  <span className="text-sm text-neutral-500 self-center">
                    {formData.otherServices.type === 'fixed' ? 'AED' : '%'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

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

                {formData.slug && (
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Slug</p>
                    <p className="text-neutral-700 text-sm">{formData.slug}</p>
                  </div>
                )}

                {formData.pricingRules.basePrice && (
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">Base Price</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-2xl font-bold text-primary-600">AED {formData.pricingRules.basePrice}</p>
                    </div>
                    {formData.pricingRules.genderPricing.enabled && (
                      <div className="mt-2 text-xs text-neutral-500 space-y-1">
                        {formData.pricingRules.genderPricing.ladies && <p>Ladies: AED {formData.pricingRules.genderPricing.ladies}</p>}
                        {formData.pricingRules.genderPricing.gents && <p>Gents: AED {formData.pricingRules.genderPricing.gents}</p>}
                      </div>
                    )}
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
                    {formData.status || 'Draft'}
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

