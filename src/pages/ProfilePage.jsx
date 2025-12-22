import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { User, Calendar, Heart, Gift, Star, Clock, Settings, Crown, MapPin } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { useAuth } from '../context/AuthContext'
import { useBooking } from '../context/BookingContext'

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('bookings')
  const { user, isAuthenticated, updateUser } = useAuth()
  const { bookings, favorites } = useBooking()

  // Redirect to auth if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }



  const rewardHistory = [
    { id: 1, action: "Booking Completed", points: 55, date: "2024-11-28" },
    { id: 2, action: "Friend Referral", points: 100, date: "2024-11-20" },
    { id: 3, action: "Booking Completed", points: 30, date: "2024-11-15" },
    { id: 4, action: "Account Upgrade", points: 200, date: "2024-11-01" }
  ]

  const tabs = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-12">
        {/* Profile Header - Airbnb Style */}
        <Card className="mb-8 border-0 shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
                </div>
                {user.accountType === "Premium" && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div>
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">{user.name}</h1>
                    <p className="text-gray-600 text-lg mb-1">{user.email}</p>
                    <p className="text-gray-500">Member since {user.memberSince}</p>
                  </div>
                  
                  <div className="mt-6 md:mt-0">
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold">
                        {user.accountType} Member
                      </Badge>
                      {user.accountType === "Premium" && (
                        <div className="text-sm text-gray-500">
                          {user.pointsToNextTier} points to {user.nextRewardTier}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats - Airbnb Style */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-semibold text-rose-600 mb-1">{user.rewardPoints}</div>
                <div className="text-gray-600 font-medium">Reward Points</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-semibold text-orange-600 mb-1">{user.totalBookings}</div>
                <div className="text-gray-600 font-medium">Total Bookings</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-semibold text-rose-600 mb-1">{user.favoriteVenues}</div>
                <div className="text-gray-600 font-medium">Favorite Venues</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs - Airbnb Style */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger value="bookings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="favorites" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent">
              <Heart className="w-4 h-4 mr-2" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="rewards" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent">
              <Gift className="w-4 h-4 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">My Bookings</h2>
                <Link to="/premium">
                  <Button variant="outline">Upgrade to Premium</Button>
                </Link>
              </div>
              {bookings.map((booking) => (
                <Card key={booking.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <img
                        src={booking.image}
                        alt={booking.event}
                        className="w-full md:w-40 h-32 object-cover rounded-xl"
                      />
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{booking.event}</h3>
                            <p className="text-gray-600 font-medium mb-3">{booking.venue}</p>
                            <div className="flex items-center gap-6 text-gray-500">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-rose-400" />
                                <span className="text-sm">{booking.date}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-rose-400" />
                                <span className="text-sm">{booking.time}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right mt-6 md:mt-0">
                            <div className="text-2xl font-semibold text-rose-600 mb-2">AED {booking.price}</div>
                            <Badge className={`${
                              booking.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-700 hover:bg-green-100'
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            }`}>
                              {booking.status}
                            </Badge>
                            {booking.status === 'Completed' && (
                              <div className="mt-3">
                                <Link
                                  to={`/review/${booking.id}`}
                                  className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium transition-colors text-sm"
                                >
                                  <Star className="w-4 h-4" />
                                  <span>Leave Review</span>
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Favorite Venues</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favorites.map((favorite) => (
                  <Card key={favorite.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={favorite.image}
                          alt={favorite.name}
                          className="w-20 h-20 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{favorite.name}</h3>
                          <p className="text-gray-600 text-sm">{favorite.venue}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{favorite.rating}</span>
                            </div>
                            <div className="text-rose-600 font-semibold">AED {favorite.price}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="mt-8">
            <div className="space-y-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Reward Points</h2>
                  <div className="bg-gradient-to-br from-rose-500 via-pink-600 to-orange-500 rounded-3xl p-8 text-white shadow-lg">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="text-5xl font-bold mb-2">{user.rewardPoints}</div>
                        <div className="text-rose-100 text-lg">Available Points</div>
                      </div>
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Gift className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 mb-4">
                      <div className="text-rose-100 text-sm mb-1">Progress to {user.nextRewardTier}</div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-white rounded-full h-2 transition-all duration-500"
                          style={{ width: `${((user.rewardPoints % 1000) / 1000) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-white text-sm mt-1">{user.pointsToNextTier} points to go</div>
                    </div>
                    <div className="text-rose-100">
                      Redeem points for exclusive discounts and perks
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Redemption Options */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Redeem Points</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-rose-50 to-pink-100 border-rose-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">AED 50 Discount</h4>
                          <Badge className="bg-rose-500 text-white hover:bg-rose-500">500 pts</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">Get AED 50 off your next booking</p>
                        <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                          Redeem
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-orange-50 to-pink-100 border-orange-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">AED 100 Discount</h4>
                          <Badge className="bg-orange-500 text-white hover:bg-orange-500">900 pts</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">Get AED 100 off your next booking</p>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                          Redeem
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-rose-50 to-orange-50 border-rose-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">Free Dessert</h4>
                          <Badge className="bg-rose-500 text-white hover:bg-rose-500">200 pts</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">Complimentary dessert at participating venues</p>
                        <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                          Redeem
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-orange-50 to-rose-50 border-orange-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">Priority Booking</h4>
                          <Badge className="bg-orange-500 text-white hover:bg-orange-500">300 pts</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">Skip the queue for 30 days</p>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                          Redeem
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Points History</h3>
                  <div className="space-y-4">
                    {rewardHistory.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-b-0">
                        <div>
                          <div className="font-semibold text-gray-900">{item.action}</div>
                          <div className="text-gray-500 text-sm">{item.date}</div>
                        </div>
                        <div className="text-green-600 font-semibold text-lg">+{item.points} pts</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <Input type="text" defaultValue={user.name} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <Input type="email" defaultValue={user.email} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <Input type="tel" defaultValue={user.phone} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" defaultChecked />
                        <span className="ml-2 text-gray-700">Email notifications for bookings</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" defaultChecked />
                        <span className="ml-2 text-gray-700">SMS notifications for reminders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-rose-600 focus:ring-rose-500" />
                        <span className="ml-2 text-gray-700">Marketing emails and promotions</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage
