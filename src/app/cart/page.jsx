"use client";

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { MdDelete } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import emptyCart from "../../assets/img/empty-cart.png";
import DynamicImage from "../../components/DynamicImage";
import RazorpayCheckoutBtn from "../../components/RazorpayCheckoutBtn";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const cart = t("cart");
  const tableHead = t("cart.tableHeads");
  const pricingSec = t("cart.pricingSection");
  const empty = t("cart.empty");

  const { appData, dispatch } = useContext(AppContext);
  const [total, setTotal] = useState(0);

  const clearCart = () => {
    dispatch({ type: "cartItems", payload: [] });
  };

  const incre = (it) => {
    const another = appData?.cartItems.map((ele) => {
      if (ele.id == it) {
        const inc = ele.quantity + 1;
        return { ...ele, quantity: inc };
      } else {
        return ele;
      }
    });
    dispatch({ type: "cartItems", payload: another });
  };

  const decre = (it) => {
    const another = appData?.cartItems.map((ele) => {
      if (ele.id == it) {
        const inc = ele.quantity - 1;
        return { ...ele, quantity: inc };
      } else {
        return ele;
      }
    });
    dispatch({ type: "cartItems", payload: another });
  };

  const deleteItem = (id) => {
    const updatedCartItems = appData?.cartItems.filter(
      (item) => item.id !== id
    );
    dispatch({ type: "cartItems", payload: updatedCartItems });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (
      (session?.user && Object.entries(session?.user).length > 0) ||
      (localStorage.getItem("userName") && localStorage.getItem("email"))
    ) {
      ("If condition");
    } else {
      toast.dismiss();
      toast.error("Please login to checkout");
    }
  };

  useEffect(() => {
    let sum = 0;
    appData?.cartItems.forEach((elem) => {
      sum += elem.quantity * elem.price;
    });
    setTotal(sum);
  }, [appData?.cartItems]);

  return appData?.cartItems?.length !== 0 ? (
    <section className="cart-page py-[7rem] px-[15%]">
      <div className="cart-page-card flex items-start justify-between">
        <div className="cart-products-list-div flex flex-col items-start w-[65%]">
          <div className="cart-products-list-heads flex w-full text-themeBlue dark:text-white font-semibold pb-8">
            <div className="cart-products-list-head cart-product w-[40%]">
              {tableHead?.product}
            </div>
            <div className="cart-products-list-head cart-Price w-[20%] flex items-center justify-center gap-[3px]">
              {tableHead?.price}
            </div>
            <div className="cart-products-list-head cart-Quantity w-[20%] flex items-center justify-center gap-[3px]">
              {tableHead?.quantity}
            </div>
            <div className="cart-products-list-head cart-Total w-[20%] flex items-center justify-center gap-[3px]">
              {tableHead?.total}
            </div>
          </div>
          {appData?.cartItems.length !== 0
            ? appData?.cartItems.map((elem) => {
                return (
                  <div
                    className="cart-products-list-row flex w-full text-[#15245e] dark:text-slate-300 font-semibold border-b border-bordercommon py-[1rem]"
                    key={elem?.id}
                  >
                    <div className="cart-products-img-desc cart-product w-[40%] flex gap-[1rem] items-center">
                      <div className="cart-product-img relative">
                        <div className="product-details-subimg-container  bg-[#f5f5f5] dark:bg-slate-300 flex items-center justify-center h-[130px] w-[135px]">
                          <DynamicImage title={elem?.title} />
                        </div>
                        <button
                          className="cursor-pointer h-8 w-8 flex items-center justify-center bg-white shadow shadow-themeBlue rounded-full absolute right-[-8px] top-[-8px] text-red-700 text-xl"
                          onClick={() => {
                            deleteItem(elem?.id);
                          }}
                        >
                          <MdDelete />
                        </button>
                      </div>
                      <div className="cart-product-desc w-[65%] flex flex-col items-start justify-center gap-[5px]">
                        <div className="cart-product-desc-title text-themeBlue dark:text-white">
                          {elem.title}
                        </div>
                        <div className="cart-product-desc-size text-gray dark:text-slate-300">
                          {cart?.size}
                        </div>
                      </div>
                    </div>
                    <div className="cart-products-price cart-Price w-[20%] flex items-center justify-center dark:text-slate-300">
                      ₹ <span>{elem.price}</span> /-
                    </div>
                    <div className="cart-products-quantity cart-Quantity w-[20%] flex items-center justify-center">
                      <div className="cart-count-div flex items-center">
                        <button
                          className="cart-delete-count cart-count-btn flex items-center justify-center bg-themeBlue text-white dark:outline dark:outline-1 dark:outline-white w-6 h-6 cursor-pointer"
                          onClick={() => decre(elem.id)}
                        >
                          -
                        </button>
                        <div className="cart-count flex items-center justify-center text-gray font-medium w-8 h-full border-t border-b border-themeBlue dark:border-white">
                          {elem.quantity}
                        </div>
                        <button
                          className="cart-add-count cart-count-btn flex items-center justify-center bg-themeBlue text-white dark:outline dark:outline-1 dark:outline-white w-6 h-6 cursor-pointer"
                          onClick={() => incre(elem.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-products-total cart-Total w-[20%] flex items-center justify-center">
                      ₹ <span>{elem.quantity * elem.price}</span> /-
                    </div>
                  </div>
                );
              })
            : null}
          <div className="clear-cart-btn-div w-full flex items-center justify-end py-8 pl-14">
            <button
              className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200"
              onClick={() => clearCart()}
            >
              {cart?.clearCart}
            </button>
          </div>
        </div>
        <div className="cart-pricing-div w-[35%] flex flex-col items-center">
          <div className="cart-pricing-head text-themeBlue font-semibold pb-8">
            {pricingSec?.carTotals}
          </div>
          <div className="cart-total-card bg-bgRoute w-[85%] p-[1rem] flex flex-col items-start gap-[2rem]">
            <div className="cart-total-divided w-full flex flex-col gap-4">
              <div className="cart-total-divided-row flex items-center justify-between border-b border-bordercommon pb-[10px]">
                <div className="cart-total-name text-themeBlue font-semibold">
                  {pricingSec?.subTotal}
                </div>
                <div className="cart-total-value">
                  ₹ <span>{total}</span>
                </div>
              </div>
              <div className="cart-total-divided-row flex items-center justify-between border-b border-bordercommon pb-[10px]">
                <div className="cart-total-name text-themeBlue font-semibold">
                  {pricingSec?.delivery}
                </div>
                <div className="cart-total-value">
                  ₹ <span>{total == 0 ? "0" : "9.00"}</span>
                </div>
              </div>
              <div className="cart-total-divided-row flex items-center justify-between border-b border-bordercommon pb-[10px]">
                <div className="cart-total-name text-themeBlue font-semibold">
                  {pricingSec?.taxesCharges}
                </div>
                <div className="cart-total-value">
                  ₹ <span>{total == 0 ? "0" : "29.00"}</span>
                </div>
              </div>
            </div>
            <div className="cart-total-final w-full flex items-center justify-between border-b border-bordercommon pb-[10px]">
              <div className="cart-total-name text-themeBlue font-semibold">
                {pricingSec?.total}
              </div>
              <div className="cart-total-value">
                ₹ <span>{total == 0 ? "0" : total + 38}</span>
              </div>
            </div>
            <RazorpayCheckoutBtn
              text={cart?.proceed}
              amount={(total + 38) * 100}
              type={"cart"}
            />
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="min-h-[calc(100vh_-_150px)] w-full flex flex-col  items-center justify-center">
      <Image src={emptyCart} alt="emptyCart" className="w-[400px] -mt-20" />
      <h1 className="text-center text-themeBlue dark:text-white text-3xl font-medium -mt-10">
        {empty?.title} <br />
        <span className="font-normal text-gray text-xl">{empty?.subText}</span>
      </h1>
      <Link href={"/products"}>
        <button className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200 mt-5">
          {empty?.shopNow}
        </button>
      </Link>
    </section>
  );
};

export default Cart;
