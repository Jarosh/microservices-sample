import * as HttpCode from '@/helpers/httpCodes';
import PaymentService from '~/services/PaymentService';

/**
 * @swagger
 * /v1/payment:
 *   post:
 *     tags: [Payments / Internal]
 *     description: Place a newly created Order for payment processing.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: Order ID.
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: Queued for processing
 */

export default class {

	static async process(req, res, next) {
		try {
			res.json(await PaymentService.process(req.query.order));
		} catch(exc) {
			next(new HttpCode.UnexpectedError('Processing failed'));
		}
	}

}
