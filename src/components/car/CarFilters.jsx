import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Slider 
} from '@/components/ui/slider';
import { 
  Search, 
  Filter, 
  X,
  Car
} from 'lucide-react';
import { carCategories, carTypes } from '@/data/cars';

export const CarFilters = ({ 
   filters, 
  onFiltersChange, 
  onResetFilters,
  carCount 
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleCategoryChange = (value) => {
    onFiltersChange({ ...filters, category: value });
  };

  const handleTypeChange = (value) => {
    onFiltersChange({ ...filters, type: value });
  };

  const handlePriceChange = (value) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  const handleSearchChange = (e) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const activeFiltersCount = [
    filters.search,
    filters.category !== 'all',
    filters.type !== 'all',
    filters.priceRange[0] > 0 || filters.priceRange[1] < 100
  ].filter(Boolean).length;

  return (
    <div className="bg-white rounded-lg border p-6 mb-6">
      
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </span>
          <span>▼</span>
        </Button>
      </div>

      <div className={`${isFiltersOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="text-sm font-medium mb-2 block">Search Cars</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by car name, model..."
                value={filters.search}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={filters.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {carCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="text-sm font-medium mb-2 block">Car Type</label>
            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {carTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range - Simplified for now */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Max Price: ₹{filters.priceRange[1]}
            </label>
            <Select 
              value={filters.priceRange[1].toString()} 
              onValueChange={(value) => handlePriceChange([0, parseInt(value)])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Max Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4500">₹4500</SelectItem>
                <SelectItem value="6500">₹6500</SelectItem>
                <SelectItem value="8800">₹8800</SelectItem>
                <SelectItem value="12500">₹12500</SelectItem>
                <SelectItem value="16000+">₹16000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters & Reset */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{carCount} cars found</span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Filter className="w-3 h-3" />
                {activeFiltersCount} active
              </Badge>
            )}
          </div>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="flex items-center gap-1 text-gray-500"
            >
              <X className="w-4 h-4" />
              Reset Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};