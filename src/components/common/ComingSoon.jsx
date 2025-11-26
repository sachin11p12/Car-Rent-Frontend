import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ComingSoon = ({ title, description }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">

        {/* Animated Clock Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Clock className="w-12 h-12 text-slate-600" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
        </div>

        {/* Content */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {title || 'Coming Soon'}
        </h1>
        
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          {description || 'We are working hard to bring you this feature. Stay tuned for updates!'}
        </p>

        <div className="space-y-4">
          <Button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mx-auto"
          >
            Return Home
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Development in progress...</p>
        </div>
      </div>
    </div>
  );
};