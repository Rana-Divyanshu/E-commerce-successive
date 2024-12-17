import React from "react";
import { useRouter } from "next/navigation";
import { BsCart3 } from "react-icons/bs";
import DynamicImage from "./DynamicImage";

const ProductsGrid = ({ data, addToCart, hideCart }) => {
  const router = useRouter();

  return (
    <div className="product-grid-cards grid gap-8 grid-cols-4 mt-[3rem]">
      {data?.length !== 0 ? (
        data?.map((elem) => {
          return (
            <div
              className="product-card pointer rounded-[7px] shadow-lg flex flex-col h-full relative cursor-pointer hover:scale-[1.01] ease-linear duration-200 dark:shadow dark:shadow-white"
              onClick={() =>
                router.push(`/products/product-details?id=${elem?.id}`)
              }
              key={elem?.id}
            >
              {!hideCart && (
                <button
                  className="addtocart addtocart-card pointer absolute right-[5px] top-[5px] flex items-center justify-center rounded-full shadow-lg h-[40px] w-[40px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(elem?.id);
                  }}
                >
                  <BsCart3 />
                </button>
              )}
              <div className="grid-card-img bg-[#f6f7fb] dark:bg-slate-300 flex items-center justify-center">
                <div className="h-72"></div>
                {/* <Image
                  src={elem?.primaryImage}
                  alt="product-img"
                  className="product-img"
                /> */}
                <DynamicImage title={elem?.title} />
              </div>
              <div className="grid-product-details flex flex-col items-center py-[2rem] gap-[10px] text-center">
                <div className="grid-product-title text-gray dark:text-slate-200 font-heading text-lg w-[75%]">
                  {elem?.title}
                </div>
                <div className="grid-product-price text-themeBlue dark:text-white text-base font-semibold">
                  ₹{elem?.price}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No items found</div>
      )}
    </div>
  );
};

export default ProductsGrid;
