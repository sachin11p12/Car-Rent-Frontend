import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    pickupDate: '',
    returnDate: ''
  });

  const updateSearchParams = (newParams) => {
    setSearchParams(prev => ({ ...prev, ...newParams }));
  };

  const clearSearchParams = () => {
    setSearchParams({
      location: '',
      pickupDate: '',
      returnDate: ''
    });
  };

  return (
    <SearchContext.Provider value={{
      searchParams,
      updateSearchParams,
      clearSearchParams
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};