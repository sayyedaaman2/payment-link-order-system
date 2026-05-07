import {Router} from 'express';
import OrderRoutes from './order.routes.js'
const router = Router();

router.use('/order',OrderRoutes)

export default router;