import React, { useState } from 'react'
import { Plus, Copy, Edit3, Trash2, Star, Users, DollarSign, Clock } from 'lucide-react'

const PackageTemplates = ({ onSelectTemplate, onCreateFromTemplate }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    category: '',
    basePrice: '',
    type: 'individual',
    includes: [''],
    rules: {}
  })

  // Mock package templates
  const templates = [
    {
      id: 1,
      name: "Premium Brunch Package",
      description: "Luxury brunch experience with premium beverages",
      category: "Brunch",
      basePrice: 449,
      type: "individual",
      popularity: 5,
      usageCount: 24,
      includes: [
        "Welcome champagne cocktail",
        "Access to premium buffet",
        "Premium beverages included",
        "3-hour dining experience",
        "Complimentary valet parking",
        "Priority seating with ocean view"
      ],
      rules: {
        basePricing: { basePrice: 449, currency: 'AED' },
        genderPricing: { enabled: true, ladiesPrice: 399, gentsPrice: 449 },
        earlyBird: { enabled: true, price: 349, validUntil: '2024-12-31', discountType: 'fixed' }
      }
    },
    {
      id: 2,
      name: "Business Lunch Special",
      description: "Perfect for corporate meetings and business dining",
      category: "Lunch",
      basePrice: 149,
      type: "individual",
      popularity: 4,
      usageCount: 18,
      includes: [
        "3-course set menu",
        "Coffee or tea included",
        "Free WiFi access",
        "2-hour dining experience",
        "Business-friendly atmosphere"
      ],
      rules: {
        basePricing: { basePrice: 149, currency: 'AED' },
        timePricing: {
          slots: [
            { startTime: '12:00', endTime: '14:00', price: 149, cutoffDate: '2024-12-31' },
            { startTime: '14:00', endTime: '16:00', price: 129, cutoffDate: '2024-12-31' }
          ]
        }
      }
    },
    {
      id: 3,
      name: "Couple's Romantic Dinner",
      description: "Intimate dining experience for two",
      category: "Dinner",
      basePrice: 699,
      type: "couple",
      popularity: 5,
      usageCount: 31,
      includes: [
        "Private table setup",
        "5-course tasting menu",
        "Wine pairing included",
        "Complimentary dessert",
        "Rose petals and candles",
        "Professional photography"
      ],
      rules: {
        basePricing: { basePrice: 699, currency: 'AED' },
        availability: {
          slots: [
            { date: '2024-12-31', startTime: '19:00', endTime: '22:00', capacity: 10 }
          ]
        }
      }
    },
    {
      id: 4,
      name: "Family Group Package",
      description: "Perfect for family celebrations and gatherings",
      category: "Family",
      basePrice: 199,
      type: "group",
      popularity: 4,
      usageCount: 15,
      includes: [
        "Family-style sharing menu",
        "Kids menu included",
        "Soft beverages for all",
        "Birthday cake (if applicable)",
        "Family photo session",
        "Kids entertainment area"
      ],
      rules: {
        basePricing: { basePrice: 199, currency: 'AED' },
        genderPricing: { enabled: true, ladiesPrice: 199, gentsPrice: 199, kidsPrice: 99 }
      }
    }
  ]

  const categories = ['All', 'Brunch', 'Lunch', 'Dinner', 'Family', 'Business']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTemplates = selectedCategory === 'All' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory)

  const handleCreateTemplate = () => {
    // Add new template logic here
    console.log('Creating new template:', newTemplate)
    setShowCreateModal(false)
    setNewTemplate({
      name: '',
      description: '',
      category: '',
      basePrice: '',
      type: 'individual',
      includes: [''],
      rules: {}
    })
  }

  const addIncludeItem = () => {
    setNewTemplate({
      ...newTemplate,
      includes: [...newTemplate.includes, '']
    })
  }

  const updateIncludeItem = (index, value) => {
    const updatedIncludes = newTemplate.includes.map((item, i) => 
      i === index ? value : item
    )
    setNewTemplate({ ...newTemplate, includes: updatedIncludes })
  }

  const removeIncludeItem = (index) => {
    if (newTemplate.includes.length > 1) {
      setNewTemplate({
        ...newTemplate,
        includes: newTemplate.includes.filter((_, i) => i !== index)
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800">Package Templates</h2>
          <p className="text-neutral-600">Use pre-built templates to quickly create packages</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Template</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-primary-100 text-primary-700 border border-primary-200'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-soft-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-800 mb-1">{template.name}</h3>
                <p className="text-sm text-neutral-600 mb-2">{template.description}</p>
                <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-medium">
                  {template.category}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < template.popularity 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-neutral-300'
                    }`} 
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-neutral-600">
                  <DollarSign className="w-4 h-4" />
                  <span>Base Price</span>
                </div>
                <span className="font-semibold text-primary-600">AED {template.basePrice}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-neutral-600">
                  <Users className="w-4 h-4" />
                  <span>Type</span>
                </div>
                <span className="capitalize text-neutral-800">{template.type}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-neutral-600">
                  <Copy className="w-4 h-4" />
                  <span>Used</span>
                </div>
                <span className="text-neutral-800">{template.usageCount} times</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-700 mb-2">What's Included:</h4>
              <ul className="space-y-1">
                {template.includes.slice(0, 3).map((item, index) => (
                  <li key={index} className="text-xs text-neutral-600 flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
                {template.includes.length > 3 && (
                  <li className="text-xs text-neutral-500">
                    +{template.includes.length - 3} more items
                  </li>
                )}
              </ul>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onCreateFromTemplate(template)}
                className="flex-1 btn-primary text-sm"
              >
                Use Template
              </button>
              <button className="btn-secondary p-2">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-100">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-neutral-800">Create Package Template</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-neutral-500 hover:text-neutral-700 p-2"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Template Name</label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Premium Brunch Package"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Select category</option>
                    <option value="Brunch">Brunch</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Family">Family</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                <textarea
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Brief description of the template..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Base Price (AED)</label>
                  <input
                    type="number"
                    value={newTemplate.basePrice}
                    onChange={(e) => setNewTemplate({ ...newTemplate, basePrice: e.target.value })}
                    className="input-field"
                    placeholder="299"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Package Type</label>
                  <select
                    value={newTemplate.type}
                    onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value })}
                    className="input-field"
                  >
                    <option value="individual">Individual</option>
                    <option value="couple">Couple</option>
                    <option value="group">Group</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">What's Included</label>
                <div className="space-y-2">
                  {newTemplate.includes.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateIncludeItem(index, e.target.value)}
                        className="flex-1 input-field"
                        placeholder="e.g., Welcome drink, Buffet access"
                      />
                      {newTemplate.includes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeIncludeItem(index)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addIncludeItem}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTemplate}
                  className="btn-primary"
                >
                  Create Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PackageTemplates