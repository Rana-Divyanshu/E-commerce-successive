import React, { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "react-i18next";

function Settings({ settingOptionRef, dropdownState, setDropdownState, dir }) {
  const [currLang, setCurrLang] = useState("English");
  const { i18n, t } = useTranslation();
  const nav = t("navbar");

  const langOptions = [
    { symbol: "en", language: "English", text: "English" },
    { symbol: "hi", language: "Hindi", text: "हिन्दी" },
    { symbol: "ur", language: "Urdu", text: "اردو" },
  ];

  // Toggle dropdown states
  const toggleDropdown = (dropdown) => {
    setDropdownState((prevState) => {
      // Toggle the state of the targeted dropdown
      const isCurrentlyOpen = prevState[dropdown];
      const newState = {
        ...prevState,
        // Only toggle the dropdown specified
        [dropdown]: !isCurrentlyOpen,
      };
      // Close other dropdowns if needed (optional for clarity)
      if (
        dropdown === "isSettingOptionsOpen" &&
        newState?.isSettingOptionsOpen
      ) {
        newState.isLanguageOptionsOpen = false;
      }

      return newState;
    });
  };

  const handleLanguageChange = (language, locale) => {
    setCurrLang(language);
    setDropdownState((prevState) => ({
      ...prevState,
      isLanguageOptionsOpen: false, // Close the language options dropdown
    }));
    i18n.changeLanguage(locale);
  };

  return (
    <div className="relative h-full flex items-center">
      {/* Main Dropdown Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the click event from affecting parent elements
          toggleDropdown("isSettingOptionsOpen");
        }}
        aria-expanded={dropdownState.isSettingOptionsOpen}
      >
        <IoMdSettings className="text-primaryText dark:text-white text-2xl" />
      </button>

      {/* Multi-level Dropdown Menu */}
      {dropdownState.isSettingOptionsOpen && (
        <div
          ref={settingOptionRef}
          className={`absolute w-52 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 top-8 mt-2 ${
            dir === "rtl" ? "left-10" : " right-10"
          }`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li
              className="cursor-pointer relative flex items-center justify-between py-2 px-4 hover:bg-slate-200 dark:hover:text-white"
              onClick={() => toggleDropdown("isLanguageOptionsOpen")}
            >
              <p>{nav.language}:</p> <p>{currLang}</p>
              {/* Language Options Dropdown */}
              {dropdownState.isLanguageOptionsOpen && (
                <div
                  className={`absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700  top-6  mt-1 ${
                    dir === "rtl"
                      ? "left-[calc(100%_+_4px)]"
                      : " right-[calc(100%_+_4px)]"
                  }`}
                >
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {langOptions?.map(({ symbol, language, text }) => (
                      <li
                        className="cursor-pointer flex items-center justify-between py-2 px-4 hover:bg-slate-200 dark:hover:text-white"
                        key={symbol}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click from propagating to parent
                          handleLanguageChange(language, symbol);
                        }}
                      >
                        {language} ({text})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              <p>{nav.theme}:</p> <ThemeToggle />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Settings;
