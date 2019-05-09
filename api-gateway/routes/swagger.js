import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';


const swaggerDoc = swaggerJSDoc({
	swaggerDefinition: {
		info: {
			title: 'Microservice Sample',
			version: '1.0.0',
			description: 'Jarosh\'s Sample Microservice API'
		},
		host: 'localhost:8081',
		basePath: '/'
	},
	apis: [
		'../lib/**/*.js',
		'../app-orders/models/*.js',
		'../app-orders/controllers/*.js',
		'../app-payments/models/*.js',
		'../app-payments/controllers/*.js',
	]
});

const router = express.Router();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

router.get('/swagger.json', (req, res) => {
	res.send(swaggerDoc);
});

export default router;
