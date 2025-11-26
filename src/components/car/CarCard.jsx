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
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CarCard = ({ car, onBookNow, onViewDetails }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${car.id}`, { state: { car } });
  };
  const handleViewDetails = ()=> {
    navigate(`/cars/${car.id}`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Economy: "bg-green-100 text-green-800",
      Standard: "bg-blue-100 text-blue-800",
      Luxury: "bg-purple-100 text-purple-800",
      Electric: "bg-emerald-100 text-emerald-800",
      SUV: "bg-orange-100 text-orange-800",
      "Sports Car": "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

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

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md ">
      {/* Car Image and Badges */}
      <div className="relative group">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-53 object-cover transition-transform duration-3000 group-hover:scale-150"
        />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3 ">
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

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className={getCategoryColor(car.category)}>
            {car.category}
          </Badge>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{car.rating}</span>
          <span className="text-gray-300">({car.reviews})</span>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Car Name and Type */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {car.name}
          </h3>
          <p className="text-gray-600 text-sm">{car.type}</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{car.specs.seats} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="w-4 h-4" />
            <span>{car.specs.transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span>{car.specs.fuel}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🛄 {car.specs.luggage}</span>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {car.features.slice(0, 3).map((feature, index) => {
              const IconComponent = getFeatureIcon(feature);
              return (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs flex items-center gap-1"
                >
                  <IconComponent className="w-3 h-3" />
                  {feature}
                </Badge>
              );
            })}
            {car.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{car.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{car.location}</span>
        </div>

        {/* Price and Action Buttons */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{car.price}
              <span className="text-sm font-normal text-gray-600">/day</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleViewDetails}>
              Details
            </Button>
            <Button size="sm" onClick={handleBookNow} disabled={!car.available}>
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};