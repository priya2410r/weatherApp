import React, { createContext, useState, useContext } from "react";

// Create a Context for the City
const CityContext = createContext();

// Custom hook to access city data
export const useCity = () => useContext(CityContext);

// CityProvider component to wrap your app
export const CityProvider = ({ children }) => {
  const [city, setCity] = useState("Coimbatore"); // Default city
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <CityContext.Provider
      value={{
        city,
        setCity,
        forecast,
        setForecast,
        loading,
        setLoading,
        error,
        setError,
        isDarkTheme, setIsDarkTheme
      }}
    >
      {children}
    </CityContext.Provider>
  );
};
