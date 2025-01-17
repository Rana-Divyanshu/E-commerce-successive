"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaList, FaFilter } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";
import { AppContext } from "../../context/AppContext";
import ProductsGrid from "../../components/ProductsGrid";
import ProductsList from "../../components/ProductsList";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const productT = t("products");

  const { appData, dispatch } = useContext(AppContext);
  const { windowWidth } = appData;
  const productFilterRef = useRef(null);

  const [showFilter, setShowFilter] = useState(false);

  const getgrid = () => {
    const temp = appData?.productData?.filter((elem) => {
      return elem?.tags?.includes("grid");
    });
    dispatch({ type: "productsGrid", payload: temp });
  };

  const getlist = () => {
    const temp = appData?.productData?.filter((elem) => {
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

  const filterOptions = [
    "Featured",
    "Latest",
    "Men's",
    "Women's",
    "Special Edition",
  ];

  const handleToggleFilter = (filterType) => {
    let filteredData = [];
    switch (filterType) {
      case "Featured":
        filteredData = appData?.productData?.filter((elem) =>
          elem?.tags?.includes("featured")
        );
        break;
      case "Latest":
        filteredData = appData?.productData?.filter((elem) =>
          elem?.tags?.includes("latest")
        );
        break;
      case "Men's":
        filteredData = appData?.productData?.filter(
          (elem) =>
            elem?.tags?.includes("latest") &&
            elem?.category === "Men's Clothing"
        );
        break;
      case "Women's":
        filteredData = appData?.productData?.filter(
          (elem) =>
            elem?.tags?.includes("latest") &&
            elem?.category === "Women's Clothing"
        );
        break;
      case "Special Edition":
        filteredData = appData?.productData?.filter(
          (elem) =>
            elem?.tags?.includes("latest") &&
            elem?.category === "Special Edition"
        );
        break;
      default:
        filteredData = appData?.productData || [];
    }

    // Dispatch data based on the current view (grid or list)
    if (appData?.productsView === "grid") {
      dispatch({ type: "productsGrid", payload: filteredData });
    } else if (appData?.productsView === "list") {
      dispatch({ type: "productsList", payload: filteredData });
    }
  };

  const clearFilter = () => {
    // Reset to original product data and dispatch based on view
    if (appData?.productsView === "grid") {
      getgrid();
    } else if (appData?.productsView === "list") {
      getlist();
    }
  };

  // Increment quantity
  const incre = (productId) => {
    const updatedCart = appData?.cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    const exists = appData?.cartItems.some((item) => item.id === productId);
    if (!exists) {
      const newItem = data.find((product) => product.id === productId);
      dispatch({
        type: "cartItems",
        payload: [...appData.cartItems, { ...newItem, quantity: 1 }],
      });
    } else {
      dispatch({ type: "cartItems", payload: updatedCart });
    }
  };

  // Decrement quantity
  const decre = (productId) => {
    const updatedCart = appData?.cartItems
      .map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity - 1;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      })
      .filter((item) => item !== null); // Remove items with quantity 0
    dispatch({ type: "cartItems", payload: updatedCart });
  };

  useEffect(() => {
    if (appData?.productsView === "grid") {
      getgrid();
    } else if (appData?.productsView === "list") {
      getlist();
    }
  }, [appData?.productsView, appData?.productData, appData?.currLang]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        productFilterRef.current &&
        !productFilterRef.current.contains(event.target)
      ) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productFilterRef]);

  return (
    <div className="shoplist-page py-[4rem] px-[15%]">
      <div className="filter-view-div relative w-full flex items-center justify-between">
        <p className="text-xl sm:text-3xl  2xl:text-[2.5rem] leading-tight text-themeBlue font-semibold dark:text-white">
          {appData?.productsView === "list"
            ? productT?.listView
            : appData?.productsView === "grid" && productT?.gridView}
        </p>
        <div className="view-div flex items-center gap-3 text-themeBlue">
          <p>{productT?.view}:</p>
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
          <button
            className={`border relative z-40 border-primaryText dark:border-white h-8 w-8 flex items-center justify-center rounded-md outline-none cursor-pointer text-themeBlue dark:text-white`}
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            <FaFilter />
            {showFilter && (
              <ul
                className="products-filter-popover absolute right-0 top-8 shadow bg-white w-52 cursor-default list-none"
                ref={productFilterRef}
              >
                {filterOptions &&
                  filterOptions?.length > 0 &&
                  filterOptions?.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="list-none cursor-pointer whitespace-nowrap flex items-center justify-between py-2 px-4 hover:bg-slate-100"
                        onClick={() => {
                          handleToggleFilter(item);
                        }}
                      >
                        {item}
                      </li>
                    );
                  })}
                <li
                  className="my-4 cursor-pointer list-none whitespace-nowrap bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-full px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200"
                  onClick={() => {
                    clearFilter();
                  }}
                >
                  Clear Filter
                </li>
              </ul>
            )}
          </button>
        </div>
      </div>
      {appData?.productsView === "grid" ? (
        <ProductsGrid data={appData?.productsGrid} addToCart={addToCart} />
      ) : (
        appData?.productsView === "list" && (
          <ProductsList
            data={appData?.productsList}
            addToCart={addToCart}
            windowWidth={windowWidth}
            incre={incre}
            decre={decre}
            cartItems={appData?.cartItems}
          />
        )
      )}
    </div>
  );
};

export default Home;
