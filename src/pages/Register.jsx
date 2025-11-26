import { RegisterForm } from '@/components/auth/RegisterForm';
import { Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CarRental</span>
          </Link>
        </div>

        {/* Register Form */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;