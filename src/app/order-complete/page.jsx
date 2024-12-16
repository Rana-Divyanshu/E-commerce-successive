import clock from "../../assets/svg/clock.svg";
import checklist from "../../assets/svg/checklist.svg";
import ordercomplete from "../../assets/svg/orderComplete.svg";
import Image from "next/image";
import Link from "next/link";

function OrderComplete() {
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
        Your Order Is Placed!
      </div>
      <div className="ordercomplete-content text-gray w-3/4 text-lg">
        Thank you for placing your order! Your order is currently being
        processed and will be completed within 3 to 6 hours. <br /> You will
        receive an email confirmation once your order has been completed.
      </div>
      <Link href={"/products"}>
        <button className="bg-themeBlue hover:bg-btnHover text-white w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200">
          Continue Shopping
        </button>
      </Link>
    </section>
  );
}

export default OrderComplete;
