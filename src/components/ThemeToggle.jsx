import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa"; // Importing sun and moon icons

const ThemeToggle = () => {
  // State to track if the theme is dark
  const [isDark, setIsDark] = useState(false);

  // Toggle theme function
  const toggleTheme = (e) => {
    setIsDark(e.target.checked);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <label className="inline-flex items-center cursor-pointer gap-2">
      {/* Sun/Moon Icon */}
      <span className="text-sm font-medium text-[#424242]">
        <FaSun className="text-xl text-yellow-500" />
      </span>

      <input
        type="checkbox"
        className="sr-only peer"
        onChange={(e) => toggleTheme(e)}
        checked={isDark}
      />

      {/* Toggle background */}
      <div className="relative w-9 h-5 bg-[#dddddd] peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0BBCEB]"></div>
      {isDark ? (
        <FaMoon className="text-xl text-gray-200" />
      ) : (
        <FaMoon className="text-xl text-primaryText" />
      )}
    </label>
  );
};

export default ThemeToggle;
