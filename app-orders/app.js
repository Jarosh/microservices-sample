import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import ErrorMiddleware from '@/helpers/ErrorMiddleware';
import routes from '~/routes';


const { PORT } = process.env;


class App {

	constructor() {
		this.app = express();
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(routes);
		this.app.use(ErrorMiddleware.isHttpError);
	}

	initMongo() {
		require('./config/mongoose');
	}

	start() {
		this.initMongo();

		this.server = this.app.listen(PORT, () => console.log('app-orders started on port:', PORT));

		// Stop the service from accepting new connections and finish existing to Mongo
		process.on('SIGINT', () => {
			console.info('SIGINT signal received.');
			
			this.server.close(function(err) {
				if (err) {
					console.error(err);
				}
				mongoose.connection.close(function() {
					console.info('Mongoose connection closed');
				});
			});
		});
	}

	stop() {
		console.info('app-orders stopped');

		this.server.close();
	}

}

module.exports = new App();
