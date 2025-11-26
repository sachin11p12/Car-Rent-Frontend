import { Button } from '@/components/ui/button';
import { Search, Shield, Zap, Star } from 'lucide-react';
import { CarGrid } from '@/components/car/CarGrid';
import { carsData } from '@/data/cars';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const totalCars = carsData.length;

  const handleBookNow = (car) => {
    console.log('Book now:', car);
    alert(`Booking ${car.name} for ₹${car.price}/day`);
  };

  const handleViewDetails = (car) => {
    console.log('View details:', car);
    window.location.href = `/cars/${car.id}`;
  };

  const handleShowMore = () => {
    // Show 3 more cars, but don't exceed total cars count
    setVisibleCount(prev => Math.min(prev + 3, totalCars));
  };

  const visibleCars = carsData.slice(0, visibleCount);
  const hasMoreCars = visibleCount < totalCars;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-blue-200">Ride Today</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover the perfect car for your journey. From economy to luxury,
              we have vehicles for every adventure at unbeatable prices.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 shadow-lg max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full px-4 py-3 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="px-4 py-3 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    className="px-4 py-3 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose CarRental?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best car rental experience with
              premium service and competitive prices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book your car in just a few clicks. Simple, fast, and
                hassle-free.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Insured</h3>
              <p className="text-gray-600">
                All rentals include comprehensive insurance coverage for your
                peace of mind.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Competitive pricing with no hidden fees. Quality service that
                fits your budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular rental cars chosen by our customers
            </p>
          </div>

          <CarGrid
            cars={visibleCars}
            onBookNow={handleBookNow}
            onViewDetails={handleViewDetails}
          />

          <div className="text-center mt-8 space-y-4">
            {/* Show More Button - only when there are more cars to show */}
            {hasMoreCars && (
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleShowMore}
              >
                Show More Cars ({totalCars - visibleCount} remaining)
              </Button>
            )}

            {/* View All Cars Button - always visible */}
            <div>
              <Link to="/cars">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View All Cars ({totalCars} total)
                </Button>
              </Link>
            </div>

            {/* Show message when all cars are displayed */}
            {!hasMoreCars && (
              <p className="text-gray-500 text-sm mt-2">
                All {totalCars} cars are now displayed
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect
            ride with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cars">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse All Cars
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};