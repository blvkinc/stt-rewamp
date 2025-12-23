import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Mail, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'
import { useMerchant } from '../../context/MerchantContext'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Card, CardContent } from '../../components/ui/card'
import { Checkbox } from '../../components/ui/checkbox'

const MerchantAuthPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { loginMerchant } = useMerchant()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const result = await loginMerchant(formData.email, formData.password)
      if (result.success) {
        setSuccess('Login successful! Redirecting to dashboard...')
        const redirectPath = formData.email === 'admin@stt.com' ? '/admin/dashboard' : '/merchant/dashboard'
        setTimeout(() => navigate(redirectPath), 1500)
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  const fillDemoCredentials = (type) => {
    if (type === 'merchant') {
      setFormData(prev => ({ ...prev, email: 'merchant@example.com', password: 'password123' }))
    } else {
      setFormData(prev => ({ ...prev, email: 'admin@stt.com', password: 'admin123' }))
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&h=1080&fit=crop"
          alt="Merchant Background"
          className="w-full h-full object-cover grayscale-[0.3]"
        />
        <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-8 group">
            <div className="relative">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Merchant Portal
          </h1>

          <p className="text-blue-100/70 text-lg">
            Manage your venue, events, and bookings
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 space-y-6">
            {/* Error/Success Messages */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-200 text-sm flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="business@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-blue-400/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-white/90">Password</Label>
                  <Link to="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-blue-400/50 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-6 rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-xl transition-all duration-300"
              >
                {loading ? 'Authenticating...' : 'Access Dashboard'}
              </Button>
            </form>

            <div className="space-y-3 pt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-white/40">Demo Access</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => fillDemoCredentials('merchant')}
                  className="text-xs border-white/10 text-blue-300 hover:bg-white/5 hover:text-blue-200"
                >
                  Merchant Demo
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fillDemoCredentials('admin')}
                  className="text-xs border-white/10 text-amber-300 hover:bg-white/5 hover:text-amber-200"
                >
                  Admin Demo
                </Button>
              </div>
            </div>

            <div className="text-center pt-2">
              <span className="text-white/60 text-sm">
                Interested in partnering with us?
              </span>
              <Link
                to="/merchant/onboarding"
                className="ml-2 text-blue-400 hover:text-blue-300 text-sm font-medium hover:underline"
              >
                Apply Now
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MerchantAuthPage