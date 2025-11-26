import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">CarRental</span>
            </div>
            <p className="text-gray-600 max-w-md">
              Find the perfect car for your next adventure. Quality vehicles, unbeatable prices, 
              and exceptional service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/cars" className="hover:text-gray-900">Browse Cars</Link></li>
              <li><Link to="/how-it-works" className="hover:text-gray-900">How it Works</Link></li>
              <li><Link to="/faq" className="hover:text-gray-900">FAQ</Link></li>
              <li><Link to="/support" className="hover:text-gray-900">24/7 Support</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link to="/about" className="hover:text-gray-900">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">Contact</Link></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900">Blog</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-500">
          <p>&copy; 2024 CarRental. All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
};