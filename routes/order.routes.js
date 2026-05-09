import {Router} from 'express';
import * as OrderController from '../controller/order.controller.js'
import { createOrderSchema,updateOrderSchema } from '../validation/order.validation.js';
import validate from '../middleware/validator.middleware.js';
const router = Router();

router.post("/",
    validate(createOrderSchema),
    OrderController.createOrder);


router.put("/:id",validate(updateOrderSchema),OrderController.updateOrder);

router.delete("/:id",OrderController.deleteOrder);

router.get("/:id",OrderController.getOrderById);

router.get("/",OrderController.getOrders);


export default router;