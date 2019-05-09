import axios from 'axios';
import mongoose from 'mongoose';
import moment from 'moment';

import * as HttpCode from '@/helpers/httpCodes';


const TIMEOUT_PROCESS = 5000;
const TIMEOUT_DELIVER = 30000;


export default class {

	static async process(orderId) {
		// Mock some processing activity with randomized behaviour
		const process = new Promise((resolve, reject) => {
		  setTimeout(() => {
			  if (Math.random() >= 0.5) {
				  resolve('confirmed');
			  } else {
				  reject('cancelled');
			  }
		  }, TIMEOUT_PROCESS);
		});

		const deliver = new Promise((resolve, reject) => {
		  setTimeout(() => {
			  resolve('delivered');
		  }, TIMEOUT_DELIVER);
		});

		process.then(
			(res) => {
				return this.changeOrderStatus(orderId, res).then(() => deliver);
			},
			(err) => {
				return this.changeOrderStatus(orderId, err).then(() => Promise.reject());
			}
		).then(
			(res) => {
				return this.changeOrderStatus(orderId, res);
			}
		).then(
			(res) => {
				console.log(`+ Order delivered: ${orderId}`);
			}
		).catch((err) => {
			console.log(`- Order cancelled/failed: ${orderId}`);
		});

		return await Promise.resolve({});
	}

	static async changeOrderStatus(orderId, state) {
		return axios.create({
			baseURL: 'http://api.app.local:8080',
			headers: { common: { 'x-app-secret': process.env.APP_ORDERS_SECRET } }
		}).put(`/v1/order/${orderId}`, { state });
	}

}
