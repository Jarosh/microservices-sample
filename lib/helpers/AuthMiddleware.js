import * as HttpCode from './httpCodes';


export default class {

	static async isAuthorized(req, res, next) {
		try {
			const client = req.headers['x-app-user-id'];
			if (!client) {
				next(new HttpCode.Forbidden('No session found'));
				return;
			}
			req.session = { userId: client };
			next();
		} catch(exc) {
			console.error(exc);
			next(new HttpCode.UnexpectedError());
		}
	}

	static async isInternalInvocation(req, res, next) {
		try {
			const secret = req.headers['x-app-secret'];
			if (secret !== process.env.APP_SECRET) {
				next(new HttpCode.Forbidden('Access denied'));
				return;
			}
			next();
		} catch(exc) {
			console.error(exc);
			next(new HttpCode.UnexpectedError());
		}
	}

}
