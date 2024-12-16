"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const WindowWidthUpdater = () => {
  const { appData, dispatch } = useContext(AppContext);

  const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : 0 // Default value for SSR
    );

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Add resize event listener
      window.addEventListener("resize", handleResize);

      // Cleanup on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return windowWidth;
  };

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth && windowWidth !== (null || undefined)) {
      dispatch({ type: "SET_WINDOW_WIDTH", payload: windowWidth });
    }
  }, [windowWidth, dispatch]);

  return null; // Don't render anything
};

export default WindowWidthUpdater;
