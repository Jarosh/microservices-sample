import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from '~/routes';


const { PORT } = process.env;


class App {

	constructor() {
		this.app = express();
		this.app.use(cors());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(routes);
	}

	start() {
		this.server = this.app.listen(PORT, () => console.log('api-gateway started on port:', PORT));

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
		console.info('api-gateway stopped');

		this.server.close();
	}

}

module.exports = new App();
