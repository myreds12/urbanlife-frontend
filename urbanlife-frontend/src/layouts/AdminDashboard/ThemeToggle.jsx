import React from "react";
import { useDarkMode } from "../../components/AdminDashboard/Utils/Context/ThemeContext";
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
       const {darkMode, setDarkMode} = useDarkMode();

       return(
<button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 items-center justify-center bg-white border border-gray-200 rounded-full h-11 w-11 transition-all"
    >
      {darkMode ? (
        <Sun className="text-gray-200 " />
      ) : (
        <Moon className="text-gray-700 " />
      )}
    </button>
       );
}

export default ThemeToggle;