import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Phone, Eye, EyeOff, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Checkbox } from '../components/ui/checkbox'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'
import { useAuth } from '../context/AuthContext'
import { cn } from '../lib/utils'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  })
  const navigate = useNavigate()
  const { login, register } = useAuth()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isForgotPassword) {
        // Simple mock for password reset
        await new Promise(resolve => setTimeout(resolve, 1500))
        setSuccess('If an account exists with this email, you will receive a password reset link.')
      } else if (isLogin) {
        // Login logic
        const result = await login(formData.email, formData.password)
        if (result.success) {
          setSuccess('Login successful! Redirecting...')
          setTimeout(() => navigate('/'), 1500)
        } else {
          setError(result.error || 'Login failed')
        }
      } else {
        // Registration logic
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }
        const result = await register(formData)
        if (result.success) {
          setSuccess('Account created successfully! Welcome to Set The Table!')
          setTimeout(() => navigate('/'), 2000)
        } else {
          setError(result.error || 'Registration failed')
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      rememberMe: false
    })
    setError('')
    setSuccess('')
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&h=1080&fit=crop"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-8 group">
            <div className="relative">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            {isForgotPassword
              ? 'Reset Password'
              : isLogin
                ? 'Welcome back'
                : 'Join the experience'}
          </h1>

          <p className="text-white/70 text-lg">
            {isForgotPassword
              ? 'Enter your email to receive recovery instructions'
              : isLogin
                ? 'Sign in to access your exclusive events'
                : 'Create an account to start booking'
            }
          </p>
        </div>

        {/* Form Card */}
        <Card className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8 space-y-6">
            {/* Error/Success Messages */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-200 text-sm text-center">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !isForgotPassword && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-white/90">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20 transition-all"
                        required={!isLogin && !isForgotPassword}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-white/90">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20 transition-all"
                        required={!isLogin && !isForgotPassword}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20 transition-all"
                    required
                  />
                </div>
              </div>

              {!isLogin && !isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/90">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="phone"
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20 transition-all"
                      required={!isLogin && !isForgotPassword}
                    />
                  </div>
                </div>
              )}

              {/* Password Fields - Hidden in Forgot Password Mode */}
              {!isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20 transition-all"
                      required={!isForgotPassword}
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
              )}

              {!isLogin && !isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:bg-white/10 focus:border-white/20 transition-all"
                      required={!isLogin && !isForgotPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && !isForgotPassword && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                      className="border-white/30 data-[state=checked]:bg-brand-purple data-[state=checked]:border-brand-purple"
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-white/80 font-normal">Remember me</Label>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true)
                      setIsLogin(false)
                      setError('')
                      setSuccess('')
                    }}
                    className="text-sm text-white hover:text-brand-purple transition-colors font-medium"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black hover:bg-white/90 font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {loading ? 'Please wait...' : (isForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            {/* Social Login */}
            {!isForgotPassword && (
              <div className="mt-6">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-white/40">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="rounded-xl h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white border-0">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="rounded-xl h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white border-0">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            )}

            {/* Toggle Logic */}
            <div className="text-center pt-2">
              <span className="text-white/60">
                {isForgotPassword
                  ? "Remember your password?"
                  : isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (isForgotPassword) {
                    setIsForgotPassword(false)
                    setIsLogin(true)
                  } else {
                    setIsLogin(!isLogin)
                  }
                  resetForm()
                }}
                className="ml-2 text-white font-bold hover:underline"
              >
                {isForgotPassword
                  ? 'Sign in'
                  : isLogin
                    ? 'Sign up'
                    : 'Sign in'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
