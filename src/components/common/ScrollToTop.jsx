import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={scrollToTop}
    //   className='fixed bottom-0 right-0 p-1 bg-blue-700'
      className="
        fixed bottom-6 right-0 z-10000
        w-12 h-12 
        rounded-full 
        bg-blue-600 text-white
        flex items-center justify-center 
        shadow-lg
        hover:bg-blue-700
        transition-all duration-300
      "
    >
      <ChevronUp size={24} />
    </div>
  );
};
