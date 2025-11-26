import { useAdmin } from '@/context/AdminContext';
import { AdminRoute } from '@/components/admin/AdminRoute';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const { allBookings, allUsers, admin } = useAdmin();

  // Calculate stats
  const totalCars = 26; // From your carsData
  const totalBookings = allBookings.length;
  const totalUsers = allUsers.length;
  const totalRevenue = allBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

  // Recent bookings (last 5)
  const recentBookings = allBookings.slice(-5).reverse();

  // Popular cars (mock data for now)
  const popularCars = [
    { name: 'Toyota Camry', bookings: 15 },
    { name: 'BMW X5', bookings: 12 },
    { name: 'Honda Civic', bookings: 10 },
    { name: 'Ford Mustang', bookings: 8 }
  ];

  return (
    <AdminRoute>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {admin?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Cars */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Cars</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCars}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +2 this month
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Car className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Bookings */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +12% this month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Users */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Registered Users</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <ArrowUp className="w-3 h-3 mr-1" />
                    +5 new users
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +18% growth
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Bookings</CardTitle>
              <Link to="/admin/bookings">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{booking.car.name}</p>
                        <p className="text-sm text-gray-600">{booking.userName}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(booking.dates.pickup).toLocaleDateString()} - {new Date(booking.dates.return).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{booking.totalAmount}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No bookings yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Popular Cars */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Popular Cars</CardTitle>
              <Link to="/admin/cars">
                <Button variant="outline" size="sm">
                  Manage Cars
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularCars.map((car, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{car.name}</p>
                        <p className="text-sm text-gray-600">{car.bookings} bookings</p>
                      </div>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(car.bookings / 15) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/cars">
                <Button className="w-full h-20 flex flex-col gap-2">
                  <Car className="w-6 h-6" />
                  Manage Cars
                </Button>
              </Link>
              <Link to="/admin/bookings">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Calendar className="w-6 h-6" />
                  View Bookings
                </Button>
              </Link>
              <Link to="/admin/users">
                <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                  <Users className="w-6 h-6" />
                  Manage Users
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminRoute>
  );
};

export default AdminDashboard;