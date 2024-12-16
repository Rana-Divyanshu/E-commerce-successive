"use client";
import React from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";
import aboutus from "../../assets/img/about-us-banner.png";
import CwcOffers from "../../components/CwcOffers";

const AboutUs = () => {
  const router = useRouter();

  return (
    <>
      {/* About Us */}
      <div className="about-us-content py-[4rem] px-[15%] flex items-center gap-8">
        <div className="aboutus-left w-1/2">
          <Image
            src={aboutus}
            alt="about-us"
            className="aboutus-img w-full h-auto"
          />
        </div>
        <div className="aboutus-right w-1/2 flex flex-col gap-4">
          <div className="aboutus-title text-4xl text-themeBlue">
            Know About Our Ecomerce Business,
          </div>
          <div className="aboutus-content text-gray">
            CustomWearCreations began with a simple vision where any cloth
            design can be implied on our platform with its unique functionality
            to help people get the fashionable products they desire.
          </div>
          <button
            className="bg-themeBlue hover:bg-btnHover text-white w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200"
            onClick={() => router.push("/contact-us")}
          >
            Contact Us
          </button>
        </div>
      </div>
      {/* cwc-offers */}
      <CwcOffers />
    </>
  );
};

export default AboutUs;
