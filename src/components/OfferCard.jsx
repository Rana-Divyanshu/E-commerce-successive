import Image from "next/image";
import React from "react";

const OfferCard = ({ img, title, description }) => {
  return (
    <div className="offer-card relative w-full h-full flex flex-col items-center gap-4 text-center py-6 px-8 shadow-md dark:shadow dark:shadow-white overflow-hidden">
      <div className="offer-card-img">
        <Image src={img} alt="img" className="" />
      </div>
      <div className="offer-card-title  font-medium text-themeBlue dark:text-white text-[20px]">
        {title}
      </div>
      <div className="offer-card-content text-[14px] text-gray dark:text-slate-200">
        {description}
      </div>
    </div>
  );
};

export default OfferCard;
