"use client";
import React, { useContext, useEffect } from "react";
import { FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { data } from "../../utils/data";
import { AppContext } from "../../context/AppContext";
import ProductsGrid from "../../components/ProductsGrid";
import ProductsList from "../../components/ProductsList";

const Home = () => {
  const { appData, dispatch } = useContext(AppContext);

  const getgrid = () => {
    const temp = data?.filter((elem) => {
      return elem?.tags?.includes("grid");
    });
    dispatch({ type: "productsGrid", payload: temp });
  };

  const getlist = () => {
    const temp = data?.filter((elem) => {
      return elem?.tags?.includes("list");
    });
    dispatch({ type: "productsList", payload: temp });
  };

  const handleToggleView = (view) => {
    dispatch({ type: "productsView", payload: view });
  };

  const addToCart = (id) => {
    // Determine the source of product data based on the view type
    const checkData =
      appData?.productsView === "grid"
        ? appData?.productsGrid
        : appData?.productsView === "list"
        ? appData?.productsList
        : [];

    if (checkData) {
      // Find the product in the selected data source
      const productToAdd = checkData.find((product) => product.id === id);

      if (productToAdd) {
        if (appData?.cartItems?.length) {
          // Check if the product already exists in the cart
          const existingProduct = appData?.cartItems?.find(
            (item) => item.id === productToAdd.id
          );

          if (existingProduct) {
            // Update the quantity of the existing product
            const updatedCart = appData?.cartItems?.map((item) =>
              item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );

            dispatch({ type: "cartItems", payload: updatedCart });

            // Return the updated object
            return updatedCart.find((item) => item.id === productToAdd.id);
          } else {
            // Add the new product to the cart
            const newCartItem = { ...productToAdd, quantity: 1 };
            const updatedCart = [...appData?.cartItems, newCartItem];

            dispatch({ type: "cartItems", payload: updatedCart });

            // Return the new object
            return newCartItem;
          }
        } else {
          // Cart is empty, add the product
          const newCartItem = { ...productToAdd, quantity: 1 };
          dispatch({ type: "cartItems", payload: [newCartItem] });

          // Return the new object
          return newCartItem;
        }
      }
    }

    // If no product was found, return null or undefined
    return null;
  };

  useEffect(() => {
    if (appData?.productsView === "grid") {
      getgrid();
    } else if (appData?.productsView === "list") {
      getlist();
    }
  }, [appData?.productsView]);

  return (
    <div className="shoplist-page py-[4rem] px-[15%]">
      <div className="filter-view-div relative w-full flex items-center justify-between">
        <p className="text-3xl text-themeBlue font-semibold dark:text-white">
          Products {appData?.productsView} view
        </p>
        <div className="view-div flex items-center gap-3 text-themeBlue">
          <p>View:</p>
          <button
            className={`border-none outline-none ${
              appData?.productsView === "list"
                ? "text-themeBlue dark:text-white"
                : "text-secondary"
            }`}
            onClick={() => {
              handleToggleView("list");
            }}
          >
            <FaList className="pointer" />
          </button>
          <button
            className={`border-none outline-none ${
              appData?.productsView === "grid"
                ? "text-themeBlue dark:text-white"
                : "text-secondary"
            }`}
            onClick={() => {
              handleToggleView("grid");
            }}
          >
            <IoGrid className="pointer" />
          </button>
        </div>
      </div>
      {appData?.productsView === "grid" ? (
        <ProductsGrid data={appData?.productsGrid} addToCart={addToCart} />
      ) : (
        appData?.productsView === "list" && (
          <ProductsList data={appData?.productsList} addToCart={addToCart} />
        )
      )}
    </div>
  );
};

export default Home;
