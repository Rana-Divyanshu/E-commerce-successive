import React from "react";
import OfferCard from "../components/OfferCard";
import deliveryImg from "../assets/img/cwc-offers/delivery.png";
import customizationImg from "../assets/img/cwc-offers/customization.png";
import qualityImg from "../assets/img/cwc-offers/quality.png";
import supportImg from "../assets/img/cwc-offers/support.png";

function CwcOffers({ cwcOffer }) {
  return (
    <section className="cwc-offers py-[7rem] px-[15%]">
      <div className="cwc-offer-content flex flex-col items-center gap-8">
        <h1 className="offer-head text-4xl dark:text-white font-medium text-text-themeBlue">
          {cwcOffer?.title}
        </h1>
        <div className="offer-cards grid gap-4 grid-cols-4 w-full">
          <OfferCard
            img={deliveryImg}
            title={cwcOffer?.["Fast Delivery"]?.title}
            description={cwcOffer?.["Fast Delivery"]?.description}
          />
          <OfferCard
            img={customizationImg}
            title={cwcOffer?.["Customization"]?.title}
            description={cwcOffer?.["Customization"]?.description}
          />
          <OfferCard
            img={qualityImg}
            title={cwcOffer?.["Premium Quality"]?.title}
            description={cwcOffer?.["Premium Quality"]?.description}
          />
          <OfferCard
            img={supportImg}
            title={cwcOffer?.["24/7 Support"]?.title}
            description={cwcOffer?.["24/7 Support"]?.description}
          />
        </div>
      </div>
    </section>
  );
}

export default CwcOffers;
