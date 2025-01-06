import { useRouter } from "next/navigation";
import { BsCart3 } from "react-icons/bs";
import { IoMdStar } from "react-icons/io";
import DynamicImage from "./DynamicImage";

function ProductsList({ data, addToCart, windowWidth }) {
  const router = useRouter();
  return windowWidth > 768 ? (
    <div className="product-list-cards mt-[3rem] flex flex-col gap-6">
      {data?.length !== 0 ? (
        data?.map((elem) => {
          return (
            <div
              className="product-list-card h-fit w-full p-4 flex items-center gap-10 rounded-lg border border-bordercommon hover:scale-x-[1.01] ease-linear duration-200 cursor-pointer overflow-hidden"
              onClick={() =>
                router.push(`/products/product-details?id=${elem?.id}`)
              }
              key={elem?.id}
            >
              <div className="product-img-div min-w-52 w-52 h-52 bg-[#f5f5f5] dark:bg-slate-300 flex items-center justify-center cursor-pointer">
                <DynamicImage title={elem?.title} />
              </div>
              <div className="product-details-div flex flex-col items-start gap-4">
                <div className="product-title pointer text-themeBlue dark:text-white font-semibold text-lg">
                  {elem?.title}
                </div>
                <div className="product-price-rating-div flex items-center gap-4 text-sm">
                  <div className="product-price text-themeBlue dark:text-white font-semibold">
                    ₹ {elem?.price}
                  </div>
                  <div className="product-rating flex items-center gap-[5px] text-gray dark:text-slate-200">
                    <IoMdStar className="text-[#FFC416]" />
                    {elem?.rating}
                  </div>
                </div>
                <div className="product-description w-[80%] text-gray dark:text-slate-200">
                  {elem?.description}
                </div>
                <button
                  className="addtocart pointer h-[40px] w-[40px] rounded-full flex items-center justify-center shadow shadow-themeBlue dark:shadow-none dark:outline dark:outline-1 dark:outline-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(elem?.id);
                  }}
                >
                  <BsCart3 className="text-themeBlue dark:text-white" />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div>No items found</div>
      )}
    </div>
  ) : (
    <div className="product-list-cards mt-[3rem] flex flex-col gap-6">
      {data?.length !== 0
        ? data?.map((elem) => {
            return (
              <div
                className="product-list-card min-h-fit w-full p-4 flex flex-col items-start gap-4 rounded-lg border border-bordercommon hover:scale-x-[1.01] ease-linear duration-200 cursor-pointer overflow-hidden"
                onClick={() =>
                  router.push(`/products/product-details?id=${elem?.id}`)
                }
                key={elem?.id}
              >
                <div className=" w-full h-fit flex items-start gap-8 cursor-pointer">
                  <div className="flex product-img-div min-w-52 w-52 h-52 bg-[#f5f5f5] dark:bg-slate-300">
                    <DynamicImage title={elem?.title} />
                  </div>
                  <div className="flex flex-col items-start gap-4">
                    <div className="product-title pointer text-themeBlue dark:text-white font-semibold text-lg">
                      {elem?.title}
                    </div>
                    <div className="product-price-rating-div flex items-center gap-4 text-sm">
                      <div className="product-price text-themeBlue dark:text-white font-semibold">
                        ₹ {elem?.price}
                      </div>
                      <div className="product-rating flex items-center gap-[5px] text-gray dark:text-slate-200">
                        <IoMdStar className="text-[#FFC416]" />
                        {elem?.rating}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-details-div flex flex-col items-end gap-4">
                  <div className="product-description w-full text-gray dark:text-slate-200">
                    {elem?.description}
                  </div>
                  <button
                    className="addtocart pointer h-[40px] w-[40px] rounded-full flex items-center justify-center shadow shadow-themeBlue dark:shadow-none dark:outline dark:outline-1 dark:outline-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(elem?.id);
                    }}
                  >
                    <BsCart3 className="text-themeBlue dark:text-white" />
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
