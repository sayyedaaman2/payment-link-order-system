import {Router} from 'express';
import * as OrderController from '../controller/order.controller.js'
const router = Router();

router.post("/",OrderController.createOrder);

router.post("/verify",OrderController.verifyPayment);

router.put("/:id",OrderController.updateOrder);

router.delete("/:id",OrderController.deleteOrder);

router.get("/:id",OrderController.getOrderById);

router.get("/",OrderController.getOrders);


export default router;