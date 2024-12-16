"use client";
import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { appWithTranslation } from "next-i18next"; // Use appWithTranslation
import { useTranslation } from "react-i18next";
import AppContextProvider from "../context/AppContext";
import WindowWidthUpdater from "../components/WindowWidthUpdater";
import { SessionProvider } from "next-auth/react";
import i18next from "./i18n"; // Assuming your i18n setup is correct
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

function RootLayout({ children }) {
  const [dir, setDir] = useState("ltr");

  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n.dir();
    setDir(i18n.dir());
  }, [i18n, i18n.language]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <title>E-commerce - Home</title>
        <meta
          name="description"
          content="Welcome to the E-commerce site where you can find the best products online."
        />
        <meta
          name="keywords"
          content="e-commerce, online shopping, best products"
        />
        <meta property="og:title" content="E-commerce - Home" />
        <meta
          property="og:description"
          content="Welcome to the E-commerce site where you can find the best products online."
        />
        <meta property="og:image" content="/icon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen overflow-y-auto overflow-x-hidden bg-[#ffffff] dark:bg-[#171717]`}
      >
        <AppContextProvider>
          <SessionProvider>
            <Navbar dir={dir} />
            <main className="w-full min-h-[calc(100%_-_70px)] pt-[70px] max-w-[1920px] mx-auto">
              {children}
            </main>
            <Footer />
            <WindowWidthUpdater />
          </SessionProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}

export default appWithTranslation(RootLayout); // Wrap with appWithTranslation
