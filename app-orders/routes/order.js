import express from 'express';
import get from 'lodash/get';

import * as HttpCode from '@/helpers/httpCodes';
import AuthMiddleware from '@/helpers/AuthMiddleware';
import OrderController from '~/controllers/OrderController';
import OrderService from '~/services/OrderService';


const router = express.Router();

router.get('/', OrderController.getAll);
router.post('/', OrderController.create);
router.get('/:id', OrderController.getById);
router.put('/:id', AuthMiddleware.isInternalInvocation, OrderController.update);
router.delete('/:id', OrderController.delete);

router.param('id', async (req, res, next, id) => {
	if (!/^[0-9a-zA-Z]+$/.test(id)) {
		next(new HttpCode.BadRequest('Invalid ID'));
		return;
	} else {
		try {
			const order = await OrderService.getById(id);
			if (order) {
				req.order = order;
				next();
			} else {
				next(new HttpCode.NotFound('Order'));
			}
		} catch (exc) {
			next(exc);
		}
	}
});

export default router;
