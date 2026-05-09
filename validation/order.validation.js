import joi from 'joi';

export const createOrderSchema = joi.object({
    customerName: joi.string().required(),
    product: joi.string().required(),
    amount: joi.number().required(),
    currency: joi.string().optional(),
})

export const updateOrderSchema = joi.object({
    customerName: joi.string().optional(),
    product: joi.string().optional(),
    amount: joi.number().optional(),
    currency: joi.string().optional(),
})