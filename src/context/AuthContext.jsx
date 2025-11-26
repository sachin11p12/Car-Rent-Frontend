import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userBookings, setUserBookings] = useState([]);

  // In-memory user storage (replace with backend later)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Load user's bookings
      const storedBookings = localStorage.getItem(`bookings_${parsedUser.id}`);
      if (storedBookings) {
        setUserBookings(JSON.parse(storedBookings));
      }
    }
    setLoading(false);
  }, []);

  // Store registered users in localStorage
  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Store user bookings in localStorage when they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`bookings_${user.id}`, JSON.stringify(userBookings));
    }
  }, [userBookings, user]);

  // REAL Registration function
  const register = async (userData) => {
    try {
      // Check if user already exists
      const existingUser = registeredUsers.find(u => u.email === userData.email);
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser = {
        id: Date.now(), // Simple ID generation
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phone: userData.phone,
        password: userData.password, // In real app, hash this!
        createdAt: new Date().toISOString()
      };

      // Add to registered users
      setRegisteredUsers(prev => [...prev, newUser]);

      return { success: true, message: 'Registration successful!' };
    } catch (error) {
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  // REAL Login function
  const login = async (email, password) => {
    try {
      // Find user in registered users
      const user = registeredUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        };

        setUser(userData);
        
        // Load user's bookings
        const storedBookings = localStorage.getItem(`bookings_${user.id}`);
        if (storedBookings) {
          setUserBookings(JSON.parse(storedBookings));
        }
        
        // Store in localStorage
        localStorage.setItem('token', 'real-jwt-token-' + user.id);
        localStorage.setItem('user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        return { success: false, error: 'Invalid email or password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  // Create a new booking
  const createBooking = (bookingData) => {
    if (!user) {
      return { success: false, error: 'User not logged in' };
    }

    try {
      const newBooking = {
        id: Date.now(),
        userId: user.id,
        ...bookingData,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };

      const updatedBookings = [...userBookings, newBooking];
      setUserBookings(updatedBookings);

      return { success: true, booking: newBooking };
    } catch (error) {
      return { success: false, error: 'Failed to create booking' };
    }
  };

  // Get user's bookings
  const getUserBookings = () => {
    return userBookings.filter(booking => booking.userId === user?.id);
  };

  const logout = () => {
    setUser(null);
    setUserBookings([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    createBooking,
    getUserBookings,
    userBookings,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};