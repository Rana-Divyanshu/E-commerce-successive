"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import Logo from "../assets/svg/logo.svg";
import Settings from "./Settings";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

export const Navbar = ({ dir }) => {
  const { appData, dispatch } = useContext(AppContext);

  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const [settingsdropdown, setSettingsDropdown] = useState({
    isSettingOptionsOpen: false,
    isLanguageOptionsOpen: false,
  });
  const [expandedNav, setEpandedNav] = useState(false);

  const pathname = usePathname();
  const userPopoverRef = useRef(null);
  const settingOptionRef = useRef(null);

  const { t } = useTranslation();
  const nav = t("navbar.navlinks");
  const signOutText = t("navbar");

  const loginUser = () => {
    const userData = {
      id: 1,
      name: "Divyanshu Rana",
      email: "divyanshu.rana@successive.tech",
    };
    dispatch({ type: "user", payload: userData });
    setShowProfilePopover(false);
  };
  const logoutUser = () => {
    dispatch({ type: "user", payload: null });
    setShowProfilePopover(false);
  };

  const NavLinks = () => {
    return (
      <ul className="w-full md:w-fit flex flex-col font-medium rounded-lg md:space-x-8 md:flex-row">
        <li className="min-h-full flex items-center text-lg">
          <Link
            href="/"
            className={`w-full md:w-fit block py-2 px-3 ${
              pathname === "/"
                ? "text-primaryText dark:text-white underline underline-offset-4"
                : "text-secText "
            }`}
          >
            {nav.home}
          </Link>
        </li>
        <li className="min-h-full flex items-center text-lg">
          <Link
            href="/products"
            className={`w-full md:w-fit block py-2 px-3 ${
              pathname.includes("products")
                ? "text-primaryText dark:text-white underline underline-offset-4"
                : "text-secText "
            }`}
          >
            {nav.products}
          </Link>
        </li>
        {/* <li className="min-h-full flex items-center text-lg">
          <Link
            href="/cart"
            className={`w-full md:w-fit block py-2 px-3 ${
              pathname === "/cart"
                ? "text-primaryText dark:text-white underline underline-offset-4"
                : "text-secText "
            }`}
          >
            {nav.cart}
          </Link>
        </li> */}
        <li className="min-h-full flex items-center text-lg">
          <Link
            href="/about-us"
            className={`w-full md:w-fit block py-2 px-3 ${
              pathname === "/about-us"
                ? "text-primaryText dark:text-white underline underline-offset-4"
                : "text-secText "
            }`}
          >
            {nav.aboutUs}
          </Link>
        </li>
        <li className="min-h-full flex items-center text-lg">
          <Link
            href="/contact-us"
            className={`w-full md:w-fit block py-2 px-3 ${
              pathname === "/contact-us"
                ? "text-primaryText dark:text-white underline underline-offset-4"
                : "text-secText "
            }`}
          >
            {nav.contactUs}
          </Link>
        </li>
      </ul>
    );
  };

  const UserPopover = () => {
    return (
      <div
        id="user-popover"
        ref={userPopoverRef}
        className={`z-50 absolute top-8 w-fit min-w-40 my-4 text-base list-none bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600  rounded-lg shadow border border-slate-100 ${
          dir === "rtl" ? "left-[40px]" : " right-9"
        }`}
      >
        {appData?.user && (
          <div className="px-4 py-3">
            <p className="block text-sm text-gray-900 dark:text-white">
              {appData?.user?.name}
            </p>
            <p className="block text-sm text-gray-500 truncate dark:text-gray-400">
              {appData?.user?.email}{" "}
            </p>
          </div>
        )}
        <ul className="py-2">
          <li>
            <div className="block px-4 py-2 text- text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              {appData?.user ? (
                <Link href="/auth/signup">
                  <button
                    className="inline-flex items-center gap-2"
                    // onClick={() => {
                    //   logoutUser();
                    // }}
                  >
                    {signOutText.signOut}
                    <span>
                      <PiSignOutBold />
                    </span>
                  </button>
                </Link>
              ) : (
                <Link href="/auth/login">
                  <button
                    className="inline-flex items-center gap-2"
                    // onClick={() => {
                    //   loginUser();
                    // }}
                  >
                    {signOutText.signin}
                    <span>
                      <PiSignInBold />
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </li>
        </ul>
      </div>
    );
  };

  // Close user popover when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close user popover when clicking outside
      if (
        userPopoverRef.current &&
        !userPopoverRef.current.contains(event.target) &&
        !event.target.closest("button")
      ) {
        setShowProfilePopover(false);
      }

      // Close settings popover when clicking outside
      if (
        settingOptionRef.current &&
        !settingOptionRef.current.contains(event.target)
      ) {
        setSettingsDropdown((prev) => ({
          ...prev,
          isSettingOptionsOpen: false, // Close the settings options
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`fixed z-50 w-full h-[70px] flex items-center justify-between py-4 shadow  dark:shadow-white bg-white dark:bg-[#081733] ${
        appData?.windowWidth > 768 ? "px-8" : "px-4"
      }`}
    >
      {/* Logo */}
      <Link href="/" className="hover:underline">
        <Image src={Logo} alt="Logo" width={70} />
      </Link>

      {/* Navbar Links */}
      {appData?.windowWidth > 768 && <NavLinks />}

      {/* Right section (profile and theme toggle) */}
      <div className="relative flex items-center gap-4">
        {/* Menu icon show only in small screen*/}
        {appData?.windowWidth <= 768 && (
          <RxHamburgerMenu
            alt="hamburger Menu"
            className="text-primaryText dark:text-white text-2xl"
            onClick={() => setEpandedNav((prev) => !prev)}
            aria-expanded={expandedNav}
          />
        )}
        {/* cart */}
        <Link href="/cart" className="relative">
          <div className="h-10 w-10 flex items-center justify-center -mr-1">
            <BsCart3 className="text-xl text-themeBlue dark:text-white" />
            {appData && appData?.cartItems && appData?.cartItems?.length > 0 ? (
              <p className="absolute bg-themeBlue text-white dark:bg-white dark:text-themeBlue -top-2 -right-2 rounded-full h-5 w-5 flex items-center justify-center text-sm">
                {appData?.cartItems?.length}
              </p>
            ) : null}
          </div>
        </Link>

        {/* Settings */}
        <Settings
          dir={dir}
          settingOptionRef={settingOptionRef}
          dropdownState={settingsdropdown}
          setDropdownState={setSettingsDropdown}
        />

        {/* User Profile */}
        <button
          type="button"
          className="h-10 w-10 flex items-center justify-center font-semibold bg-themeBlue dark:bg-white text-white dark:text-primaryText rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          onClick={() => setShowProfilePopover((prev) => !prev)}
          aria-expanded={showProfilePopover}
          aria-controls="user-dropdown"
        >
          {appData?.user && appData?.user?.name ? (
            appData?.user?.name?.trim()?.split(" ")?.length === 1 ? (
              appData?.user?.name[0]?.toUpperCase()
            ) : (
              `${appData?.user?.name
                ?.split(" ")[0][0]
                ?.toUpperCase()}${appData?.user?.name
                ?.split(" ")
                ?.at(-1)[0]
                ?.toUpperCase()}`
            )
          ) : (
            <FaUser />
          )}
        </button>
        {/* User Profile Dropdown */}
        {showProfilePopover && <UserPopover />}
      </div>

      {/* Fullscreen menu drawer for smaller screens */}
      {expandedNav && (
        <div
          className="absolute w-full h-fit top-[70px] left-0 shadow-lg border-t bg-white p-4"
          onClick={() => setEpandedNav(false)}
        >
          <div className="flex flex-col items-start justify-start w-full h-full">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};
