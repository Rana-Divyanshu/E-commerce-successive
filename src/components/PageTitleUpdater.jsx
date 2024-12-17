"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PageTitleUpdater = () => {
  const pathname = usePathname(); // Get the current route pathname

  useEffect(() => {
    switch (pathname) {
      case "/":
        document.title = "Home - Ecommerce";
        break;
      case "/login":
        document.title = "Login - Ecommerce";
        break;
      case "/signup":
        document.title = "SignUp - Ecommerce";
        break;
      case "/products":
        document.title = "All Products - Ecommerce";
        break;
      case "/product-details":
        document.title = "Product Details - Ecommerce";
        break;
      case "/cart":
        document.title = "Cart - Ecommerce";
        break;
      case "/order-complete":
        document.title = "Confirmation - Ecommerce";
        break;
      case "/about-us":
        document.title = "About Us - Ecommerce";
        break;
      case "/contact-us":
        document.title = "Contact - Ecommerce";
        break;
      default:
        document.title = "E-commerce Successive";
        break;
    }
  }, [pathname]); // Re-run effect when pathname changes

  return null; // This component renders nothing in the UI
};

export default PageTitleUpdater;
