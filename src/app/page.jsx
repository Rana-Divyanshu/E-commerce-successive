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
import { data } from "../utils/data";

const Home = () => {
  const { t } = useTranslation();
  const home = t("home");
  const heroSec = t("home.heroSection");
  const latestOptions = t("latestOptions");
  const uniqueSec = t("home.uniqueSection");
  const cwcOffer = t("cwcOffer");

  const { appData } = useContext(AppContext);
  const { windowWidth } = appData;

  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [latestFilter, setLatestFilter] = useState("latest");

  const getfeatured = () => {
    const temp = data?.filter((elem) => {
      return elem?.tags?.includes("featured");
    });
    setFeatured(temp);
  };
  const getlatest = () => {
    setLatestFilter("new");
    const temp = data?.filter((elem) => {
      return elem?.tags?.includes("latest");
    });
    setLatest(temp);
  };
  const getmens = () => {
    setLatestFilter("men");
    const temp = data?.filter((elem) => {
      return (
        elem?.tags?.includes("latest") && elem?.category == "Men's Clothing"
      );
    });
    setLatest(temp);
  };
  const getwomen = () => {
    setLatestFilter("women");
    const temp = data?.filter((elem) => {
      return (
        elem?.tags?.includes("latest") && elem?.category == "Women's Clothing"
      );
    });
    setLatest(temp);
  };
  const getspecial = () => {
    setLatestFilter("special");
    const temp = data?.filter((elem) => {
      return (
        elem?.tags?.includes("latest") && elem?.category == "Special Edition"
      );
    });
    setLatest(temp);
  };
  useEffect(() => {
    getfeatured();
    getlatest();
  }, []);

  return (
    <div className="homepage">
      {/* Hero Banner */}
      <section
        className={`w-full h-[55vh] max-h-[480px] bg-no-repeat bg-bannertBG flex items-center justify-between bg-cover `}
        style={{
          backgroundImage: `url(/background/lights.png)`,
          backgroundSize: "22%",
        }}
      >
        <article
          className={`h-full flex items-center  px-4 ${
            windowWidth <= 960 ? "w-full justify-center" : "w-1/2 justify-end"
          }`}
        >
          <div className="h-full flex flex-col gap-4 items-start justify-center text-white">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl leading-tight">
              {heroSec?.title?.line1} <br />
              {heroSec?.title?.line2}
            </h1>
            <p className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-lg 2xl:text-lg">
              {heroSec?.description?.line1} <br />
              {heroSec?.description?.line2}
            </p>
            <Link href="/products">
              <button className="bg-themeBlue hover:bg-btnHover text-white w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
                {home?.shopNowBtn}
              </button>
            </Link>
          </div>
        </article>

        {windowWidth > 960 && (
          <div className="w-1/2 h-full flex items-center justify-center px-4">
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
        <div className="feature-products-title  text-themeBlue font-medium text-[2rem] text-center w-full">
          {home?.feature}
        </div>
        <ProductsGrid data={featured} />
      </section>

      {/* latest-products */}
      <section className="latest-products flex flex-col gap-4 py-[7rem] px-[15%]">
        <h1 className="latest-products-title text-themeBlue font-medium text-[2rem] text-center w-full">
          {home?.latest}
        </h1>
        <div className="latest-products-filter w-1/3 flex items-center justify-between self-center">
          <button
            className={` hover:text-themeBlue hover:underline underline-offset-4 ease-in duration-100 ${
              latestFilter === "new"
                ? "text-themeBlue underline"
                : "text-[#abbce1]"
            }`}
            onClick={() => getlatest()}
          >
            {latest.newArrival}
          </button>
          <button
            className={` hover:text-themeBlue hover:underline underline-offset-4 ease-in duration-100 ${
              latestFilter === "men"
                ? "text-themeBlue underline"
                : "text-[#abbce1]"
            }`}
            onClick={() => getmens()}
          >
            {latest.mens}
          </button>
          <button
            className={` hover:text-themeBlue hover:underline underline-offset-4 ease-in duration-100 ${
              latestFilter === "women"
                ? "text-themeBlue underline"
                : "text-[#abbce1]"
            }`}
            onClick={() => getwomen()}
          >
            {latest.womens}
          </button>
          <button
            className={` hover:text-themeBlue hover:underline underline-offset-4 ease-in duration-100 ${
              latestFilter === "special"
                ? "text-themeBlue underline"
                : "text-[#abbce1]"
            }`}
            onClick={() => getspecial()}
          >
            {latest.speial}
          </button>
        </div>
        <ProductsGrid data={latest} />
      </section>

      {/* features */}
      <section className="features flex items-center bg-bannertBG py-[3rem] text-bg-dark-text">
        <div className="features-left w-[45%] flex flex-col justify-center items-center">
          <Image
            src={featureBannerImg}
            alt="featureBannerImg"
            className="features-img w-[70%]"
          />
        </div>
        <div className="features-right w-[50%] flex flex-col gap-4 text-[#e3e3e3] ">
          <h1 className="features-title text-[2.5rem] font-medium">
            {uniqueSec.title}
          </h1>
          <div className="feature-point flex gap-2 items-center text-[14px]">
            <div className="point-dot bg-[#abbce1] h-[12px] w-[12px] rounded-full"></div>
            <div className="point-text w-[calc(100%_-_12px)]">
              {uniqueSec.list.pointer1}
            </div>
          </div>
          <div className="feature-point flex gap-2 items-center text-[14px]">
            <div className="point-dot bg-[#abbce1] h-[12px] w-[12px] rounded-full"></div>
            <div className="point-text  w-[calc(100%_-_12px)]">
              {uniqueSec.list.pointer2}
            </div>
          </div>
          <div className="feature-point flex gap-2 items-center text-[14px]">
            <div className="point-dot bg-[#abbce1] h-[12px] w-[12px] rounded-full"></div>
            <div className="point-text  w-[calc(100%_-_12px)]">
              {uniqueSec.list.pointer3}
            </div>
          </div>
          <div className="feature-point flex gap-2 items-center text-[14px]">
            <div className="point-dot bg-[#abbce1] h-[12px] w-[12px] rounded-full"></div>
            <div className="point-text  w-[calc(100%_-_12px)]">
              {uniqueSec.list.pointer4}
            </div>
          </div>
          <Link href="/products">
            <button className="bg-themeBlue hover:bg-btnHover text-white w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
              {home?.shopNowBtn}
            </button>
          </Link>
        </div>
      </section>

      {/* cwc-offers */}
      <CwcOffers cwcOffer={cwcOffer} />

      {/* newsletter */}
      <section
        className="h-[360px] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center gap-4 text-whiter"
        style={{
          backgroundImage: `url(/background/newsLetter.png)`,
        }}
      >
        <h1 className="w-2/5 text-center text-4xl text-white">
          {home?.newsLetter}
        </h1>
        <button className="bg-themeBlue hover:bg-btnHover text-white w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
          {home?.subscribe}
        </button>
      </section>
    </div>
  );
};

export default Home;
