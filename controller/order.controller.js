import OrderModel from '../model/order.model.js';
import razor from '../config/razor.config.js';

export const createOrder = async (req, res, next) => {
    try {

        const order = new OrderModel(req.body);

        const paymentLink = await razor.paymentLink.create({
            amount: order.amount * 100,
            currency: order.currency,
            accept_partial: false,
            description: order.product,
            customer: {
                name: order.customerName
            },
            notify: {
                sms: false,
                email: false
            },
            reminder_enable: true
        });

        order.razorpayOrderId = paymentLink.id;
        order.status = "pending";

        await order.save();

        res.status(201).json({
            success: true,
            paymentLink: paymentLink.short_url,

            order
        });

    } catch (err) {
        next(err);
    }
};

export const verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const order = await OrderModel.findOne({ razorpayOrderId: razorpay_order_id });
        if (!order) return res.status(404).json({ message: "Order not found" });

        const generated_signature = razor.utils.hmacSHA256(razorpay_order_id + "|" + razorpay_payment_id, razor.key_secret).toString();

        if (generated_signature === razorpay_signature) {
            order.status = "paid";
            await order.save();
            res.json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid payment signature" });
        }

    } catch (err) {
        next(err);
    }
}
export const getOrders = async (req, res, next) => {
    try {
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (err) {
        next(err);
    }
}

export const getOrderById = async (req, res, next) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (err) {
        next(err);
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (err) {
        next(err);
    }
}

export const deleteOrder = async (req, res, next) => {
    try {
        const order = await OrderModel.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json({ message: "Order deleted" });
    } catch (err) {
        next(err);
    }
}
