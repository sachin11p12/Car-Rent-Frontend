import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Star, 
  Users, 
  Gauge, 
  Fuel, 
  MapPin, 
  Shield,
  Zap,
  Calendar,
  CreditCard,
  CheckCircle
} from 'lucide-react';
import { useState } from 'react';

export const CarDetailsSection = ({ car }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDates, setSelectedDates] = useState({
    startDate: '',
    endDate: ''
  });

  const getFeatureIcon = (feature) => {
    const icons = {
      "GPS": MapPin,
      "Bluetooth": Shield,
      "Air Conditioning": Zap,
      "Leather Seats": Users,
      "Sunroof": Gauge,
      "Premium Sound": Zap,
      "Backup Camera": Shield,
      "360 Camera": Shield,
      "Autopilot": Gauge,
      "Premium Audio": Zap,
      "Panoramic Roof": Gauge,
      "Supercharging": Fuel,
      "Sport Mode": Gauge,
      "Performance Tires": Gauge,
      "4WD": Gauge,
      "Off-road Package": MapPin,
      "Removable Top": Gauge,
      "Cruise Control": Gauge
    };
    return icons[feature] || Shield;
  };

  const calculateTotal = () => {
    if (!selectedDates.startDate || !selectedDates.endDate) return 0;
    
    const start = new Date(selectedDates.startDate);
    const end = new Date(selectedDates.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    return days * car.price;
  };

  const handleBookNow = () => {
    if (!selectedDates.startDate || !selectedDates.endDate) {
      alert('Please select both start and end dates');
      return;
    }
    
    const total = calculateTotal();
    alert(`Booking confirmed!\n${car.name}\nTotal: $${total}`);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images & Details */}
        <div>
          {/* Main Image */}
          <div className="rounded-lg overflow-hidden mb-4">
            <img
              src={car.images[selectedImage]}
              alt={car.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {car.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-md overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${car.name} view ${index + 1}`}
                  className="w-full h-20 object-cover"
                />
              </button>
            ))}
          </div>

          {/* Car Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Seats</p>
                    <p className="font-semibold">{car.specs.seats} people</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Transmission</p>
                    <p className="font-semibold">{car.specs.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Fuel Type</p>
                    <p className="font-semibold">{car.specs.fuel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 text-gray-500">🛄</div>
                  <div>
                    <p className="text-sm text-gray-600">Luggage</p>
                    <p className="font-semibold">{car.specs.luggage} bags</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">
                Features & Amenities
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {car.features.map((feature, index) => {
                  const IconComponent = getFeatureIcon(feature);
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <IconComponent className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Booking Widget */}
        <div>
          <Card className="sticky top-6">
            <CardContent className="p-6">
              {/* Car Header */}
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {car.name}
                  </h1>
                  <Badge
                    variant={car.available ? "default" : "secondary"}
                    className={
                      car.available
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }
                  >
                    {car.available ? "Available" : "Not Available"}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{car.rating}</span>
                    <span className="text-gray-500">
                      ({car.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{car.location}</span>
                  </div>
                </div>

                <div className="text-3xl font-bold text-gray-900">
                  {car.price}
                  <span className="text-lg font-normal text-gray-600">
                    /day
                  </span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Pick-up Date
                  </label>
                  <input
                    type="date"
                    value={selectedDates.startDate}
                    onChange={(e) =>
                      setSelectedDates((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={selectedDates.endDate}
                    onChange={(e) =>
                      setSelectedDates((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>
                    ₹{car.price} ×{" "}
                    {selectedDates.startDate && selectedDates.endDate
                      ? Math.ceil(
                          (new Date(selectedDates.endDate) -
                            new Date(selectedDates.startDate)) /
                            (1000 * 60 * 60 * 24)
                        )
                      : 0}{" "}
                    days
                  </span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Insurance</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxes & Fees</span>
                  <span>Included</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>

              {/* Book Button */}
              <Button
                className="w-full py-3 text-lg cursor-pointer"
                onClick={() =>
                  navigate(`/booking/${car.id}`, { state: { car } })
                }
                disabled={!car.available}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Book Now
              </Button>

              {/* Trust Indicators */}
              <div className="mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 24 hours before pickup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Full insurance coverage included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span>Instant confirmation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};