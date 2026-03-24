import React, { useState } from 'react'
import { Plus, X, Calendar, Clock, Users, Percent, DollarSign, Settings } from 'lucide-react'

const RuleEngine = ({ packageData, onPackageUpdate }) => {
  const [activeTab, setActiveTab] = useState('pricing')

  const updatePackageRule = (ruleType, ruleData) => {
    onPackageUpdate({
      ...packageData,
      rules: {
        ...packageData.rules,
        [ruleType]: ruleData
      }
    })
  }

  // Base Pricing Component
  const BasePricing = () => (
    <div className="space-y-4">
      <h4 className="font-semibold text-neutral-800">Base Pricing</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Base Price (AED)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="number"
              value={packageData.rules?.basePricing?.basePrice || ''}
              onChange={(e) => updatePackageRule('basePricing', {
                ...packageData.rules?.basePricing,
                basePrice: e.target.value
              })}
              className="input-field pl-10"
              placeholder="299"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">Currency</label>
          <select
            value={packageData.rules?.basePricing?.currency || 'AED'}
            onChange={(e) => updatePackageRule('basePricing', {
              ...packageData.rules?.basePricing,
              currency: e.target.value
            })}
            className="input-field"
          >
            <option value="AED">AED</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
    </div>
  )

  // Gender Pricing Component
  const GenderPricing = () => {
    const genderPricing = packageData.rules?.genderPricing || {}
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-neutral-800">Gender-Based Pricing</h4>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={genderPricing.enabled || false}
              onChange={(e) => updatePackageRule('genderPricing', {
                ...genderPricing,
                enabled: e.target.checked
              })}
              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-600">Enable gender pricing</span>
          </label>
        </div>
        
        {genderPricing.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Ladies Price (AED)</label>
              <input
                type="number"
                value={genderPricing.ladiesPrice || ''}
                onChange={(e) => updatePackageRule('genderPricing', {
                  ...genderPricing,
                  ladiesPrice: e.target.value
                })}
                className="input-field"
                placeholder="249"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Gents Price (AED)</label>
              <input
                type="number"
                value={genderPricing.gentsPrice || ''}
                onChange={(e) => updatePackageRule('genderPricing', {
                  ...genderPricing,
                  gentsPrice: e.target.value
                })}
                className="input-field"
                placeholder="299"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Kids Price (AED)</label>
              <input
                type="number"
                value={genderPricing.kidsPrice || ''}
                onChange={(e) => updatePackageRule('genderPricing', {
                  ...genderPricing,
                  kidsPrice: e.target.value
                })}
                className="input-field"
                placeholder="149"
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  // Time-based Pricing Component
  const TimePricing = () => {
    const timePricing = packageData.rules?.timePricing || { slots: [] }
    
    const addTimeSlot = () => {
      updatePackageRule('timePricing', {
        ...timePricing,
        slots: [...timePricing.slots, { startTime: '', endTime: '', price: '', cutoffDate: '' }]
      })
    }

    const updateTimeSlot = (index, field, value) => {
      const updatedSlots = timePricing.slots.map((slot, i) => 
        i === index ? { ...slot, [field]: value } : slot
      )
      updatePackageRule('timePricing', { ...timePricing, slots: updatedSlots })
    }

    const removeTimeSlot = (index) => {
      updatePackageRule('timePricing', {
        ...timePricing,
        slots: timePricing.slots.filter((_, i) => i !== index)
      })
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-neutral-800">Time-Based Pricing</h4>
          <button
            type="button"
            onClick={addTimeSlot}
            className="btn-secondary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Time Slot</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {timePricing.slots.map((slot, index) => (
            <div key={index} className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-neutral-800">Time Slot {index + 1}</h5>
                <button
                  type="button"
                  onClick={() => removeTimeSlot(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Price (AED)</label>
                  <input
                    type="number"
                    value={slot.price}
                    onChange={(e) => updateTimeSlot(index, 'price', e.target.value)}
                    className="input-field"
                    placeholder="349"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Cutoff Date</label>
                  <input
                    type="date"
                    value={slot.cutoffDate}
                    onChange={(e) => updateTimeSlot(index, 'cutoffDate', e.target.value)}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Early Bird Pricing Component
  const EarlyBirdPricing = () => {
    const earlyBird = packageData.rules?.earlyBird || {}
    
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-neutral-800">Early Bird Pricing</h4>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={earlyBird.enabled || false}
              onChange={(e) => updatePackageRule('earlyBird', {
                ...earlyBird,
                enabled: e.target.checked
              })}
              className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-neutral-600">Enable early bird</span>
          </label>
        </div>
        
        {earlyBird.enabled && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Early Bird Price (AED)</label>
              <input
                type="number"
                value={earlyBird.price || ''}
                onChange={(e) => updatePackageRule('earlyBird', {
                  ...earlyBird,
                  price: e.target.value
                })}
                className="input-field"
                placeholder="199"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Valid Until</label>
              <input
                type="date"
                value={earlyBird.validUntil || ''}
                onChange={(e) => updatePackageRule('earlyBird', {
                  ...earlyBird,
                  validUntil: e.target.value
                })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Discount Type</label>
              <select
                value={earlyBird.discountType || 'fixed'}
                onChange={(e) => updatePackageRule('earlyBird', {
                  ...earlyBird,
                  discountType: e.target.value
                })}
                className="input-field"
              >
                <option value="fixed">Fixed Amount</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Availability Management Component
  const AvailabilityManagement = () => {
    const availability = packageData.rules?.availability || { slots: [], conditions: [] }
    
    const addAvailabilitySlot = () => {
      updatePackageRule('availability', {
        ...availability,
        slots: [...availability.slots, { date: '', startTime: '', endTime: '', capacity: '' }]
      })
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-neutral-800">Availability & Inventory</h4>
          <button
            type="button"
            onClick={addAvailabilitySlot}
            className="btn-secondary flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slot</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {availability.slots.map((slot, index) => (
            <div key={index} className="bg-neutral-50 rounded-xl p-4 border border-neutral-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={slot.date}
                    onChange={(e) => {
                      const updatedSlots = availability.slots.map((s, i) => 
                        i === index ? { ...s, date: e.target.value } : s
                      )
                      updatePackageRule('availability', { ...availability, slots: updatedSlots })
                    }}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Start Time</label>
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => {
                      const updatedSlots = availability.slots.map((s, i) => 
                        i === index ? { ...s, startTime: e.target.value } : s
                      )
                      updatePackageRule('availability', { ...availability, slots: updatedSlots })
                    }}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">End Time</label>
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => {
                      const updatedSlots = availability.slots.map((s, i) => 
                        i === index ? { ...s, endTime: e.target.value } : s
                      )
                      updatePackageRule('availability', { ...availability, slots: updatedSlots })
                    }}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Capacity</label>
                  <input
                    type="number"
                    value={slot.capacity}
                    onChange={(e) => {
                      const updatedSlots = availability.slots.map((s, i) => 
                        i === index ? { ...s, capacity: e.target.value } : s
                      )
                      updatePackageRule('availability', { ...availability, slots: updatedSlots })
                    }}
                    className="input-field"
                    placeholder="50"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'pricing', label: 'Pricing Rules', icon: DollarSign },
    { id: 'availability', label: 'Availability', icon: Calendar },
    { id: 'discounts', label: 'Discounts', icon: Percent }
  ]

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Settings className="w-6 h-6 text-primary-600" />
        <h3 className="text-xl font-bold text-neutral-800">Rule Engine</h3>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-neutral-100 rounded-xl p-1 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-soft'
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'pricing' && (
          <>
            <BasePricing />
            <GenderPricing />
            <TimePricing />
            <EarlyBirdPricing />
          </>
        )}
        
        {activeTab === 'availability' && (
          <AvailabilityManagement />
        )}
        
        {activeTab === 'discounts' && (
          <div className="text-center py-8 text-neutral-500">
            <Percent className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
            <p>Discount management coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RuleEngine