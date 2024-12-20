import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function RazorpayCheckoutBtn({ text, amount, type }) {
  //   const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { dispatch } = useContext(AppContext);

  function generatePhoneNumbers() {
    let phoneNumbers = [];
    let n = 10;
    for (let i = 0; i < n; i++) {
      let firstDigit = Math.floor(Math.random() * 5) + 5; // generate a random number between 5 and 9
      let phoneNumber = firstDigit.toString();

      for (let j = 0; j < 9; j++) {
        phoneNumber += Math.floor(Math.random() * 10); // generate a random digit between 0 and 9
      }

      phoneNumbers.push(phoneNumber);
    }
    return phoneNumbers;
  }
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    // setLoading(true);

    try {
      // Step 1: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script");
      }

      // Step 2: Fetch order ID from backend
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
      const { order } = await res.json();

      if (!order) {
        throw new Error("Order creation failed");
      }

      // Step 3: Initialize Razorpay payment
      const razorpay = new Razorpay({
        key: "rzp_test_reNIrSfkhwqVQT", // Replace with your Razorpay Test Key ID
        amount: order.amount, // Amount in paise
        currency: order.currency,
        name: "E-Commerce Successive",
        description: "Order Payment",
        order_id: order.id, // Order ID returned from Razorpay
        handler: function (response) {
          //   alert(`Payment successful: ${response.razorpay_payment_id}`);
          dispatch({ type: "cartItems", payload: [] });
          dispatch({ type: "payId", payload: response.razorpay_payment_id });
          router.push("/order-complete");
          // Add any additional logic here (e.g., save payment status to the database)
        },
        prefill: {
          name: localStorage.getItem("userName"),
          email: localStorage.getItem("email"),
          contact: generatePhoneNumbers(),
        },
        notes: {
          address:
            "Successive Technologies, Windsor Grand, Plot no. 1-C, 4th Floor, Sector 126, Noida, Uttar Pradesh 201301",
        },
        theme: {
          color: "#3399cc",
        },
      });

      razorpay.open();
    } catch (error) {
      alert(error.message);
    } finally {
      //   setLoading(false);
    }
  };

  const handleCheckoutValidate = (e) => {
    e.preventDefault();
    if (
      (session?.user && Object.entries(session?.user).length > 0) ||
      (localStorage.getItem("userName") && localStorage.getItem("email"))
    ) {
      handleCheckout();
    } else {
      toast.dismiss();
      toast.error("Please login first to checkout");
    }
  };

  return type === "cart" ? (
    <button
      className="bg-green hover:bg-emerald-600 text-white w-full py-2 rounded-md flex items-center justify-center ease-linear duration-200"
      onClick={(e) => {
        handleCheckoutValidate(e);
      }}
    >
      {text}
    </button>
  ) : (
    type === "buy" && (
      <button
        className="bg-themeBlue hover:bg-btnHover text-white dark:bg-slate-400 w-fit px-6 py-2 rounded-md flex items-center justify-center ease-linear duration-200"
        onClick={(e) => {
          handleCheckoutValidate(e);
        }}
      >
        {text}
      </button>
    )
  );
}
