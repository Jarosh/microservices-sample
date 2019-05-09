import * as HttpCode from '@/helpers/httpCodes';
import OrderService from '~/services/OrderService';

/**
 * @swagger
 * /v1/order:
 *   get:
 *     tags: [Orders]
 *     description: List all orders for an authenticated user.
 *     responses:
 *       200:
 *         description: Array of orders
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/Order'
 *   post:
 *     tags: [Orders]
 *     description: Place a new Order.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: order
 *         description: The Order to create.
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Order_RW'
 *     responses:
 *       200:
 *         description: Array of orders
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/Order'
 * /v1/order/{id}:
 *   get:
 *     tags: [Orders]
 *     description: Get a specific Order
 *     parameters:
 *       - name: id
 *         description: ID of an Order belonging to a currently authenticated user.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order object
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Order'
 *   put:
 *     tags: [Orders / Internal]
 *     description: Updates an Order.
 *     parameters:
 *       - name: id
 *         description: ID of an Order
 *         in: path
 *         required: true
 *         type: string
 *       - name: order
 *         description: The Order to update.
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Order_RW'
 *     responses:
 *       200:
 *         description: Updated Order object
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/definitions/Order'
 *   delete:
 *     tags: [Orders]
 *     description: Delete a specific Order belonging to a currently authenticated user. Won't work for `delivered` orders.
 *     parameters:
 *       - name: id
 *         description: ID of an order belonging to a currently authenticated user.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Order deleted
 */

export default class {

	static async getAll(req, res) {
		const r = [];
		for (const i of await OrderService.getAll(req.session && req.session.userId)) {
			r.push(i);
		}
		res.json(r);
	}

	static getById(req, res) {
		res.json(req.order);
	}

	static async create(req, res, next) {
		try {
			const order = await OrderService.save(OrderService.makeOrder(req.session && req.session.userId), req.body);
			if (order) {
				res.json(order);
			} else {
				next(new HttpCode.UnexpectedError('Was not created'));
			}
		} catch(exc) {
			if (exc.errors) {
				next(new HttpCode.ValidationFailed(exc.errors));
			} else {
				next(new HttpCode.UnexpectedError('Was not created'));
			}
		}
	}

	static async update(req, res, next) {
		try {
			const order = await OrderService.save(req.order, req.body);
			if (order) {
				res.json(order);
			} else {
				next(new HttpCode.UnexpectedError('Was not updated'));
			}
		} catch(exc) {
			if (exc.errors) {
				next(new HttpCode.ValidationFailed(exc.errors));
			} else {
				next(new HttpCode.UnexpectedError('Was not updated'));
			}
		}
	}

	static async delete(req, res, next) {
		try {
			await OrderService.drop(req.params.id, req.session && req.session.userId);
			res.status(200).send();
		} catch(exc) {
			next(exc);
		}
	}

}
