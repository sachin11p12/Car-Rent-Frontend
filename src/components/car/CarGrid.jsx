import { CarCard } from './CarCard';

export const CarGrid = ({ 
  cars, 
  onBookNow, 
  onViewDetails,
  className = "" 
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onBookNow={onBookNow}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};