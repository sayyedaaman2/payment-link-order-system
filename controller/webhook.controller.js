// controller/webhook.controller.js

import crypto from "crypto";
import OrderModel from "../model/order.model.js";
import logger from "../util/logger.js";

export const razorpayWebhook = async (req, res, next) => {

    try {

        /*
        |--------------------------------------------------------------------------
        | Get Razorpay Signature
        |--------------------------------------------------------------------------
        */
        const razorpaySignature =
            req.headers["x-razorpay-signature"];

        /*
        |--------------------------------------------------------------------------
        | Generate Signature From RAW Body
        |--------------------------------------------------------------------------
        */
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_WEBHOOK_SECRET
            )
            .update(req.body)
            .digest("hex");

        /*
        |--------------------------------------------------------------------------
        | Verify Signature
        |--------------------------------------------------------------------------
        */
        if (generatedSignature !== razorpaySignature) {

            logger.error("Invalid webhook signature");

            return res.status(400).json({
                success: false,
                message: "Invalid webhook signature"
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Parse RAW Buffer AFTER Verification
        |--------------------------------------------------------------------------
        */
        const payload =
            JSON.parse(req.body.toString());

        const event = payload.event;

        logger.info(
            `Webhook event received: ${event}`
        );

        /*
        |--------------------------------------------------------------------------
        | Handle Successful Payment Event
        |--------------------------------------------------------------------------
        */
        if (event === "payment.captured") {

            const paymentEntity =
                payload.payload.payment.entity;

            const razorpayPaymentId =
                paymentEntity.id;

            const razorpayPaymentLinkId =
                paymentEntity.payment_link_id;

            /*
            |--------------------------------------------------------------------------
            | Find Order
            |--------------------------------------------------------------------------
            */
            const order = await OrderModel.findOne({
                razorpayPaymentLinkId
            });

            if (!order) {

                logger.error(
                    `Order not found for Razorpay Payment Link ID: ${razorpayPaymentLinkId}`
                );

                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }

            /*
            |--------------------------------------------------------------------------
            | Prevent Duplicate Processing
            |--------------------------------------------------------------------------
            */
            if (order.status === "paid") {

                logger.info(
                    `Order already processed: ${order._id}`
                );

                return res.status(200).json({
                    success: true,
                    message: "Order already processed"
                });
            }

            /*
            |--------------------------------------------------------------------------
            | Update Order
            |--------------------------------------------------------------------------
            */
            order.status = "paid";

            order.razorpayPaymentId =
                razorpayPaymentId;

            order.paidAt = new Date();

            await order.save();

            logger.info(
                `Payment verified successfully for order: ${order._id}`
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Razorpay expects fast response
        |--------------------------------------------------------------------------
        */
        return res.status(200).json({
            success: true
        });

    } catch (err) {

        logger.error(
            err,
            "Webhook processing failed"
        );

        next(err);
    }
};