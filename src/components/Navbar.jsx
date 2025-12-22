import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, Heart, Menu, LogOut, Crown, X, Sparkles, Building, Mail, Phone, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { useAuth } from '../context/AuthContext'
import { cn } from '../lib/utils'
import sttLogo from '../assets/sttmainlogo.svg'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [businessPopupOpen, setBusinessPopupOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isOnWhiteBackground, setIsOnWhiteBackground] = useState(false)
  const location = useLocation()
  const { user, logout, isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check if current page has white background from start
    const whiteBackgroundPages = ['/auth', '/profile', '/premium', '/review', '/booking']
    const isWhitePage = whiteBackgroundPages.some(page => location.pathname.startsWith(page)) ||
                       location.pathname.includes('/events/') ||
                       location.pathname.includes('/venues/') ||
                       location.pathname.includes('/packages')
    setIsOnWhiteBackground(isWhitePage)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
  }

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/events', label: 'Events' },
    { href: '/venues', label: 'Venues' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled || isOnWhiteBackground
          ? "bg-white/90 backdrop-blur-2xl border-b border-gray-200/50 shadow-lg py-2" 
          : "bg-transparent py-4"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Elegant Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src={sttLogo} 
                alt="Set The Table Logo"
                className={cn(
                  "h-12 w-auto transition-all duration-500 group-hover:scale-110",
                  scrolled || isOnWhiteBackground 
                    ? "brightness-0 saturate-100" 
                    : ""
                )}
                style={scrolled || isOnWhiteBackground ? {
                  filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(246deg) brightness(104%) contrast(97%)'
                } : {}}
              />
            </Link>

            {/* Centered Desktop Navigation */}
            <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
              <div className={cn(
                "flex items-center space-x-1 rounded-full p-1 transition-all duration-500",
                scrolled || isOnWhiteBackground
                  ? "bg-gray-100/80 backdrop-blur-sm" 
                  : "bg-white/10 backdrop-blur-md border border-white/20"
              )}>
                {navigationItems.map((item, index) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105",
                      isActive(item.href) 
                        ? scrolled || isOnWhiteBackground
                          ? "bg-white text-brand-purple shadow-md"
                          : "bg-white/20 text-white shadow-lg"
                        : scrolled || isOnWhiteBackground
                          ? "text-gray-700 hover:text-brand-purple hover:bg-white/50"
                          : "text-white/90 hover:text-white hover:bg-white/20"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-purple rounded-full animate-pulse" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Elegant Favorites */}
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "relative rounded-full transition-all duration-300 hover:scale-110 group",
                  scrolled || isOnWhiteBackground ? "hover:bg-brand-red/10" : "hover:bg-white/20"
                )}
              >
                <Heart className={cn(
                  "w-4 h-4 transition-all duration-300 group-hover:text-brand-red",
                  scrolled || isOnWhiteBackground ? "text-gray-700" : "text-white"
                )} />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-brand-red hover:bg-brand-red/80 border-2 border-white animate-bounce">
                  3
                </Badge>
              </Button>

              {/* Business Popup Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setBusinessPopupOpen(true)}
                className={cn(
                  "hidden sm:flex items-center space-x-2 rounded-full transition-all duration-300 hover:scale-105",
                  scrolled || isOnWhiteBackground ? "hover:bg-brand-purple/10" : "hover:bg-white/20"
                )}
              >
                <Building className={cn(
                  "w-4 h-4 transition-colors",
                  scrolled || isOnWhiteBackground ? "text-gray-700" : "text-white"
                )} />
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled || isOnWhiteBackground ? "text-gray-700" : "text-white"
                )}>
                  Business
                </span>
              </Button>

              {/* Enhanced User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      "flex items-center space-x-2 rounded-full transition-all duration-300 hover:scale-105",
                      scrolled || isOnWhiteBackground ? "hover:bg-brand-red/10" : "hover:bg-white/20"
                    )}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-brand-purple to-brand-blue rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-white text-sm font-medium">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      {user?.accountType === 'Premium' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-full border border-white">
                          <Crown className="w-2 h-2 text-white ml-0.5" />
                        </div>
                      )}
                    </div>
                    <span className={cn(
                      "hidden sm:block text-sm font-medium transition-colors",
                      scrolled || isOnWhiteBackground ? "text-gray-900" : "text-white"
                    )}>
                      {user?.name || 'User'}
                    </span>
                  </Button>

                  {/* Elegant User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-3 animate-in slide-in-from-top-2 duration-200">
                      <Card className="w-64 shadow-2xl border-0 bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden">
                        <CardContent className="p-0">
                          {/* User Info Header */}
                          <div className="bg-gradient-to-r from-brand-purple to-brand-blue p-6 text-white">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">
                                  {user?.name?.charAt(0) || 'U'}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-lg">{user?.name || 'User'}</div>
                                <div className="text-white/80 text-sm">{user?.email}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 space-y-1">
                            <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                              <Button variant="ghost" className="w-full justify-start hover:bg-brand-purple/10 rounded-2xl h-12 transition-all duration-200">
                                <User className="w-4 h-4 mr-3" />
                                My Profile
                              </Button>
                            </Link>
                            <Link to="/premium" onClick={() => setUserMenuOpen(false)}>
                              <Button variant="ghost" className="w-full justify-start hover:bg-yellow-50 rounded-2xl h-12 transition-all duration-200">
                                <Crown className="w-4 h-4 mr-3 text-yellow-600" />
                                <span>Upgrade to Premium</span>
                                <Badge className="ml-auto bg-yellow-100 text-yellow-700 text-xs animate-pulse">New</Badge>
                              </Button>
                            </Link>
                            <div className="border-t border-gray-200 my-2" />
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-2xl h-12 transition-all duration-200"
                              onClick={handleLogout}
                            >
                              <LogOut className="w-4 h-4 mr-3" />
                              Sign Out
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/auth">
                  <Button 
                    size="sm" 
                    className={cn(
                      "rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
                      scrolled || isOnWhiteBackground
                        ? "bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/80 hover:to-brand-blue/80" 
                        : "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
                    )}
                  >
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "md:hidden rounded-full transition-all duration-300 hover:scale-110",
                  scrolled || isOnWhiteBackground ? "hover:bg-brand-red/10" : "hover:bg-white/20"
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className={cn(
                  "w-4 h-4 transition-colors",
                  scrolled || isOnWhiteBackground ? "text-gray-700" : "text-white"
                )} />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Elegant Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <Card className="fixed top-0 right-0 h-full w-80 max-w-[90vw] shadow-2xl border-0 bg-white/95 backdrop-blur-2xl rounded-l-3xl overflow-hidden animate-in slide-in-from-right duration-300">
            <CardContent className="p-0 h-full flex flex-col">
              {/* Mobile Header */}
              <div className="bg-gradient-to-br from-brand-purple via-brand-blue to-brand-red p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <img 
                      src={sttLogo} 
                      alt="Set The Table Logo"
                      className="h-10 w-auto"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 p-6">
                <div className="space-y-2 mb-8">
                  {navigationItems.map((item, index) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="animate-in slide-in-from-right duration-300"
                    >
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-base h-14 rounded-2xl transition-all duration-300 hover:scale-105",
                          isActive(item.href) 
                            ? "bg-brand-purple/10 text-brand-purple font-semibold shadow-md" 
                            : "hover:bg-gray-50"
                        )}
                      >
                        <span className="text-xl mr-4">
                          {item.href === '/' ? '🏠' : 
                           item.href === '/explore' ? '🔍' : 
                           item.href === '/events' ? '🎉' : '🏛️'}
                        </span>
                        {item.label}
                        {isActive(item.href) && (
                          <div className="ml-auto w-2 h-2 bg-brand-purple rounded-full animate-pulse" />
                        )}
                      </Button>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setBusinessPopupOpen(true)
                    }}
                    className="w-full justify-start h-12 rounded-2xl hover:bg-gray-50 transition-all duration-200"
                  >
                    <span className="text-xl mr-4">💼</span>
                    For Businesses
                  </Button>
                  <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start h-12 rounded-2xl text-red-600 hover:bg-red-50 transition-all duration-200">
                      <span className="text-xl mr-4">⚡</span>
                      Super Admin
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Mobile Footer */}
              {!isAuthenticated && (
                <div className="p-6 border-t border-gray-200 bg-gray-50/50">
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-brand-purple to-brand-blue hover:from-brand-purple/80 hover:to-brand-blue/80 rounded-2xl h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <Sparkles className="mr-3 w-5 h-5" />
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}

      {/* Business Popup Modal */}
      {businessPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setBusinessPopupOpen(false)} 
          />
          <Card className="relative w-full max-w-md mx-4 shadow-2xl border-0 bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
            <CardContent className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-br from-brand-purple via-brand-blue to-brand-red p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-xl">Partner With Us</h2>
                        <p className="text-white/80 text-sm">Grow your business</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setBusinessPopupOpen(false)}
                      className="text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <p className="text-white/80 leading-relaxed">
                    Join Dubai's premier dining platform and connect with thousands of customers looking for amazing experiences.
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Benefits */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Why Partner With Set The Table?</h3>
                  <div className="space-y-3">
                    {[
                      { icon: "📈", title: "Increase Revenue", desc: "Reach more customers and boost bookings" },
                      { icon: "🎯", title: "Targeted Marketing", desc: "Connect with your ideal audience" },
                      { icon: "📱", title: "Easy Management", desc: "Simple dashboard to manage everything" },
                      { icon: "🤝", title: "Dedicated Support", desc: "Get help when you need it" }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span className="text-2xl">{benefit.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                          <p className="text-sm text-gray-600">{benefit.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link to="/merchant/auth" onClick={() => setBusinessPopupOpen(false)}>
                    <Button 
                      className="w-full rounded-2xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-white"
                      style={{
                        background: 'linear-gradient(to right, #A76DB7, #6CB5F8)'
                      }}
                    >
                      <Building className="mr-2 w-4 h-4" />
                      Get Started Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="rounded-2xl h-10 text-sm hover:bg-gray-50"
                      onClick={() => {
                        setBusinessPopupOpen(false)
                        window.open('mailto:partners@setthetable.ae', '_blank')
                      }}
                    >
                      <Mail className="mr-2 w-4 h-4" />
                      Email Us
                    </Button>
                    <Button 
                      variant="outline" 
                      className="rounded-2xl h-10 text-sm hover:bg-gray-50"
                      onClick={() => {
                        setBusinessPopupOpen(false)
                        window.open('tel:+971501234567', '_blank')
                      }}
                    >
                      <Phone className="mr-2 w-4 h-4" />
                      Call Us
                    </Button>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Already have an account?{' '}
                    <Link 
                      to="/merchant/auth" 
                      onClick={() => setBusinessPopupOpen(false)}
                      className="text-brand-purple hover:text-brand-purple/80 font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default Navbar