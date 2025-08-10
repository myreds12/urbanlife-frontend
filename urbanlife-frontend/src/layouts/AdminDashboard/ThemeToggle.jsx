// src/layouts/AdminDashboard/ThemeToggle.jsx

import React from "react";
import { useDarkMode } from "../../components/AdminDashboard/Utils/Context/ThemeContext";

const ThemeToggle = () => {
       const {darkMode, setDarkMode} = useDarkMode();

       return(
              <button onClick={() => setDarkMode(!darkMode)} className="px-3 py-2 bg-white border border-gray-200 rounded-xl transition-all">
                     {darkMode ? "Light" : "Dark"}
              </button>
       );
}

export default ThemeToggle;