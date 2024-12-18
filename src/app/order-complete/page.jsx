"use client";
import clock from "../../assets/svg/clock.svg";
import checklist from "../../assets/svg/checklist.svg";
import ordercomplete from "../../assets/svg/orderComplete.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

function OrderComplete() {
  const { t } = useTranslation();
  const confirmationPageT = t("orderComplete");

  return (
    <section className="order-complete-content min-h-[calc(100vh_-_150px)] relative py-16 px-1/4 flex flex-col items-center justify-center gap-4 text-center">
      <Image
        src={clock}
        alt="order"
        className="absolute w-[75px] top-1/4 left-1/3"
      />
      <Image
        src={checklist}
        alt="order"
        className="absolute w-[75px] right-1/3 bottom-1/4"
      />
      <Image src={ordercomplete} alt="order" />
      <div className="ordercomplete-title font-medium text-themeBlue dark:text-white text-3xl">
        {confirmationPageT?.title}
      </div>
      <div className="ordercomplete-content text-gray w-3/4 text-lg">
        {confirmationPageT?.description?.line1} <br />
        {confirmationPageT?.description?.line2}
      </div>
      <Link href={"/products"}>
        <button className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
          {confirmationPageT?.button}
        </button>
      </Link>
    </section>
  );
}

export default OrderComplete;
