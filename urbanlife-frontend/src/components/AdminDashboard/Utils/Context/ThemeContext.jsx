import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme in localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      // Also check system preference
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return savedTheme || systemPreference;
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Tailwind CSS hanya mengenali class 'dark', bukan 'light'
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setLightTheme = () => setTheme("light");
  const setDarkTheme = () => setTheme("dark");

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      setLightTheme, 
      setDarkTheme,
      isDark: theme === 'dark'
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};