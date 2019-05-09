import express from 'express';

import AuthMiddleware from '~/helpers/AuthMiddleware';
import orderRoutes from '~/routes/order';
import paymentRoutes from '~/routes/payment';
import swaggerRoutes from '~/routes/swagger';


const router = express.Router();

router.use('/v1/order', AuthMiddleware.processJWT, orderRoutes);
router.use('/v1/payment', AuthMiddleware.processJWT, paymentRoutes);
router.use('/', swaggerRoutes);

export default router;
