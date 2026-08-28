import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Car, 
  Truck, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  ChevronDown, 
  Info, 
  Search, 
  Volume2, 
  Check,
  X
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays } from 'date-fns';

// Indian States and Union Territories
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

// Popular Indian Locations, Airports & Stations
const POPULAR_LOCATIONS = [
  { name: 'Delhi NCR (All Hubs)', type: 'Metro Area', state: 'Delhi' },
  { name: 'Indira Gandhi International Airport (DEL)', type: 'Airport', state: 'Delhi' },
  { name: 'Rajiv Chowk Metro / CP', type: 'Metro / City Center', state: 'Delhi' },
  { name: 'Noida Sector 18', type: 'Commercial Hub', state: 'Uttar Pradesh' },
  { name: 'Jewar Airport (DXN)', type: 'Airport', state: 'Uttar Pradesh' },
  { name: 'Cyber Hub Gurgaon', type: 'Tech Park', state: 'Haryana' },
  { name: 'Mumbai (All Locations)', type: 'Metro Area', state: 'Maharashtra' },
  { name: 'Chhatrapati Shivaji Maharaj Intl Airport (BOM)', type: 'Airport', state: 'Maharashtra' },
  { name: 'Bandra Kurla Complex (BKC)', type: 'Business District', state: 'Maharashtra' },
  { name: 'Pune (Viman Nagar / Airport)', type: 'City', state: 'Maharashtra' },
  { name: 'Bengaluru (All Hubs)', type: 'Metro Area', state: 'Karnataka' },
  { name: 'Kempegowda International Airport (BLR)', type: 'Airport', state: 'Karnataka' },
  { name: 'Indiranagar / Koramangala', type: 'City Center', state: 'Karnataka' },
  { name: 'Hyderabad (Hitec City / Gachibowli)', type: 'Tech Hub', state: 'Telangana' },
  { name: 'Rajiv Gandhi International Airport (HYD)', type: 'Airport', state: 'Telangana' },
  { name: 'Chennai International Airport (MAA)', type: 'Airport', state: 'Tamil Nadu' },
  { name: 'Kolkata Airport / Salt Lake', type: 'City', state: 'West Bengal' },
  { name: 'Jaipur Airport / MI Road', type: 'City', state: 'Rajasthan' },
  { name: 'Goa (Mopa & Dabolim Airport)', type: 'Tourist Hub', state: 'Goa' },
  { name: 'Ahmedabad (SVP International Airport)', type: 'City', state: 'Gujarat' },
  { name: 'Chandigarh / Mohali', type: 'City', state: 'Punjab' },
  { name: 'Kochi (Cochin International Airport)', type: 'Airport', state: 'Kerala' }
];

// Time Slot Options (30-minute intervals)
const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? '00' : '30';
  const hourStr = hours.toString().padStart(2, '0');
  return `${hourStr}:${minutes}`;
});

