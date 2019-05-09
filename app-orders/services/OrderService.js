import axios from 'axios';
import mongoose from 'mongoose';
import moment from 'moment';

import * as HttpCode from '@/helpers/httpCodes';
import OrderModel from '~/models/OrderModel';


export default class {

	static makeOrder(userId) {
		return new OrderModel({
			id_user: userId,
			items: [],
			summary: ''
		});
	}

	static async getAll(userId) {
		const criteria = {};

		if (userId) {
			criteria.id_user = userId;
		}

		return await OrderModel.find(criteria);
	}

	static async getById(id) {
		return await OrderModel.findById(id);
	}

	static async save(order, params) {
		const isNew = !order._id;

		if (isNew) {
			order._id = mongoose.Types.ObjectId();
		}

		if (!order.created_at) {
			order.created_at = Date();
		}

		order.updated_at = Date();

		[ 'items', 'summary' ].forEach(k => {
			if (typeof params[k] !== 'undefined') {
				order[k] = params[k];
			}
		});

		if (!isNew && params['state'] /*&& isInternalInvocation()*/) { // all updates are internal at this point, extra checking is omited because of author's laziness
			order['state'] = params['state'];
		}

		const r = await order.save();

		if (isNew) {
			axios.create({
				baseURL: 'http://api.app.local:8080',
				headers: { common: { 'x-app-secret': process.env.APP_PAYMENTS_SECRET } }
			}).post(`/v1/payment?order=${order._id}`, {})
				.then((res) => {
				})
				.catch(() => {
					// Not the best way of doing things without even notifying user, however it's just an example...
					OrderModel.remove({ _id: order._id });
				});
		}

		return r;
	}

	static async drop(id, userId) {
		return await OrderModel.remove({ _id: id, id_user: userId, state: { $ne: 'delivered' } });
	}

}
