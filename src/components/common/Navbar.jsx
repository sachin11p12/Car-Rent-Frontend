import { Button } from "@/components/ui/button";
import { Car, Menu, X, User, LogOut, LayoutDashboard, Shield, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAdminAccess } from "@/hooks/useAdminAccess";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { isAdmin } = useAdminAccess();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setAdminDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownOpen(!adminDropdownOpen);
  };

  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2"
            onClick={closeMobileMenu}
          >
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CarRental</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-md font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className="text-md font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cars
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-md font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
            )}
            <Link 
              to="/how-it-works" 
              className="text-md font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="text-md font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {/* Admin Panel Link - Show only if user is admin */}
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
                      <Shield className="w-4 h-4" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
                
                {/* Admin Access Dropdown for non-authenticated users */}
                <div className="relative" ref={dropdownRef}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={toggleAdminDropdown}
                  >
                    <Shield className="w-4 h-4" />
                    Admin Access
                    <ChevronDown className={`w-3 h-3 transition-transform ${adminDropdownOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  
                  {/* Dropdown Menu */}
                  {adminDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-999 animate-in fade-in-0 zoom-in-95">
                      <div className="p-2 space-y-1">
                        <Link 
                          to="/admin/login" 
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                          onClick={() => setAdminDropdownOpen(false)}
                        >
                          <Shield className="w-4 h-4" />
                          Admin Login
                        </Link>
                        <Link 
                          to="/admin/register" 
                          className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                          onClick={() => setAdminDropdownOpen(false)}
                        >
                          <Shield className="w-4 h-4" />
                          Admin Register
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4 border-t bg-white relative z-50">
            {/* ... mobile menu content remains the same ... */}
            <Link 
              to="/" 
              className="text-md font-medium text-gray-700 hover:text-gray-900 py-2 transition-colors"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              className="text-md font-medium text-gray-700 hover:text-gray-900 py-2 transition-colors"
              onClick={closeMobileMenu}
            >
              Cars
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="text-md font-medium text-gray-700 hover:text-gray-900 py-2 transition-colors"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
            )}
            
            <Link 
              to="/how-it-works" 
              className="text-md font-medium text-gray-700 hover:text-gray-900 py-2 transition-colors"
              onClick={closeMobileMenu}
            >
              How It Works
            </Link>
            <Link 
              to="/about" 
              className="text-md font-medium text-gray-700 hover:text-gray-900 py-2 transition-colors"
              onClick={closeMobileMenu}
            >
              About
            </Link>

            {/* Admin Access Section - Show for all users */}
            <div className="pt-2 border-t">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mb-2">
                Admin Access
              </div>
              {isAdmin ? (
                <Link to="/admin" onClick={closeMobileMenu}>
                  <Button variant="outline" size="sm" className="w-full justify-start flex items-center gap-2 mb-2 border-blue-200 text-blue-700">
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/admin/login" onClick={closeMobileMenu}>
                    <Button variant="ghost" size="sm" className="w-full justify-start flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4" />
                      Admin Login
                    </Button>
                  </Link>
                  <Link to="/admin/register" onClick={closeMobileMenu}>
                    <Button variant="ghost" size="sm" className="w-full justify-start flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Admin Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2 px-2 py-1 text-sm text-gray-700">
                    <User className="w-4 h-4" />
                    {user?.name}
                  </div>
                  <Link to="/dashboard" onClick={closeMobileMenu}>
                    <Button variant="ghost" size="sm" className="w-full justify-start flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={closeMobileMenu}>
                    <Button variant="ghost" size="sm" className="w-full justify-start flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="w-full justify-start flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mb-2">
                    User Access
                  </div>
                  <Link to="/login" onClick={closeMobileMenu}>
                    <Button variant="ghost" size="md" className="w-full justify-start">
                      User Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu}>
                    <Button size="md" className="w-full">
                      User Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};