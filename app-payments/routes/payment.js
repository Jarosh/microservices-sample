import express from 'express';
import get from 'lodash/get';

import * as HttpCode from '@/helpers/httpCodes';
import AuthMiddleware from '@/helpers/AuthMiddleware';
import PaymentController from '~/controllers/PaymentController';
import PaymentService from '~/services/PaymentService';


const router = express.Router();

router.post('/', AuthMiddleware.isInternalInvocation, PaymentController.process);

export default router;
