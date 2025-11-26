import { useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';

// Safe hook that won't throw error if used outside AdminProvider
export const useAdminAccess = () => {
  try {
    const context = useContext(AdminContext);
    if (!context) {
      return {
        isAdmin: false,
        admin: null,
        loading: false
      };
    }
    return context;
  } catch (error) {
    return {
      isAdmin: false,
      admin: null,
      loading: false
    };
  }
};