import React, { createContext, useState } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(systemColorScheme || 'light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
