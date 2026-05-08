import dotenv from "dotenv";

dotenv.config();

const env = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
};

export default env;