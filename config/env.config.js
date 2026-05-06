import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV || 'development';
const env = nodeEnv === 'production' ? 'production' : 'development';

dotenv.config({ path: `.env.${env}` });

const config = {
  production: {
    MONGODB_URI: process.env.MONGODB_URI,
    PORT: process.env.PORT || 3000,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL,
    PAYMENT_CALLBACK_URL: process.env.PAYMENT_CALLBACK_URL,
  },
  development: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/payment-link-order-system',
    PORT: process.env.PORT || 3000,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'rzp_test_example',
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET || 'test_secret',
    JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt_secret',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
    PAYMENT_CALLBACK_URL: process.env.PAYMENT_CALLBACK_URL || 'http://localhost:3000/callback',
  },
};

export default config[env];
