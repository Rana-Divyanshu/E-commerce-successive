import Image from "next/image";
import React from "react";

const OfferCard = ({ img, title, description }) => {
  return (
    <div className="offer-card relative w-full h-full flex flex-col items-center gap-4 text-center p-[4rem_1.5rem] shadow-md">
      <div className="offer-card-img">
        <Image src={img} alt="img" className="" />
      </div>
      <div className="offer-card-title  font-medium text-primary text-[20px]">
        {title}
      </div>
      <div className="offer-card-content text-[14px] text-gray">
        {description}
      </div>
    </div>
  );
};

export default OfferCard;
