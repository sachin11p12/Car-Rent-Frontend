import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  ArrowRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { DatePicker } from './DatePicker';
import { format } from 'date-fns';

export const BookingForm = ({ car, onBookingComplete }) => {
  const { user, createBooking } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    // Step 1: Rental Details
    pickupDate: null,
    returnDate: null,
    pickupLocation: '',
    returnLocation: '',
    
    // Step 2: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    
    // Step 3: Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const totalDays = bookingData.pickupDate && bookingData.returnDate 
    ? Math.ceil((bookingData.returnDate - bookingData.pickupDate) / (1000 * 60 * 60 * 24))
    : 0;

  const subtotal = totalDays * car.price;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare booking data for storage
    const completeBookingData = {
      car: {
        id: car.id,
        name: car.name,
        image: car.image,
        type: car.type,
        category: car.category,
        price: car.price,
        specs: car.specs,
        features: car.features,
        rating: car.rating,
        reviews: car.reviews,
        location: car.location
      },
      dates: {
        pickup: bookingData.pickupDate,
        return: bookingData.returnDate,
        pickupFormatted: bookingData.pickupDate ? format(bookingData.pickupDate, 'PPP') : '',
        returnFormatted: bookingData.returnDate ? format(bookingData.returnDate, 'PPP') : ''
      },
      location: {
        pickup: bookingData.pickupLocation,
        return: bookingData.returnLocation
      },
      userInfo: {
        firstName: bookingData.firstName,
        lastName: bookingData.lastName,
        fullName: `${bookingData.firstName} ${bookingData.lastName}`,
        email: bookingData.email,
        phone: bookingData.phone,
        address: bookingData.address
      },
      payment: {
        dailyRate: car.price,
        subtotal: subtotal,
        tax: tax,
        total: total,
        cardLastFour: bookingData.cardNumber.slice(-4)
      },
      totalDays: totalDays,
      totalAmount: total,
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };

    try {
      // Save booking to user's profile
      const result = createBooking(completeBookingData);
      
      if (result.success) {
        console.log('Booking saved:', result.booking);
        alert(`Booking confirmed for ${car.name}!\nTotal: ₹${total.toFixed(2)}\n\nYour booking has been saved to your dashboard.`);
        onBookingComplete(result.booking);
      } else {
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Rental Details', icon: User },
    { number: 2, title: 'Personal Info', icon: User },
    { number: 3, title: 'Payment', icon: CreditCard },
    { number: 4, title: 'Confirmation', icon: CheckCircle2 }
  ];

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? '/' + v.slice(2, 4) : '');
    }
    return v;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8 relative">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
              currentStep >= step.number 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'border-gray-300 text-gray-300'
            }`}>
              <step.icon className="w-6 h-6" />
            </div>
            <span className={`text-sm mt-2 ${
              currentStep >= step.number ? 'text-blue-600 font-medium' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300 -z-10">
          <div 
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Rental Details */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Rental Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pickupDate">Pick-up Date</Label>
                  <DatePicker
                    date={bookingData.pickupDate}
                    onDateChange={(date) => handleInputChange('pickupDate', date)}
                    placeholder="Select pick-up date"
                  />
                </div>
                <div>
                  <Label htmlFor="returnDate">Return Date</Label>
                  <DatePicker
                    date={bookingData.returnDate}
                    onDateChange={(date) => handleInputChange('returnDate', date)}
                    placeholder="Select return date"
                    disabled={!bookingData.pickupDate}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pickupLocation">Pick-up Location</Label>
                  <Input
                    id="pickupLocation"
                    value={bookingData.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    placeholder="Enter pick-up location"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="returnLocation">Return Location</Label>
                  <Input
                    id="returnLocation"
                    value={bookingData.returnLocation}
                    onChange={(e) => handleInputChange('returnLocation', e.target.value)}
                    placeholder="Enter return location"
                    required
                  />
                </div>
              </div>

              {/* Price Summary */}
              {totalDays > 0 && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Price Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>₹{car.price} × {totalDays} days</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (10%)</span>
                        <span>₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Personal Information */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={bookingData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={bookingData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={bookingData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your address"
                  required
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  value={bookingData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  placeholder="Enter name as shown on card"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={bookingData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={bookingData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={bookingData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="123"
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              {/* Final Price Summary */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Final Amount</h4>
                  <div className="text-2xl font-bold text-green-700 text-center">
                    ₹{total.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600 text-center mt-2">
                    {totalDays} day{totalDays !== 1 ? 's' : ''} rental
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Booking Confirmation</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-gray-600">
                  Thank you for your booking, {bookingData.firstName}! A confirmation has been sent to {bookingData.email}.
                </p>
              </div>

              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Booking Details</h4>
                  <div className="space-y-2 text-sm text-left">
                    <div className="flex justify-between">
                      <span>Car:</span>
                      <span className="font-medium">{car.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{totalDays} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pick-up:</span>
                      <span className="font-medium">
                        {bookingData.pickupDate && format(bookingData.pickupDate, 'PPP')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return:</span>
                      <span className="font-medium">
                        {bookingData.returnDate && format(bookingData.returnDate, 'PPP')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-bold text-green-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  📍 Your booking has been saved to your dashboard. You can view and manage all your bookings there.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={
                (currentStep === 1 && (!bookingData.pickupDate || !bookingData.returnDate || !bookingData.pickupLocation || !bookingData.returnLocation)) ||
                (currentStep === 2 && (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.phone)) ||
                loading
              }
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Booking'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};