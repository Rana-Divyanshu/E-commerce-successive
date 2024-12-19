import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { amount } = req.body; // Extract amount from the request body

      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Replace with your Razorpay Test Key ID
        key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET, // Replace with your Razorpay Test Key Secret
      });

      const options = {
        amount: amount, // Amount in paise (500 INR)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);

      res.status(200).json({ order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
