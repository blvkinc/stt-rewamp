import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, MapPin, Phone, Mail, Building, CreditCard, AlertCircle, CheckCircle, ChevronRight, Check } from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Textarea } from '../../components/ui/textarea'
import { Card, CardContent } from '../../components/ui/card'

const MerchantOnboardingPage = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { registerMerchant } = useMerchant()

  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    venueName: '',
    venueType: '',
    address: '',
    city: 'Dubai',
    description: '',
    capacity: '',
    businessLicense: null,
    tradeLicense: null,
    bankName: '',
    accountNumber: '',
    iban: '',
    website: '',
    instagram: '',
    facebook: ''
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] })
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

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
        setSuccess('Application submitted successfully!')
        setTimeout(() => navigate('/merchant/dashboard'), 2000)
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const venueTypes = ['Restaurant', 'Cafe', 'Bar & Lounge', 'Hotel Restaurant', 'Beach Club', 'Rooftop Venue', 'Fine Dining', 'Casual Dining', 'Fast Casual', 'Other']

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-4xl mx-auto container-padding pt-16 pb-12 relative z-10">
        {/* Back Button */}
        <Link to="/merchant/auth" className="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Become a Partner</h1>
          <p className="text-lg text-slate-500">Join Dubai's exclusive network of premium venues</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className="flex flex-col items-center relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${step >= stepNumber
                      ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                      : 'bg-white border-slate-200 text-slate-400'
                    }`}>
                    {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
                  </div>
                  <div className={`absolute -bottom-8 text-xs font-semibold whitespace-nowrap transition-colors duration-300 ${step >= stepNumber ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                    {stepNumber === 1 ? 'Business' : stepNumber === 2 ? 'Venue' : stepNumber === 3 ? 'Docs' : 'Review'}
                  </div>
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 md:w-24 h-0.5 mx-2 transition-all duration-500 ${step > stepNumber ? 'bg-slate-900' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-2xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
          <CardContent className="p-8 md:p-12">

            {/* Messages */}
            {error && (
              <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-3 text-red-600">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center space-x-3 text-green-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Business Information */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-slate-900">Business Details</h2>
                    <p className="text-slate-500 mt-1">Tell us about your company</p>
                  </div>

                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label>Business Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input name="businessName" value={formData.businessName} onChange={handleInputChange} className="pl-10 h-12" placeholder="e.g. Acme Hospitality Group" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} className="pl-10 h-12" placeholder="admin@company.com" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <Input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="pl-10 h-12" placeholder="+971 50 000 0000" required />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" name="password" value={formData.password} onChange={handleInputChange} className="h-12" placeholder="Create a password" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Confirm Password</Label>
                        <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="h-12" placeholder="Confirm password" required />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Venue Details */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-slate-900">Venue Information</h2>
                    <p className="text-slate-500 mt-1">Details about your location</p>
                  </div>

                  <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Venue Name</Label>
                        <Input name="venueName" value={formData.venueName} onChange={handleInputChange} className="h-12" placeholder="e.g. The Rooftop Lounge" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Venue Type</Label>
                        <select name="venueType" value={formData.venueType} onChange={handleInputChange} required className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option value="">Select type</option>
                          {venueTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                        <Textarea name="address" value={formData.address} onChange={handleInputChange} className="pl-10 min-h-[80px]" placeholder="Full address" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input name="city" value={formData.city} onChange={handleInputChange} className="h-12" placeholder="Dubai" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Guest Capacity</Label>
                        <Input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} className="h-12" placeholder="Max guests" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea name="description" value={formData.description} onChange={handleInputChange} className="min-h-[120px]" placeholder="Tell us what makes your venue special..." required />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Docs */}
              {step === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-slate-900">Verification & Banking</h2>
                    <p className="text-slate-500 mt-1">Required for payouts and authenticity</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer group">
                      <Upload className="w-8 h-8 mx-auto text-slate-400 group-hover:text-blue-500 mb-3" />
                      <Label className="cursor-pointer block">
                        <span className="text-slate-900 font-semibold block mb-1">Business License</span>
                        <span className="text-slate-500 text-xs">Upload PDF/JPG</span>
                        <input type="file" name="businessLicense" onChange={handleFileChange} className="hidden" accept=".pdf,.jpg,.png" />
                      </Label>
                    </div>
                    <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer group">
                      <Upload className="w-8 h-8 mx-auto text-slate-400 group-hover:text-blue-500 mb-3" />
                      <Label className="cursor-pointer block">
                        <span className="text-slate-900 font-semibold block mb-1">Trade License</span>
                        <span className="text-slate-500 text-xs">Upload PDF/JPG</span>
                        <input type="file" name="tradeLicense" onChange={handleFileChange} className="hidden" accept=".pdf,.jpg,.png" />
                      </Label>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl space-y-4">
                    <h3 className="font-semibold text-slate-900 flex items-center"><CreditCard className="w-5 h-5 mr-2" /> Bank Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <Input name="bankName" value={formData.bankName} onChange={handleInputChange} className="bg-white h-11" placeholder="e.g. ENBD" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <Input name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} className="bg-white h-11" placeholder="XXXXXXXX" required />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label>IBAN</Label>
                        <Input name="iban" value={formData.iban} onChange={handleInputChange} className="bg-white h-11" placeholder="AE00 0000 0000 0000 000" required />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="border-b border-slate-100 pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-slate-900">Review Application</h2>
                    <p className="text-slate-500 mt-1">Please confirm your details</p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 space-y-6">
                    <div className="pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                      <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">Business</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-slate-600">Company:</span>
                        <span className="text-slate-900 font-medium text-right">{formData.businessName}</span>
                        <span className="text-slate-600">Email:</span>
                        <span className="text-slate-900 font-medium text-right">{formData.email}</span>
                        <span className="text-slate-600">Phone:</span>
                        <span className="text-slate-900 font-medium text-right">{formData.phone}</span>
                      </div>
                    </div>

                    <div className="pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                      <h4 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-3">Venue</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-slate-600">Name:</span>
                        <span className="text-slate-900 font-medium text-right">{formData.venueName}</span>
                        <span className="text-slate-600">Type:</span>
                        <span className="text-slate-900 font-medium text-right">{formData.venueType}</span>
                        <span className="text-slate-600">City:</span>
                        <span className="text-slate-900 font-medium text-right">{formData.city}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
                    <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm">Review Process</h4>
                      <p className="text-blue-700 text-sm mt-1">Your application will be reviewed by our administration team within 48 hours. You will receive an email confirmation once approved.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-8 mt-4 border-t border-slate-100">
                {step > 1 && (
                  <Button type="button" variant="ghost" onClick={handleBack} className="text-slate-500 hover:text-slate-900">
                    Back
                  </Button>
                )}

                {step < 4 ? (
                  <Button type="button" onClick={handleNext} className="ml-auto bg-slate-900 text-white hover:bg-slate-800 px-8 rounded-xl h-12 shadow-lg shadow-slate-200">
                    Next Step <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={loading} className="ml-auto bg-blue-600 text-white hover:bg-blue-500 px-8 rounded-xl h-12 shadow-lg shadow-blue-200 font-semibold">
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MerchantOnboardingPage