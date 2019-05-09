import * as HttpCode from './httpCodes';


export default class {

	static isHttpError(error, req, res, next) {
		if (!(error instanceof HttpCode.ApiError)) {
			error = new HttpCode.UnexpectedError(error.message || 'Server error');
		}
		res.status(error.code === 204 ? 400 : error.code).json(error.toJSON());
	}

}
