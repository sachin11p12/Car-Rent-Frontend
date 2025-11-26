import { useState, useMemo } from 'react';
import { CarGrid } from '@/components/car/CarGrid';
import { CarFilters } from '@/components/car/CarFilters';
import { SortOptions } from '@/components/car/SortOptions';
import { carsData } from '@/data/cars';
import { Button } from '@/components/ui/button';
import { RefreshCw, Car } from 'lucide-react';

export const Cars = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    type: 'all',
    priceRange: [0, 20000]
  });

  const [sortBy, setSortBy] = useState('featured');

  // Filter cars based on filters
  const filteredCars = useMemo(() => {
    let filtered = carsData.filter(car => {
      const matchesSearch = !filters.search || 
        car.name.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesCategory = filters.category === 'all' || 
        car.category.toLowerCase() === filters.category.toLowerCase();
      
      const matchesType = filters.type === 'all' || 
        car.type === filters.type;
      
      const matchesPrice = car.price >= filters.priceRange[0] && 
        car.price <= filters.priceRange[1];

      return matchesSearch && matchesCategory && matchesType && matchesPrice;
    });

    // Sort cars
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const handleBookNow = (car) => {
    console.log('Booking car:', car);
    // We'll implement booking logic later
    alert(`Booking ${car.name} for $${car.price}/day`);
  };

  const handleViewDetails = (car) => {
    console.log('Viewing details:', car);
    // We'll implement navigation to car details page later
    window.location.href = `/cars/${car.id}`;
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      type: 'all',
      priceRange: [0, 16000]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Car
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our wide selection of quality vehicles for every need and budget
          </p>
        </div>

        {/* Filters */}
        <CarFilters
          filters={filters}
          onFiltersChange={setFilters}
          onResetFilters={handleResetFilters}
          carCount={filteredCars.length}
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Available Cars
            </h2>
            <p className="text-gray-600">
              {filteredCars.length} {filteredCars.length === 1 ? 'car' : 'cars'} available for rent
            </p>
          </div>
          
          <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <CarGrid
            cars={filteredCars}
            onBookNow={handleBookNow}
            onViewDetails={handleViewDetails}
          />
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <Car className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No cars found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any cars matching your criteria. Try adjusting your filters or search terms.
            </p>
            <Button onClick={handleResetFilters} className="flex items-center gap-2 mx-auto">
              <RefreshCw className="w-4 h-4" />
              Reset All Filters
            </Button>
          </div>
        )}

        {/* Load More (for future pagination) */}
        {filteredCars.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Cars
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};