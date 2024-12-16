"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { IoMdStar } from "react-icons/io";
import { data } from "../../../utils/data";
import { AppContext } from "../../../context/AppContext";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { MdFacebook } from "react-icons/md";
import ProductsGrid from "../../../components/ProductsGrid";
import DynamicImage from "../../../components/DynamicImage";

const getRandomItems = (data, count) => {
  const shuffled = [...data].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const { appData, dispatch } = useContext(AppContext);
  const randomItems = getRandomItems(data, 4);
  const [selectedSize, setSelectedSize] = useState("XS");
  const router = useRouter();

  const sizes = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

  const getdetails = (id) => {
    const temp = data?.find((elem) => {
      return elem?.id == id;
    });
    dispatch({ type: "eachProductDetail", payload: temp });
  };

  const adding = () => {
    if (appData?.cartItems?.length !== 0) {
      const temp = appData?.cartItems?.find((elem) => {
        return elem?.id == appData?.eachProductDetail?.id;
      });
      if (temp !== undefined) {
        const another = appData?.cartItems?.map((ele) => {
          if (ele?.id == appData?.eachProductDetail?.id) {
            const inc = ele?.quantity + 1;
            return { ...ele, quantity: inc };
          } else {
            return ele;
          }
        });
        dispatch({ type: "cartItems", payload: another });
      } else {
        dispatch({
          type: "cartItems",
          payload: [
            ...appData?.cartItems,
            { ...appData?.eachProductDetail, quantity: 1 },
          ],
        });
      }
    } else {
      dispatch({
        type: "cartItems",
        payload: [
          ...appData?.cartItems,
          { ...appData?.eachProductDetail, quantity: 1 },
        ],
      });
    }
  };

  useEffect(() => {
    const id = searchParams.get("id");
    getdetails(id);
  }, []);

  return (
    <>
      <section className="product-details-card-section py-[7rem] px-[15%]">
        <div className="product-details-card shadow shadow-[#f6f4fd] p-4 flex justify-between">
          <div className="product-details-card-sl w-[45%] flex gap-4">
            <div className="product-details-card-sl-left w-[30%] flex flex-col gap-2 justify-between">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="product-details-subimg-container bg-[#ebebeb] flex items-center justify-center h-[130px] w-[135px]"
                >
                  <DynamicImage title={appData?.eachProductDetail?.title} />
                </div>
              ))}
              {/* {appData?.eachProductDetail &&
              Object?.values(appData?.eachProductDetail)?.length !== 0
                ? appData?.eachProductDetail?.secondaryImages &&
                  Object?.values(
                    appData?.eachProductDetail?.secondaryImages
                  )?.map((elem) => {
                    return (
                      <div className="product-details-subimg-container bg-[#ebebeb] flex items-center justify-center h-[130px] w-[135px]">
                        <Image
                      src={elem}
                      alt="product-img"
                      className="product-details-subimg w-full h-fit"
                    />
                      </div>
                    );
                  })
                : null} */}
            </div>
            <div className="product-details-card-sl-right bg-[#ebebeb] w-[70%] flex items-center justify-center">
              {/* {Object?.values(appData?.eachProductDetail)?.length !== 0 ? (
            <img
              src={appData?.eachProductDetail?.primaryImage}
              alt="product-img"
              className="product-details-mainimg w-full h-fit"
            />
          ) : null} */}
              <DynamicImage title={appData?.eachProductDetail?.title} />
            </div>
          </div>
          {Object?.values(appData?.eachProductDetail)?.length !== 0 ? (
            <div className="product-details-card-sr w-1/2 py-12 flex flex-col justify-center gap-4">
              <div className="product-details-title text-2xl font-semibold tracking-[1px] text-themeBlue">
                {appData?.eachProductDetail?.title}
              </div>
              <div className="product-details-description text-gray ">
                {appData?.eachProductDetail?.description}
              </div>
              <div className="product-details-price-rating-div flex gap-[1rem]">
                <div className="product-details-rating flex items-center gap-2 text-secondary font-semibold">
                  <IoMdStar className="text-[#FFC416]" />
                  <p>{appData?.eachProductDetail?.rating}</p>
                </div>
                <div className="product-details-price text-xl text-themeBlue font-semibold">
                  ₹ {appData?.eachProductDetail?.price}
                </div>
              </div>
              <div className="product-details-category text-themeBlue font-semibold flex items-center gap-2">
                <p>Tags</p>
                {appData?.eachProductDetail?.tags?.map((list) => {
                  return (
                    <li className="text-gray font-medium list-none" key={list}>
                      {list}
                    </li>
                  );
                })}
              </div>
              <div className="product-details-category text-themeBlue font-semibold flex items-center gap-2">
                <p>Category:</p>
                <span className="text-gray font-medium">
                  {appData?.eachProductDetail?.category}
                </span>
              </div>
              <div className="product-details-size text-themeBlue font-semibold flex items-center gap-2">
                <p>Size:</p>
                <ul className="size-blocks list-none flex items-center gap-4 ms-2">
                  {sizes &&
                    sizes?.map((size) => {
                      return (
                        <li
                          className={`size-block cursor-pointer outline outline-1 px-4 py-1 rounded-md ${
                            selectedSize === size
                              ? "text-themeBlue"
                              : "text-gray"
                          }`}
                          key={size}
                          onClick={() => {
                            setSelectedSize(size);
                          }}
                        >
                          {size}
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="product-details-share text-themeBlue font-semibold flex items-center gap-2">
                <p>Share:</p>
                <div className="share-icons flex items-center gap-2 text-secondary font-semibold">
                  <div className="share-icon-div h-[25px] w-[25px] flex items-center justify-center rounded-full shadow shadow-[rgba(213,213,219,0.5)] cursor-pointer">
                    <BsInstagram className="w-[85%] hover:text-themeBlue" />
                  </div>
                  <div className="share-icon-div h-[25px] w-[25px] flex items-center justify-center rounded-full shadow shadow-[rgba(213,213,219,0.5)] cursor-pointer">
                    <MdFacebook className="w-[85%] hover:text-themeBlue" />
                  </div>
                  <div className="share-icon-div h-[25px] w-[25px] flex items-center justify-center rounded-full shadow shadow-[rgba(213,213,219,0.5)] cursor-pointer">
                    <BsTwitter className="w-[85%] hover:text-themeBlue" />
                  </div>
                </div>
              </div>
              <div className="product-details-action-btn mt-6 w-full flex items-center justify-end gap-4">
                <button
                  className="w-fit px-6 py-2 border text-themeBlue bg-transparent border-themeBlue dark:text-white dark:border-white rounded-md text-sm"
                  onClick={() => adding()}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-themeBlue hover:bg-btnHover text-white w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200"
                  onClick={() => {
                    router.push("/order-complete");
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
      {Object?.values(appData?.eachProductDetail)?.length !== 0 ? (
        <section className="product-desc-section py-[7rem] px-[15%] bg-bannertBG text-white flex flex-col items-start gap-8">
          <div className="product-desc-section-head text-lg underline underline-offset-8">
            Description
          </div>
          <div className="product-desc-section-content flex flex-col items-start gap-4">
            <div className="product-desc-section-content-text text-sm text-[#e3e3e3]">
              {appData?.eachProductDetail?.description}
            </div>
          </div>
        </section>
      ) : null}
      <section className="related-products-section py-[7rem] px-[15%]">
        <ProductsGrid data={randomItems} hideCart={true} />
      </section>
    </>
  );
};

export default ProductDetails;
