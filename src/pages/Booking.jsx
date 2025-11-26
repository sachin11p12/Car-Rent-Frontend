import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { BookingForm } from '@/components/booking/BookingForm';
import { carsData } from '@/data/cars';
import { ArrowLeft, Car, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const car = carsData.find(car => car.id === parseInt(id));

  const handleBookingComplete = (bookingData) => {
    console.log('Booking completed:', bookingData);
    alert('Booking completed successfully!');
    navigate('/dashboard');
  };

  // Show login required page for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>

          {/* Login Required Section */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg border p-8 shadow-sm">
              <Car className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Login Required to Book
              </h1>
              
              {car && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img 
                      src={car.image} 
                      alt={car.name}
                      className="w-20 h-15 object-cover rounded-md"
                    />
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{car.name}</h3>
                      <p className="text-sm text-gray-600">{car.type} • {car.category}</p>
                      <p className="text-lg font-bold text-blue-600">₹{car.price}/day</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-600 mb-6 text-lg">
                Please create an account or login to book this car. This ensures your booking is saved and you can access it anytime in your dashboard.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <UserPlus className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800 mb-1">New User?</h3>
                  <p className="text-green-700 text-sm">Create an account in 30 seconds</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <LogIn className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-800 mb-1">Existing User?</h3>
                  <p className="text-blue-700 text-sm">Login to access your account</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700 py-3">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </Button>
                </Link>
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full py-3">
                    <LogIn className="w-5 h-5 mr-2" />
                    Login
                  </Button>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Why create an account?</h4>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>✅ Save and manage all your bookings</li>
                  <li>✅ Quick re-booking of favorite cars</li>
                  <li>✅ Access to exclusive deals and offers</li>
                  <li>✅ Faster checkout for future bookings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Car not found error
  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Car Not Found</h2>
          <p className="text-gray-600 mb-6">The car you're trying to book doesn't exist.</p>
          <Button onClick={() => navigate('/cars')}>
            Back to Cars
          </Button>
        </div>
      </div>
    );
  }

  // Main booking page for authenticated users
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Car
          </h1>
          <p className="text-gray-600">
            Complete the booking process for your selected vehicle
          </p>
        </div>

        {/* Car Summary */}
        <div className="bg-white rounded-lg border p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <img 
              src={car.image} 
              alt={car.name}
              className="w-32 h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{car.name}</h3>
              <p className="text-gray-600 mb-2">{car.type} • {car.category}</p>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{car.price}
                  <span className="text-lg font-normal text-gray-600">/day</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <span>⭐ {car.rating}</span>
                  <span>({car.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm 
          car={car} 
          onBookingComplete={handleBookingComplete}
        />
      </div>
    </div>
  );
};

export default Booking;