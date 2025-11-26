import { createContext, useContext, useState, useEffect } from 'react';
// export const AdminContext = createContext();
export const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allBookings, setAllBookings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [carsData, setCarsData] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    const initializeData = () => {
      // Load admin from localStorage
      const savedAdmin = localStorage.getItem('carRentalAdmin');
      if (savedAdmin) {
        setAdmin(JSON.parse(savedAdmin));
      }

      // Load sample data
      const sampleBookings = JSON.parse(localStorage.getItem('allBookings') || '[]');
      const sampleUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      const sampleCars = JSON.parse(localStorage.getItem('carsData') || '[]');
      
      setAllBookings(sampleBookings);
      setAllUsers(sampleUsers);
      setCarsData(sampleCars);
      
      setLoading(false);
    };

    initializeData();
  }, []);

  // Admin Registration
  const adminRegister = async (name, email, password, phone) => {
    try {
      // Check if admin already exists
      const existingAdmins = JSON.parse(localStorage.getItem('carRentalAdmins') || '[]');
      const adminExists = existingAdmins.find(admin => admin.email === email);
      
      if (adminExists) {
        return { success: false, error: 'Admin with this email already exists' };
      }

      // Create new admin
      const newAdmin = {
        id: Date.now(),
        name,
        email,
        phone,
        role: 'admin',
        joinDate: new Date().toISOString(),
        isActive: true
      };

      // Save admin credentials (in real app, this would be hashed)
      const adminAuth = {
        email,
        password, // In real app, hash this password
        adminId: newAdmin.id
      };

      // Update storage
      const updatedAdmins = [...existingAdmins, newAdmin];
      localStorage.setItem('carRentalAdmins', JSON.stringify(updatedAdmins));
      
      const adminAuths = JSON.parse(localStorage.getItem('carRentalAdminAuths') || '[]');
      adminAuths.push(adminAuth);
      localStorage.setItem('carRentalAdminAuths', JSON.stringify(adminAuths));

      // Set current admin
      setAdmin(newAdmin);
      localStorage.setItem('carRentalAdmin', JSON.stringify(newAdmin));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  // Admin Login
  const adminLogin = async (email, password) => {
    try {
      // Get admin auth data
      const adminAuths = JSON.parse(localStorage.getItem('carRentalAdminAuths') || '[]');
      const adminAuth = adminAuths.find(auth => auth.email === email && auth.password === password);
      
      if (!adminAuth) {
        return { success: false, error: 'Invalid admin credentials' };
      }

      // Get admin profile
      const admins = JSON.parse(localStorage.getItem('carRentalAdmins') || '[]');
      const adminProfile = admins.find(admin => admin.id === adminAuth.adminId);
      
      if (!adminProfile) {
        return { success: false, error: 'Admin profile not found' };
      }

      setAdmin(adminProfile);
      localStorage.setItem('carRentalAdmin', JSON.stringify(adminProfile));

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  // Admin Logout
  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('carRentalAdmin');
  };

  // Check if user is admin
  const isAdmin = !!admin;

  const value = {
    admin,
    isAdmin,
    loading,
    allBookings,
    allUsers,
    carsData,
    adminRegister,
    adminLogin,
    adminLogout,
    setAllBookings,
    setAllUsers,
    setCarsData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};