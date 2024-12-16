/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        themeBlue: "#0D0E43",
        primaryText: "0d134e",
        secText: "#8A8FB9",
        bordercommon: "#e7e6ef",
        footerBG: "#F6F5FF",
        bannertBG: "#58586F",
        btnHover: "#8B9EC6",
        secondary: "#abbce1",
        white: "#ffffff",
        green: "#19d16f",
        bgRoute: "#f6f5ff",
        gray: "#9096b2",
      },
      screens: {
        xs: "320px", // Extra Small Mobile (Portrait)
        sm: "481px", // Small Mobile (Landscape)
        md: "601px", // Small Tablets (Portrait)
        lg: "769px", // Large Tablets (Landscape)
        xl: "1025px", // Small Desktops and Laptops
        "2xl": "1281px", // Large Desktops and High-Resolution Screens
        "3xl": "1441px", // Ultra High-Resolution Screens
        "4xl": "1981px", // Screens above 1980px
      },
    },
  },
  plugins: [],
};
