import axios from 'axios';
import querystring from 'querystring';


export default class {

	static create(base, headers = {}) {
		return axios.create({
			baseURL: base,
			headers: { common: headers }
		});
	}

	static handle(base) {
		return (req, res) => {
			const qs = req.query && querystring.stringify(req.query) || null;
			console.log(`API Gateway: ${req.method.toUpperCase()} ${base}${req.path}${qs ? `?${qs}` : ''}`);
			this.create(base, req.headers)[req.method.toLowerCase()](`${req.path}${qs ? `?${qs}` : ''}`, req.body)
				.then(response => {
					res.send(response.data)
				})
				.catch(error => {
					res.status(error.response.status).send(error.response.data);
				});
		};
	}

	static setHandlers(router, base, path, methods) {
		methods.forEach(m => {
			if (router && router[m.toLowerCase()] instanceof Function) {
				router[m.toLowerCase()](path, this.handle(base));
			}
		});
		return router;
	}

}
