import React, { useState } from "react";

const LanguageToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
      >
        English (US)
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="z-50 absolute mt-2 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
          id="language-dropdown-menu"
        >
          <ul className="py-2 font-medium">
            <li>
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"></p>
            </li>
            <li>
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"></p>
            </li>
            <li>
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"></p>
            </li>
            <li>
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"></p>
            </li>
            <li>
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"></p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;
