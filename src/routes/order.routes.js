import { Router } from "express";

import * as OrderController
    from "../controller/order.controller.js";

import {
    createOrderSchema,
    updateOrderSchema
} from "../validation/order.validation.js";

import validate
    from "../middleware/validator.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Create payment order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *                 example: Aaman Sayyed
 *               product:
 *                 type: string
 *                 example: iPhone 13
 *               amount:
 *                 type: number
 *                 example: 120
 *               currency:
 *                 type: string
 *                 example: INR
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post(
    "/",
    validate(createOrderSchema),
    OrderController.createOrder
);

/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: List of all orders
 */
router.get(
    "/",
    OrderController.getOrders
);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order fetched successfully
 *       404:
 *         description: Order not found
 */
router.get(
    "/:id",
    OrderController.getOrderById
);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   put:
 *     summary: Update order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
 */
router.put(
    "/:id",
    validate(updateOrderSchema),
    OrderController.updateOrder
);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   delete:
 *     summary: Delete order
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */
router.delete(
    "/:id",
    OrderController.deleteOrder
);

export default router;