export const HeroSearchWidget = () => {
  const navigate = useNavigate();

  // Vehicle Type Selection
  const [vehicleType, setVehicleType] = useState('Cars'); // 'Cars' | 'Vans & Trucks'

  // Location State
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [sameReturnLocation, setSameReturnLocation] = useState(true);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showReturnDropdown, setShowReturnDropdown] = useState(false);
  const [locationError, setLocationError] = useState(false);

  // Date & Time State
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(addDays(new Date(), 3));
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnTime, setReturnTime] = useState('10:00');

  const [pickupCalendarOpen, setPickupCalendarOpen] = useState(false);
  const [returnCalendarOpen, setReturnCalendarOpen] = useState(false);

  // Bottom Row Preferences
  const [driverAge, setDriverAge] = useState('26+');
  const [selectedState, setSelectedState] = useState('Delhi');
  const [hasNegotiatedRate, setHasNegotiatedRate] = useState(false);
  const [negotiatedCode, setNegotiatedCode] = useState('');
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  const locationRef = useRef(null);
  const returnLocationRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setShowLocationDropdown(false);
      }
      if (returnLocationRef.current && !returnLocationRef.current.contains(e.target)) {
        setShowReturnDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter locations based on input
  const filteredPickupLocations = POPULAR_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(pickupLocation.toLowerCase()) ||
    loc.state.toLowerCase().includes(pickupLocation.toLowerCase())
  );

  const filteredReturnLocations = POPULAR_LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(returnLocation.toLowerCase()) ||
    loc.state.toLowerCase().includes(returnLocation.toLowerCase())
  );

  // Handle Search Submission
  const handleSearch = (e) => {
    e?.preventDefault();

    if (!pickupLocation.trim()) {
      setLocationError(true);
      return;
    }
    setLocationError(false);

    // Build URL query parameters
    const params = new URLSearchParams();
    params.set('location', pickupLocation);
    if (!sameReturnLocation && returnLocation) {
      params.set('returnLocation', returnLocation);
    }
    if (pickupDate) {
      params.set('pickupDate', format(pickupDate, 'yyyy-MM-dd'));
      params.set('pickupTime', pickupTime);
    }
    if (returnDate) {
      params.set('returnDate', format(returnDate, 'yyyy-MM-dd'));
      params.set('returnTime', returnTime);
    }
    params.set('vehicleType', vehicleType);
    params.set('age', driverAge);
    params.set('state', selectedState);
    if (hasNegotiatedRate && negotiatedCode) {
      params.set('rateCode', negotiatedCode);
    }

    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
      <div className="p-6 md:p-8 space-y-6">
        
        {/* Row 1: Vehicle Type Selector */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">
            What type of vehicle?
          </label>
          <div className="inline-flex rounded-lg border border-gray-300 p-1 bg-gray-50/80">
            <button
              type="button"
              onClick={() => setVehicleType('Cars')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                vehicleType === 'Cars'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-200/70'
              }`}
            >
              <Car className="w-5 h-5" />
              <span>Cars</span>
            </button>

            <button
              type="button"
              onClick={() => setVehicleType('Vans & Trucks')}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                vehicleType === 'Vans & Trucks'
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'text-gray-700 hover:bg-gray-200/70'
              }`}
            >
              <Truck className="w-5 h-5" />
              <span>Vans & Trucks</span>
            </button>
          </div>
        </div>

        {/* Row 2: Location and Date/Time Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Pickup and Return Location Box */}
          <div className={`${sameReturnLocation ? 'lg:col-span-6' : 'lg:col-span-12'} transition-all`}>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-bold text-gray-900">
                Pickup and return location
              </label>
              
              {/* Same Return Location Checkbox */}
              <label className="flex items-center gap-1.5 text-xs text-gray-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={sameReturnLocation}
                  onChange={(e) => setSameReturnLocation(e.target.checked)}
                  className="w-4 h-4 text-green-700 rounded border-gray-300 focus:ring-green-600 accent-green-700"
                />
                <span className="font-medium text-gray-700">Same return location</span>
              </label>
            </div>

            <div className={`grid ${sameReturnLocation ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-3`}>
              {/* Main Pickup Location Input */}
              <div className="relative" ref={locationRef}>
                <div
                  className={`flex items-center border-2 rounded-lg px-3.5 py-3 bg-white transition-colors ${
                    locationError
                      ? 'border-red-500 ring-2 ring-red-100'
                      : 'border-gray-300 hover:border-gray-400 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100'
                  }`}
                >
                  <MapPin className={`w-5 h-5 mr-2.5 shrink-0 ${locationError ? 'text-red-500' : 'text-red-600'}`} />
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => {
                      setPickupLocation(e.target.value);
                      setShowLocationDropdown(true);
                      if (locationError) setLocationError(false);
                    }}
                    onFocus={() => setShowLocationDropdown(true)}
                    placeholder="City, address, point of interest"
                    className="w-full text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                  {pickupLocation && (
                    <button
                      type="button"
                      onClick={() => setPickupLocation('')}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Validation Error Message */}
                {locationError && (
                  <p className="text-red-600 text-xs font-semibold mt-1.5 animate-in fade-in slide-in-from-top-1 duration-150">
                    Please select a station in the list
                  </p>
                )}

                {/* Autocomplete Dropdown */}
                {showLocationDropdown && (
                  <div className="absolute z-50 left-0 right-0 mt-1.5 max-h-64 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 text-sm divide-y divide-gray-100">
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                      Popular Locations in India
                    </div>
                    {filteredPickupLocations.length > 0 ? (
                      filteredPickupLocations.map((loc, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setPickupLocation(loc.name);
                            setShowLocationDropdown(false);
                            setLocationError(false);
                          }}
                          className="flex items-center justify-between px-3.5 py-2.5 hover:bg-green-50/70 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{loc.name}</p>
                              <p className="text-xs text-gray-500">{loc.type} • {loc.state}</p>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-medium">
                            {loc.state}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="px-3.5 py-3 text-sm text-gray-500 text-center">
                        No locations found for "{pickupLocation}". You can continue with this custom address.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Different Return Location Input (If Unchecked) */}
              {!sameReturnLocation && (
                <div className="relative" ref={returnLocationRef}>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg px-3.5 py-3 bg-white hover:border-gray-400 focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
                    <MapPin className="w-5 h-5 text-gray-500 mr-2.5 shrink-0" />
                    <input
                      type="text"
                      value={returnLocation}
                      onChange={(e) => {
                        setReturnLocation(e.target.value);
                        setShowReturnDropdown(true);
                      }}
                      onFocus={() => setShowReturnDropdown(true)}
                      placeholder="Different return city or airport"
                      className="w-full text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                    />
                    {returnLocation && (
                      <button
                        type="button"
                        onClick={() => setReturnLocation('')}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Return Location Dropdown */}
                  {showReturnDropdown && (
                    <div className="absolute z-50 left-0 right-0 mt-1.5 max-h-64 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 text-sm divide-y divide-gray-100">
                      <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50">
                        Select Return Hub
                      </div>
                      {filteredReturnLocations.map((loc, idx) => (
                        <div
                          key={idx}
                          onClick={() => {
                            setReturnLocation(loc.name);
                            setShowReturnDropdown(false);
                          }}
                          className="flex items-center justify-between px-3.5 py-2.5 hover:bg-green-50/70 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{loc.name}</p>
                              <p className="text-xs text-gray-500">{loc.type} • {loc.state}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Pickup Date and Time Box */}
          <div className={`${sameReturnLocation ? 'lg:col-span-3' : 'lg:col-span-6'}`}>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Pickup date and time
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg bg-white overflow-hidden focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
              
              {/* Date Part with Popover */}
              <Popover open={pickupCalendarOpen} onOpenChange={setPickupCalendarOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex-1 flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 text-left border-r border-gray-200 transition-colors"
                  >
                    <CalendarIcon className="w-5 h-5 text-green-700 shrink-0" />
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {pickupDate ? format(pickupDate, 'MMM d, yyyy') : 'Pickup date'}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={(date) => {
                      if (date) {
                        setPickupDate(date);
                        // If returnDate is before new pickupDate, adjust return date
                        if (returnDate && returnDate < date) {
                          setReturnDate(addDays(date, 3));
                        }
                        setPickupCalendarOpen(false);
                      }
                    }}
                    disabled={{ before: new Date() }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Time Part Dropdown */}
              <div className="relative w-28 shrink-0">
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full text-sm font-medium text-gray-900 py-3 pl-2 pr-6 bg-transparent focus:outline-none cursor-pointer appearance-none"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Return Date and Time Box */}
          <div className={`${sameReturnLocation ? 'lg:col-span-3' : 'lg:col-span-6'}`}>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Return date and time
            </label>
            <div className="flex items-center border-2 border-gray-300 rounded-lg bg-white overflow-hidden focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
              
              {/* Return Date Part with Popover */}
              <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex-1 flex items-center gap-2 px-3 py-2.5 hover:bg-gray-50 text-left border-r border-gray-200 transition-colors"
                  >
                    <CalendarIcon className="w-5 h-5 text-green-700 shrink-0" />
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {returnDate ? format(returnDate, 'MMM d, yyyy') : 'Return date'}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={(date) => {
                      if (date) {
                        setReturnDate(date);
                        setReturnCalendarOpen(false);
                      }
                    }}
                    disabled={{ before: pickupDate || new Date() }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Time Part Dropdown */}
              <div className="relative w-28 shrink-0">
                <select
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full text-sm font-medium text-gray-900 py-3 pl-2 pr-6 bg-transparent focus:outline-none cursor-pointer appearance-none"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

        {/* Row 3: Age, Indian State, Negotiated Rate, Search Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-gray-100">
          
          {/* Left Controls: Age & Indian State Dropdowns */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            
            {/* Age Selector Dropdown (18 to 100) */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">I am</span>
              <div className="relative inline-block">
                <select
                  value={driverAge}
                  onChange={(e) => setDriverAge(e.target.value)}
                  className="text-sm font-bold text-gray-900 bg-transparent pr-7 py-1 focus:outline-none cursor-pointer appearance-none hover:text-green-700 border-b border-dashed border-gray-400"
                >
                  <option value="26+">26+</option>
                  {Array.from({ length: 83 }, (_, i) => 18 + i).map((age) => (
                    <option key={age} value={age.toString()}>
                      {age} {age === 26 ? '(26+)' : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-700 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Indian State Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">I live in</span>
              <div className="relative inline-block max-w-[200px]">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="text-sm font-bold text-gray-900 bg-transparent pr-7 py-1 focus:outline-none cursor-pointer appearance-none hover:text-green-700 border-b border-dashed border-gray-400 truncate"
                >
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-700 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Action: Search CTA Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSearch}
              className="w-full sm:w-auto bg-[#FBBF24] hover:bg-[#F59E0B] text-gray-950 font-bold px-10 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Promotion Footer Banner Bar */}
      <div className="bg-[#2D3748] text-white px-6 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#E11D48] text-white font-extrabold px-2.5 py-0.5 rounded text-xs uppercase tracking-wider flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5" />
            PROMOTION
          </span>
          <span className="text-gray-200 font-medium">
            Up to 20% off across popular hubs in India
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate('/cars?discount=20')}
          className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
        >
          Book now
        </button>
      </div>

    </div>
  );
};
