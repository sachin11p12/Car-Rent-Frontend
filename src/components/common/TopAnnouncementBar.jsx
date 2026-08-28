import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';

export const TopAnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Check localStorage if user already dismissed it
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('top_banner_dismissed');
    if (isDismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('top_banner_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white border-b border-gray-200 text-gray-900 text-xs sm:text-sm py-2 px-4 relative z-50 transition-all duration-200">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Center Promotion Text and Green Link */}
        <div className="flex-1 flex items-center justify-center gap-1.5 text-center flex-wrap">
          <span className="font-semibold text-gray-800">
            Enjoy up to 10% off your first rental
          </span>
          <Link
            to="/cars?discount=10"
            className="text-green-600 font-bold underline hover:text-green-700 transition-colors ml-1 inline-flex items-center gap-0.5"
          >
            Claim your discount
          </Link>
        </div>

        {/* Working Close (Cross) Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="text-gray-500 hover:text-gray-900 p-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer shrink-0 ml-2"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};
