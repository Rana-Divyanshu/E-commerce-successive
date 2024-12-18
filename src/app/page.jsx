"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import heroBannerImg from "../assets/img/hero-banner.png";
import featureBannerImg from "../assets/img/feature-banner.png";
import CwcOffers from "../components/CwcOffers";
import ProductsGrid from "../components/ProductsGrid";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { t } = useTranslation();
  const home = t("home");
  const heroSec = t("home.heroSection");
  const latestOptions = t("home.latestOptions");
  const uniqueSec = t("home.uniqueSection");
  const cwcOffer = t("cwcOffer");

  const { appData } = useContext(AppContext);
  const { windowWidth } = appData;

  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [latestFilter, setLatestFilter] = useState("latest");

  const getfeatured = () => {
    const temp = appData?.productData?.filter((elem) => {
      return elem?.tags?.includes("featured");
    });
    setFeatured(temp);
  };
  const getlatest = () => {
    setLatestFilter("new");
    const temp = appData?.productData?.filter((elem) => {
      return elem?.tags?.includes("latest");
    });
    setLatest(temp);
  };
  const getmens = () => {
    setLatestFilter("men");
    const temp = appData?.productData?.filter((elem) => {
      return (
        elem?.tags?.includes("latest") && elem?.category == "Men's Clothing"
      );
    });
    setLatest(temp);
  };
  const getwomen = () => {
    setLatestFilter("women");
    const temp = appData?.productData?.filter((elem) => {
      return (
        elem?.tags?.includes("latest") && elem?.category == "Women's Clothing"
      );
    });
    setLatest(temp);
  };
  const getspecial = () => {
    setLatestFilter("special");
    const temp = appData?.productData?.filter((elem) => {
      return (
        elem?.tags?.includes("latest") && elem?.category == "Special Edition"
      );
    });
    setLatest(temp);
  };
  useEffect(() => {
    getfeatured();
    getlatest();
  }, [appData?.productData]);

  return (
    <div className="homepage">
      {/* Hero Banner */}
      <section
        className={`hero w-full h-[55vh] max-h-[480px] bg-no-repeat bg-bannertBG flex items-center justify-between bg-cover `}
        style={{
          backgroundImage: `url(/background/lights.png)`,
          backgroundSize: "22%",
        }}
      >
        <div
          className={`hero-left h-full flex items-center  px-4 ${
            windowWidth < 768 ? "w-full justify-center" : "w-1/2 justify-end"
          }`}
        >
          <div className="h-full flex flex-col gap-4 items-start justify-center text-white">
            <h1 className="text-3xl sm:text-3xl lg:text-4xl  xl:text-5xl 2xl:text-5xl leading-tight">
              {heroSec?.title?.line1} <br />
              {heroSec?.title?.line2}
            </h1>
            <p className="text-sm sm:text-sm md:text-md lg:text-lg xl:text-lg 2xl:text-lg">
              {heroSec?.description?.line1} <br />
              {heroSec?.description?.line2}
            </p>
            <Link href="/products">
              <button className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
                {home?.shopNowBtn}
              </button>
            </Link>
          </div>
        </div>

        {windowWidth > 767 && (
          <div className="hero-right w-1/2 h-full flex items-center justify-center px-4">
            <Image
              src={heroBannerImg}
              alt="heroBannerImg"
              className="w-auto h-[85%]"
              priority
            />
          </div>
        )}
      </section>

      {/* feature-products */}
      <section className="feature-products flex flex-col gap-4 py-[7rem] px-[15%]">
        <div className="feature-products-title  text-themeBlue dark:text-white font-medium text-4xl text-center w-full">
          {home?.feature}
        </div>
        <ProductsGrid data={featured} />
      </section>

      {/* latest-products */}
      <section className="latest-products flex flex-col gap-4 py-[7rem] px-[15%]">
        <h1 className="latest-products-title text-themeBlue dark:text-white font-medium text-4xl text-center w-full">
          {home?.latest}
        </h1>
        <div className="latest-products-filter w-1/3 flex items-center justify-between self-center">
          <button
            className={`hover:underline underline-offset-4 ease-in duration-100 ${
              latestFilter === "new"
                ? "text-themBlue dark:text-white underline "
                : "text-secText dark:text-gray-400 hover:underline"
            }`}
            onClick={() => getlatest()}
          >
            {latestOptions?.newArrival}
          </button>
          <button
            className={`hover:underline underline-offset-4 ease-in duration-100 ${
              latestFilter === "men"
                ? "text-themBlue dark:text-white underline "
                : "text-secText dark:text-gray-400 hover:underline"
            }`}
            onClick={() => getmens()}
          >
            {latestOptions?.mens}
          </button>
          <button
            className={`hover:underline underline-offset-4 ease-in duration-100 ${
              latestFilter === "women"
                ? "text-themBlue dark:text-white underline "
                : "text-secText dark:text-gray-400 hover:underline"
            }`}
            onClick={() => getwomen()}
          >
            {latestOptions?.womens}
          </button>
          <button
            className={`hover:underline underline-offset-4 ease-in duration-100 ${
              latestFilter === "special"
                ? "text-themBlue dark:text-white underline "
                : "text-secText dark:text-gray-400 hover:underline"
            }`}
            onClick={() => getspecial()}
          >
            {latestOptions?.special}
          </button>
        </div>
        <ProductsGrid data={latest} />
      </section>

      {/* features */}
      <section className="features flex items-center bg-bannertBG py-12 text-bg-dark-text">
        <div className="features-left w-[45%] flex flex-col justify-center items-center">
          <Image
            src={featureBannerImg}
            alt="featureBannerImg"
            className="features-img w-[70%]"
          />
        </div>
        <div className="features-right w-[50%] flex flex-col gap-4 text-[#e3e3e3] ">
          <h1 className="features-title text-4xl font-medium dark:text-white">
            {uniqueSec?.title}
          </h1>
          <div className="feature-point flex gap-2 items-center text-[14px]">
            <div className="point-dot bg-[#abbce1] h-[12px] w-[12px] rounded-full"></div>
            <div className="point-text w-[calc(100%_-_12p`x)]">
              {uniqueSec?.list?.pointer1}
            </div>
          </div>
          <div className="feature-point flex gap-2 items-center text-[14px]">
            <div className="point-dot bg-[#abbce1] h-[12px] w-[12px] rounded-full"></div>
            <div className="point-text  w-[calc(100%_-_12px)]">
              {uniqueSec?.list?.pointer2}
            </div>
          </div>
          <div className="feature-point flex gap-2 items-center text-[14px]">
            <div className="point-dot bg-[#abbce1] h-[12px] w-[12px] rounded-full"></div>
            <div className="point-text  w-[calc(100%_-_12px)]">
              {uniqueSec?.list?.pointer3}
            </div>
          </div>
          <div className="feature-point flex gap-2 items-center text-[14px]">
            <div className="point-dot bg-[#abbce1] h-[12px] w-[12px] rounded-full"></div>
            <div className="point-text  w-[calc(100%_-_12px)]">
              {uniqueSec?.list?.pointer4}
            </div>
          </div>
          <Link href="/products">
            <button className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
              {home?.shopNowBtn}
            </button>
          </Link>
        </div>
      </section>

      {/* cwc-offers */}
      <CwcOffers cwcOffer={cwcOffer} />

      {/* newsletter */}
      <section
        className="h-[360px] newsLetter bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center gap-4 text-whiter"
        style={{
          backgroundImage: `url(/background/newsLetter.png)`,
        }}
      >
        <h1 className="newsLetter-title w-2/5 text-center text-4xl text-white">
          {home?.newsLetter}
        </h1>
        <button className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
          {home?.subscribe}
        </button>
      </section>
    </div>
  );
};

export default Home;
