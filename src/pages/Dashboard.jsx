import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Calendar, 
  Car, 
  Star, 
  Settings,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const Dashboard = () => {
  const { user, getUserBookings } = useAuth();
  const userBookings = getUserBookings();

  // Calculate total days for a booking
  const calculateTotalDays = (pickupDate, returnDate) => {
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    return Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate dashboard stats
  const totalBookings = userBookings.length;
  const activeBookings = userBookings.filter(b => b.status === 'active').length;
  const totalSpent = userBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              Manage your bookings, profile, and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  <nav className="space-y-1">
                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-md font-medium"
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <Settings className="w-4 h-4" />
                      Profile Settings
                    </Link>
                    <Link 
                      to="/cars" 
                      className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <Car className="w-4 h-4" />
                      Book a Car
                    </Link>
                  </nav>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Bookings</span>
                    <span className="font-semibold">{totalBookings}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Bookings</span>
                    <span className="font-semibold text-blue-600">
                      {activeBookings}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Spent</span>
                    <span className="font-semibold text-green-600">
                      ₹{totalSpent.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Welcome Card */}
              <Card className="bg-linear-to-r from-blue-600 to-indigo-700 text-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold mb-2">Ready for your next adventure?</h2>
                      <p className="text-blue-100 mb-4">
                        Discover amazing cars and start your journey today.
                      </p>
                      <Link to="/cars">
                        <Button className="bg-white text-blue-600 hover:bg-blue-50">
                          <PlusCircle className="w-4 h-4 mr-2" />
                          Book a New Car
                        </Button>
                      </Link>
                    </div>
                    <Car className="w-16 h-16 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Your Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userBookings.length > 0 ? (
                    <div className="space-y-4">
                      {userBookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={booking.car.image}
                              alt={booking.car.name}
                              className="w-20 h-14 object-cover rounded-md"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {booking.car.name}
                              </h4>
                              <p className="text-sm text-gray-600">{booking.car.type} • {booking.car.category}</p>
                              <p className="text-xs text-gray-500">
                                {booking.dates.pickupFormatted} to {booking.dates.returnFormatted} 
                                ({booking.totalDays} days)
                              </p>
                              <p className="text-xs text-gray-500">
                                Pickup: {booking.location.pickup}
                              </p>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-gray-600">
                                  {booking.car.rating} ({booking.car.reviews} reviews)
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </div>
                            <div className="font-bold text-gray-900 mt-1">
                              ₹{booking.totalAmount.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                              ₹{booking.car.price}/day
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Booked on {format(new Date(booking.bookingDate), 'MMM dd, yyyy')}
                            </div>
                            <Link to={`/cars/${booking.car.id}`}>
                              <Button variant="outline" size="sm" className="mt-2">
                                View Car
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No bookings yet
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Start your first car rental journey today!
                      </p>
                      <Link to="/cars">
                        <Button>
                          <Car className="w-4 h-4 mr-2" />
                          Browse Cars
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Booking Tips */}
              {userBookings.length === 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Getting Started
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 border rounded-lg">
                        <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm mb-1">Browse Cars</h4>
                        <p className="text-xs text-gray-600">Explore our wide selection of vehicles</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm mb-1">Choose Dates</h4>
                        <p className="text-xs text-gray-600">Select your pickup and return dates</p>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <CheckCircle2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-sm mb-1">Confirm Booking</h4>
                        <p className="text-xs text-gray-600">Complete your booking in few steps</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;