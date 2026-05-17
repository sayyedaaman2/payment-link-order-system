import Razorpay from "razorpay";
import env from "./env.js";

const razorInstance = new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_SECRET,
});

export default razorInstance;