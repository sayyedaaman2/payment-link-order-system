import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    product : {
        type    : String,
        required: true
     },
    amount: { type: Number, required: true },
    currency : { type: String, required: true },
    status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending'
    },
    paymentLink: { type: String },
    razorpayPaymentId: { type: String },
    razorpayOrderId: { type: String },
    paidAt: { type: Date },

}, { timestamps: true });