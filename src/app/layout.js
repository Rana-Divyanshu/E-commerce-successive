"use client";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import i18next from "./i18n"; // Assuming your i18n setup is correct
import { appWithTranslation } from "next-i18next"; // Use appWithTranslation
import { useTranslation } from "react-i18next";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import AppContextProvider from "../context/AppContext";
import WindowWidthUpdater from "../components/WindowWidthUpdater";
import PageTitleUpdater from "../components/PageTitleUpdater";
import "./globals.css";
import "./responsive.css";
import { Toaster } from "react-hot-toast";

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

function RootLayout({ session, children }) {
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
        className={`${geistSans.variable} ${geistMono.variable} relative antialiased h-screen w-screen overflow-y-auto overflow-x-clip bg-[#ffffff] dark:bg-[#070F2B]`}
      >
        <SessionProvider session={session}>
          <AppContextProvider>
            <WindowWidthUpdater />
            <PageTitleUpdater />
            <Toaster position="top-center" reverseOrder={false} />
            {/* <main className="w-full min-h-[calc(100%_-_70px)] pt-[70px] max-w-[1920px] mx-auto text-[#000000] dark:text-[#535C91]"> */}
            <Navbar dir={dir} />
            <main className="w-full min-h-fit pt-[70px] max-w-[1920px] overflow-x-clip mx-auto text-[#000000] dark:text-[#535C91]">
              {children}
            </main>
            <Footer />
          </AppContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

export default appWithTranslation(RootLayout); // Wrap with appWithTranslation
