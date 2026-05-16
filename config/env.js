import dotenv from "dotenv";
import {z} from 'zod';
dotenv.config({
    path : `.env.${process.env.NODE_ENV || "development"}`
});


//  Enviroment Schema

const envSchema = z.object({
    NODE_ENV : z.enum([
        "development",
        "production",
        "test",
    ]).default("development"),
    PORT : z.coerce.number().default(3000),
    MONGODB_URI : z.string().min(1),

    RAZORPAY_KEY_ID : z.string().min(1),
    RAZORPAY_SECRET : z.string().min(1),

    RAZORPAY_WEBHOOK_SECRET : z.string().min(1)
})

const env = envSchema.parse(process.env);

export default env;