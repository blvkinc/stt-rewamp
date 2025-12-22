import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, User, Heart, Menu, LogOut, Settings, Crown, X, Sparkles, MapPin } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { useAuth } from '../context/AuthContext'
import { cn } from '../lib/utils'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, logout, isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
        scrolled 
          ? "bg-white/80 backdrop-blur-2xl border-b border-gray-200/50 shadow-lg py-2" 
          : "bg-transparent py-4"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Elegant Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12",
                  scrolled 
                    ? "bg-gradient-to-br from-rose-500 to-pink-600" 
                    : "bg-white/20 backdrop-blur-sm border border-white/30"
                )}>
                  <Sparkles className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    scrolled ? "text-white" : "text-white"
                  )} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <span className={cn(
                  "font-bold text-xl transition-colors duration-300",
                  scrolled ? "text-gray-900" : "text-white"
                )}>
                  Set The Table
                </span>
                <div className={cn(
                  "text-xs -mt-1 transition-colors duration-300",
                  scrolled ? "text-gray-500" : "text-white/80"
                )}>
                  Dubai's Premier Dining
                </div>
              </div>
            </Link>

            {/* Elegant Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className={cn(
                "flex items-center space-x-1 rounded-full p-1 transition-all duration-500",
                scrolled 
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
                        ? scrolled
                          ? "bg-white text-rose-600 shadow-md"
                          : "bg-white/20 text-white shadow-lg"
                        : scrolled
                          ? "text-gray-700 hover:text-rose-600 hover:bg-white/50"
                          : "text-white/90 hover:text-white hover:bg-white/20"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-rose-500 rounded-full animate-pulse" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Minimal Search Bar - Desktop */}
            <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8">
              <div className="relative w-full group">
                <div className={cn(
                  "absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300",
                  scrolled ? "text-gray-400" : "text-white/70"
                )}>
                  <Search className="w-4 h-4 group-focus-within:scale-110 transition-transform" />
                </div>
                <Input
                  placeholder="Search experiences..."
                  className={cn(
                    "pl-12 pr-4 h-10 rounded-full border-0 transition-all duration-500 focus:scale-105",
                    scrolled 
                      ? "bg-gray-100/80 backdrop-blur-sm text-gray-900 placeholder:text-gray-500 focus:bg-white focus:shadow-lg" 
                      : "bg-white/10 backdrop-blur-md text-white placeholder:text-white/70 focus:bg-white/20 border border-white/20"
                  )}
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button - Mobile */}
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "lg:hidden rounded-full transition-all duration-300 hover:scale-110",
                  scrolled ? "hover:bg-rose-50" : "hover:bg-white/20"
                )}
              >
                <Search className={cn(
                  "w-4 h-4 transition-colors",
                  scrolled ? "text-gray-700" : "text-white"
                )} />
              </Button>

              {/* Elegant Favorites */}
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "relative rounded-full transition-all duration-300 hover:scale-110 group",
                  scrolled ? "hover:bg-rose-50" : "hover:bg-white/20"
                )}
              >
                <Heart className={cn(
                  "w-4 h-4 transition-all duration-300 group-hover:text-rose-500",
                  scrolled ? "text-gray-700" : "text-white"
                )} />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 border-2 border-white animate-bounce">
                  3
                </Badge>
              </Button>

              {/* Elegant Business Link */}
              <Link to="/merchant/auth">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(
                    "hidden sm:flex rounded-full transition-all duration-300 hover:scale-105",
                    scrolled 
                      ? "border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300" 
                      : "border-white/30 text-white hover:bg-white/20 hover:border-white/50"
                  )}
                >
                  For Businesses
                </Button>
              </Link>

              {/* Enhanced User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className={cn(
                      "flex items-center space-x-2 rounded-full transition-all duration-300 hover:scale-105",
                      scrolled ? "hover:bg-rose-50" : "hover:bg-white/20"
                    )}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-rose-400 via-pink-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-white text-sm font-medium">
                          {user?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      {user?.accountType === 'Premium' && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full border border-white">
                          <Crown className="w-2 h-2 text-white ml-0.5" />
                        </div>
                      )}
                    </div>
                    <span className={cn(
                      "hidden sm:block text-sm font-medium transition-colors",
                      scrolled ? "text-gray-900" : "text-white"
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
                          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">
                                  {user?.name?.charAt(0) || 'U'}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-lg">{user?.name || 'User'}</div>
                                <div className="text-rose-100 text-sm">{user?.email}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-3 space-y-1">
                            <Link to="/profile" onClick={() => setUserMenuOpen(false)}>
                              <Button variant="ghost" className="w-full justify-start hover:bg-rose-50 rounded-2xl h-12 transition-all duration-200">
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
                      scrolled 
                        ? "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600" 
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
                  scrolled ? "hover:bg-rose-50" : "hover:bg-white/20"
                )}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className={cn(
                  "w-4 h-4 transition-colors",
                  scrolled ? "text-gray-700" : "text-white"
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
              <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-lg">Set The Table</span>
                        <div className="text-rose-100 text-sm">Dubai's Premier Dining</div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-white hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-rose-200 w-4 h-4" />
                    <Input
                      placeholder="Search experiences..."
                      className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-rose-200 focus:bg-white/30 focus:border-white/50 rounded-2xl h-12 backdrop-blur-sm"
                    />
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
                            ? "bg-rose-50 text-rose-600 font-semibold shadow-md" 
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
                          <div className="ml-auto w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                        )}
                      </Button>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6 space-y-2">
                  <Link to="/merchant/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start h-12 rounded-2xl hover:bg-gray-50 transition-all duration-200">
                      <span className="text-xl mr-4">💼</span>
                      For Businesses
                    </Button>
                  </Link>
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
                    <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-2xl h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
    </>
  )
}

export default Navbar