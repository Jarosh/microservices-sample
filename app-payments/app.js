import express from 'express';
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

	start() {
		this.server = this.app.listen(PORT, () => console.log('app-orders started on port:', PORT));

		// Stop the service from accepting new connections
		process.on('SIGINT', () => {
			console.info('SIGINT signal received.');
			
			this.server.close(function(err) {
				if (err) {
					console.error(err);
				}
			});
		});
	}

	stop() {
		console.info('app-orders stopped');

		this.server.close();
	}

}

module.exports = new App();
