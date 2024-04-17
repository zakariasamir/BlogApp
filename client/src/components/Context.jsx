import React, { useState, createContext, useContext, useEffect } from "react";

// Create a context for managing dark mode and authentication state
const AppContext = createContext();

// Create a provider to wrap your entire application and provide the state
export const AppProvider = ({ children }) => {
  // Check if dark mode preference is saved in local storage, otherwise default to false
  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  // Check if login status is saved in local storage, otherwise default to false
  const savedLoginStatus = localStorage.getItem("isLoggedIn") === "true";
  const [isLoggedIn, setIsLoggedIn] = useState(savedLoginStatus);

  // Update local storage whenever dark mode state changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Update local storage whenever login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  const logout = () => {
    // Clear the saved login status and any other relevant data from local storage
    localStorage.removeItem("isLoggedIn");
    // Update the state to reflect the user being logged out
    setIsLoggedIn(false);
  };
  return (
    <AppContext.Provider
      value={{ darkMode, setDarkMode, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to consume the context
export const useAppContext = () => {
  return useContext(AppContext);
};
