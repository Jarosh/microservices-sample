import express from 'express';

import AuthMiddleware from '@/helpers/AuthMiddleware';
import orderRoutes from '~/routes/order';


const router = express.Router();

router.use('/', AuthMiddleware.isAuthorized, orderRoutes);

export default router;
