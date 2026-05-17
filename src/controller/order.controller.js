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


export const getOrders = async (req, res, next) => {
    try {
        const { name, status, paymentLinkId, page = 1, limit = 10 } = req.query;
        const query = {};

        if (name) {
            query.customerName = { $regex: name, $options: 'i' };
        }
        if (status) {
            query.status = status;
        }
        if (paymentLinkId) {
            query.razorpayOrderId = paymentLinkId;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const orders = await OrderModel.find(query)
            .limit(parseInt(limit))
            .skip(skip)
            .sort({ createdAt: -1 });

        const totalOrders = await OrderModel.countDocuments(query);

        res.json({
            success: true,
            totalOrders,
            totalPages: Math.ceil(totalOrders / parseInt(limit)),
            currentPage: parseInt(page),
            orders
        });
    } catch (err) {
        next(err);
    }
}

export const getOrderById = async (req, res, next) => {
    try {
        const order = await OrderModel.findById(req.params.id);
        if (!order) throw new Error("Order not found");
        res.json(order);
    } catch (err) {
        next(err);
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) throw new Error("Order not found");
        res.json(order);
    } catch (err) {
        next(err);
    }
}

export const deleteOrder = async (req, res, next) => {
    try {
        const order = await OrderModel.findByIdAndDelete(req.params.id);
        if (!order) throw new Error("Order not found");
        res.json({ message: "Order deleted" });
    } catch (err) {
        next(err);
    }
}
