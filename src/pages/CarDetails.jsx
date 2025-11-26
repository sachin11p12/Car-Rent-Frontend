import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CarDetailsSection } from '@/components/car/CarDetailsSection';
import { carsData } from '@/data/cars';
import { ArrowLeft, Car } from 'lucide-react';

export const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carsData.find(car => car.id === parseInt(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Car Not Found</h2>
          <p className="text-gray-600 mb-6">The car you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/cars')}>
            Back to Cars
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/cars')}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cars
          </Button>
          
          <nav className="text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/cars" className="hover:text-gray-700">Cars</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{car.name}</span>
          </nav>
        </div>

        {/* Car Details */}
        <CarDetailsSection car={car} />

        {/* Similar Cars Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Cars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carsData
              .filter(similarCar => 
                similarCar.id !== car.id && 
                (similarCar.category === car.category || similarCar.type === car.type)
              )
              .slice(0, 3)
              .map(similarCar => (
                <div 
                  key={similarCar.id} 
                  className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/cars/${similarCar.id}`)}
                >
                  <img 
                    src={similarCar.image} 
                    alt={similarCar.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="font-semibold text-gray-900">{similarCar.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{similarCar.type}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">₹{similarCar.price}/day</span>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};