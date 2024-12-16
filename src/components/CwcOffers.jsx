import React from "react";
import OfferCard from "../components/OfferCard";
import deliveryImg from "../assets/img/cwc-offers/delivery.png";
import customizationImg from "../assets/img/cwc-offers/customization.png";
import qualityImg from "../assets/img/cwc-offers/quality.png";
import supportImg from "../assets/img/cwc-offers/support.png";

function CwcOffers() {
  return (
    <section className="cwc-offers py-[7rem] px-[15%]">
      <div className="cwc-offer-content flex flex-col items-center gap-8">
        <h1 className="offer-head text-[2rem] font-medium text-text-themeBlue">
          What CWC Offer !
        </h1>
        <div className="offer-cards grid gap-4 grid-cols-4 w-full">
          <OfferCard
            img={deliveryImg}
            title={"Fast Delivery"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massapurus gravida."
            }
          />
          <OfferCard
            img={customizationImg}
            title={"Customization"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massapurus gravida."
            }
          />
          <OfferCard
            img={qualityImg}
            title={"Premium Quality"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massapurus gravida."
            }
          />
          <OfferCard
            img={supportImg}
            title={"24/7 Support"}
            description={
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massapurus gravida."
            }
          />
        </div>
      </div>
    </section>
  );
}

export default CwcOffers;
