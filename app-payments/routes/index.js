import express from 'express';

import AuthMiddleware from '@/helpers/AuthMiddleware';
import paymentRoutes from '~/routes/payment';


const router = express.Router();

router.use('/', AuthMiddleware.isAuthorized, paymentRoutes);

export default router;
