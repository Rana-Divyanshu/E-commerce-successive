"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
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
  const { data: session } = useSession();

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

  const handleLogout = () => {
    if (session?.user) {
      signOut("google");
    } else if (
      localStorage.getItem("userName") &&
      localStorage.getItem("email")
    ) {
      // localStorage.removeItem("userName");
      localStorage.removeItem("email");
    } else {
      return;
    }
    setShowProfilePopover(false);
  };

  const NavLinks = () => {
    return (
      <ul className="w-full md:w-fit flex font-medium rounded-lg overflow-x-clip gap-2">
        <li className="min-h-full flex items-center text-lg">
          <Link
            href="/"
            className={`w-full md:w-fit block py-2 px-3 underline-offset-4 ${
              pathname === "/"
                ? "text-primaryText dark:text-white underline "
                : "text-secText dark:text-gray-400 hover:underline"
            }`}
          >
            {nav?.home}
          </Link>
        </li>
        <li className="min-h-full flex items-center text-lg">
          <Link
            href="/products"
            className={`w-full md:w-fit block py-2 px-3 underline-offset-4 ${
              pathname.includes("products")
                ? "text-primaryText dark:text-white underline "
                : "text-secText dark:text-gray-400 hover:underline"
            }`}
          >
            {nav?.products}
          </Link>
        </li>
        <li className="min-h-full flex items-center text-lg">
          <Link
            href="/about-us"
            className={`w-full md:w-fit block py-2 px-3 underline-offset-4 ${
              pathname === "/about-us"
                ? "text-primaryText dark:text-white underline "
                : "text-secText dark:text-gray-400 hover:underline"
            }`}
          >
            {nav?.aboutUs}
          </Link>
        </li>
        <li className="min-h-full flex items-center text-lg">
          <Link
            href="/contact-us"
            className={`w-full md:w-fit block py-2 px-3 underline-offset-4 ${
              pathname === "/contact-us"
                ? "text-primaryText dark:text-white underline "
                : "text-secText dark:text-gray-400 hover:underline"
            }`}
          >
            {nav?.contactUs}
          </Link>
        </li>
      </ul>
    );
  };

  //     "userName": "Divyanshu Rana",
  //     "email": "web.divyanshu25@gmail.com"
  const UserPopover = () => {
    return (
      <div
        id="user-popover"
        ref={userPopoverRef}
        className={`z-50 absolute top-8 w-fit min-w-52 my-4 text-base list-none bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-lg shadow dark:shadow-gray-600 border border-slate-100 dark:border-gray-600 ${
          dir === "rtl" ? "left-[40px]" : " right-9"
        }`}
      >
        {((session?.user && Object.entries(session?.user).length > 0) ||
          (localStorage.getItem("userName") &&
            localStorage.getItem("email"))) && (
          <div className="px-4 py-3">
            <p className="block text-sm text-gray-900">
              {session?.user?.name
                ? session?.user?.name
                : localStorage.getItem("userName")}
            </p>
            <p className="block text-sm text-gray-500 truncate dark:text-gray-400">
              {session?.user?.email || localStorage.getItem("email")}
            </p>
          </div>
        )}
        <ul className="py-2">
          <li>
            <div className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              {(session?.user && Object.entries(session?.user).length > 0) ||
              (localStorage.getItem("userName") &&
                localStorage.getItem("email")) ? (
                <button
                  className="inline-flex items-center gap-2"
                  onClick={() => handleLogout()}
                >
                  {signOutText?.signOut}
                  <span>
                    <PiSignOutBold />
                  </span>
                </button>
              ) : (
                <Link href="/auth/login">
                  <button className="inline-flex items-center gap-2">
                    {signOutText?.signin}
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
      className={`fixed z-50 w-full h-[70px] flex items-center justify-between py-4 shadow bg-inherit dark:shadow-white  ${
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
          langState={appData.currLang}
          setLangState={dispatch}
        />

        {/* User Profile */}
        <button
          type="button"
          className="h-10 w-10 flex items-center justify-center font-semibold bg-themeBlue dark:bg-white text-white dark:text-primaryText rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          onClick={() => setShowProfilePopover((prev) => !prev)}
          aria-expanded={showProfilePopover}
          aria-controls="user-dropdown"
        >
          {session?.user &&
          session?.user?.image &&
          session?.user?.image?.length > 0 ? (
            <Image
              src={session?.user?.image}
              alt="Profile"
              height={40}
              width={40}
              className="rounded-full"
              priority
            />
          ) : session?.user?.name ? (
            session?.user?.name?.trim()?.split(" ")?.length === 1 ? (
              session?.user?.name[0]?.toUpperCase()
            ) : (
              `${session?.user?.name
                ?.split(" ")[0][0]
                ?.toUpperCase()}${session?.user?.name
                ?.split(" ")
                ?.at(-1)[0]
                ?.toUpperCase()}`
            )
          ) : localStorage.getItem("userName") &&
            localStorage.getItem("email") ? (
            `${localStorage
              ?.getItem("userName")
              ?.split(" ")[0][0]
              ?.toUpperCase()}${localStorage
              ?.getItem("userName")
              ?.split(" ")
              ?.at(-1)[0]
              ?.toUpperCase()}`
          ) : (
            <FaUser className="dark:text-themeBlue" />
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
          <div className="ham-navlink-container flex flex-col items-start justify-start w-full h-full">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};
