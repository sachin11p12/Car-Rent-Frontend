import { Button } from "@/components/ui/button";
import { 
  User, 
  HelpCircle, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown, 
  Shield 
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
// import { useAdminAccess } from "@/hooks/useAdminAccess";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  // const { isAdmin } = useAdminAccess();
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  return (
    <header className="bg-black text-white relative z-50 border-b border-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left: Brand Green Logo Badge */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <div className="bg-[#008a00] hover:bg-[#007500] transition-colors px-4 py-2 rounded-sm flex flex-col items-center justify-center shadow-sm">
              <span className="text-white font-extrabold italic text-lg tracking-tight leading-none">
                IndieCar
              </span>
              <div className="w-full h-0.5 bg-[#FFCC00] mt-0.5 rounded-full"></div>
            </div>
          </Link>

          {/* Center / Right: Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            
            {/* How It Works */}
            <Link 
              to="/how-it-works" 
              className="text-sm font-semibold text-gray-200 hover:text-white transition-colors"
            >
              How it works
            </Link>

            {/* About */}
            <Link 
              to="/about" 
              className="text-sm font-semibold text-gray-200 hover:text-white transition-colors"
            >
              About
            </Link>

            {/* Cars Fleet Link */}
            <Link 
              to="/cars" 
              className="text-sm font-semibold text-gray-200 hover:text-white transition-colors"
            >
              Fleet
            </Link>

            {/* User Login or Profile */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-200 hover:text-white"
                >
                  <LayoutDashboard className="w-4 h-4 text-green-500" />
                  Dashboard
                </Link>

                <Link 
                  to="/profile"
                  className="flex items-center gap-1.5 text-sm font-semibold text-gray-200 hover:text-white"
                >
                  <div className="w-6 h-6 rounded-full bg-green-700 flex items-center justify-center text-xs font-bold text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span>{user?.name?.split(' ')[0]}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-semibold text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-green-400 transition-colors border-b-2 border-transparent hover:border-green-400 pb-0.5"
              >
                <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                  <User className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>Log in</span>
              </Link>
            )}

            {/* COMMENTED OUT: Signup Button
            {!isAuthenticated && (
              <Link to="/register">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-1.5 text-xs">
                  Sign Up
                </Button>
              </Link>
            )}
            */}

            {/* COMMENTED OUT: Admin Access
            <div className="relative">
              <Link to="/admin/login">
                <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs border-gray-700 text-gray-300">
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Button>
              </Link>
            </div>
            */}

            {/* Country / Region Flag & Code */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-white cursor-pointer px-2 py-1 rounded hover:bg-gray-900 transition-colors">
              <span className="text-base">🇮🇳</span>
              <span>IN</span>
            </div>

            {/* Help / Support Link */}
            <Link 
              to="/faq" 
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-200 hover:text-white transition-colors"
            >
              <HelpCircle className="w-4 h-4 stroke-[2.2]" />
              <span>Help</span>
            </Link>

            {/* Menu Toggle Indicator */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1.5 text-sm font-bold text-gray-200 hover:text-white cursor-pointer px-2 py-1 rounded hover:bg-gray-900 transition-colors"
            >
              <Menu className="w-5 h-5 stroke-[2.5]" />
              <span>Menu</span>
            </button>

          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden">
            {!isAuthenticated ? (
              <Link 
                to="/login"
                className="flex items-center gap-1 text-xs font-semibold text-white px-2.5 py-1.5 rounded border border-gray-700"
              >
                <User className="w-3.5 h-3.5" />
                <span>Log in</span>
              </Link>
            ) : (
              <Link 
                to="/dashboard"
                className="text-xs font-semibold text-green-400"
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-900 text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-Out / Dropdown Drawer Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 bg-black text-white space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <Link 
              to="/how-it-works" 
              className="block px-3 py-2 text-sm font-semibold text-gray-200 hover:text-white hover:bg-gray-900 rounded-md"
              onClick={closeMobileMenu}
            >
              How it works
            </Link>
            
            <Link 
              to="/about" 
              className="block px-3 py-2 text-sm font-semibold text-gray-200 hover:text-white hover:bg-gray-900 rounded-md"
              onClick={closeMobileMenu}
            >
              About
            </Link>

            <Link 
              to="/cars" 
              className="block px-3 py-2 text-sm font-semibold text-gray-200 hover:text-white hover:bg-gray-900 rounded-md"
              onClick={closeMobileMenu}
            >
              Browse Cars
            </Link>

            <Link 
              to="/faq" 
              className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-200 hover:text-white hover:bg-gray-900 rounded-md"
              onClick={closeMobileMenu}
            >
              <HelpCircle className="w-4 h-4" />
              Help & Support
            </Link>

            {isAuthenticated ? (
              <div className="pt-3 border-t border-gray-800 space-y-2">
                <Link 
                  to="/dashboard"
                  className="block px-3 py-2 text-sm font-semibold text-green-400 hover:bg-gray-900 rounded-md"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile"
                  className="block px-3 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-900 rounded-md"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 text-sm font-semibold text-red-400 hover:bg-gray-900 rounded-md cursor-pointer"
                >
                  Log out
                </button>
              </div>
            ) : (
              <div className="pt-3 border-t border-gray-800 space-y-2">
                <Link 
                  to="/login"
                  className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-white bg-green-700 hover:bg-green-800 rounded-md"
                  onClick={closeMobileMenu}
                >
                  <User className="w-4 h-4" />
                  Log in
                </Link>

                {/* COMMENTED OUT: Mobile Signup
                <Link 
                  to="/register"
                  className="block text-center px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
                */}

                {/* COMMENTED OUT: Mobile Admin
                <Link 
                  to="/admin/login"
                  className="block px-3 py-2 text-xs font-semibold text-gray-400"
                  onClick={closeMobileMenu}
                >
                  Admin Access
                </Link>
                */}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};