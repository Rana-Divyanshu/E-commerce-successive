import { useRouter } from "next/navigation";
import { BsCart3 } from "react-icons/bs";
import { IoMdStar } from "react-icons/io";
import DynamicImage from "./DynamicImage";

function ProductsList({ data, addToCart }) {
  const router = useRouter();
  return (
    <div className="product-list-cards mt-[3rem] flex flex-col gap-6">
      {data?.length !== 0
        ? data?.map((elem) => {
            return (
              <div
                className="product-list-card h-fit w-full p-4 flex items-center gap-10 border border-bordercommon hover:scale-x-[1.01] ease-linear duration-200 cursor-pointer"
                onClick={() =>
                  router.push(`/products/product-details?id=${elem?.id}`)
                }
                key={elem?.id}
              >
                <div className="product-img-div min-w-52 w-52 h-52 bg-[#f5f5f5] flex items-center justify-center cursor-pointer">
                  {/* <img
                    src={elem?.primaryImage}
                    alt="product-img"
                    className="product-img h-full"
                  /> */}
                  <DynamicImage title={elem?.title} />
                </div>
                <div className="product-details-div flex flex-col items-start gap-4">
                  <div className="product-title pointer text-themeBlue font-semibold text-lg">
                    {elem?.title}
                  </div>
                  <div className="product-price-rating-div flex items-center gap-4 text-sm">
                    <div className="product-price text-themeBlue font-semibold">
                      ₹ {elem?.price}
                    </div>
                    <div className="product-rating flex items-center gap-[5px] text-gray">
                      <IoMdStar className="text-[#FFC416]" />
                      {elem?.rating}
                    </div>
                  </div>
                  <div className="product-description w-[80%] text-gray">
                    {elem?.description}
                  </div>
                  <button
                    className="addtocart pointer h-[40px] w-[40px] rounded-full flex items-center justify-center shadow shadow-themeBlue"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(elem?.id);
                    }}
                  >
                    <BsCart3 />
                  </button>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default ProductsList;
