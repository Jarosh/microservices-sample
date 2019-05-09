import express from 'express';

import ApiAdapter from '~/helpers/ApiAdapter';


export default ApiAdapter.setHandlers(
	express.Router(),
	process.env.API_ORDERS,
	/^\/.*/,
	[ 'GET', 'POST', 'PUT', 'DELETE' ]
);
