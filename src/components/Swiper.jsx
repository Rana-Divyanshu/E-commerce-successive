"use client";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SwiperImages = ({ children }) => {
  return (
    <section className="w-full h-full">
      <ul className="h-full w-full">
        <Swiper
          navigation
          pagination={{ type: "bullets", clickable: true }}
          autoplay={false}
          loop={true}
          modules={[Autoplay, Navigation, Pagination]}
        >
          {children}
        </Swiper>
      </ul>
    </section>
  );
};

export default SwiperImages;
