/**
 * @swagger
 * definitions:
 *   _ApiError:
 *     properties:
 *       error:
 *         type: object
 *         properties:
 *           http:
 *              type: number
 *              description: Duplicates HTTP response status code.
 *           code:
 *              type: number
 *              description: Custom error code if any, duplicates HTTP response status code otherwise.
 *           text:
 *              type: string
 *              description: Error description.
 *           data:
 *              type: {}
 *              description: Optional payload.
 */
export class ApiError extends Error {
	toJSON() {
		return {
			error: {
				http: this.http,
				code: this.code,
				text: this.text,
				data: this.data || null
			}
		};
	}
}


export class Forbidden extends ApiError {
	constructor(text) {
		super();
		this.http = this.code = 401;
		this.text = text || 'Not authorized to perform this action';
	}
}


export class NotFound extends ApiError {
	constructor(model) {
		super();
		this.http = this.code = 404;
		this.text = `No query results for model ${model}`;
	}
}


export class BadRequest extends ApiError {
	constructor(text) {
		super();
		this.http = this.code = 400;
		this.text = text || 'Malformed request body';
	}
}


export class ValidationFailed extends BadRequest {
	constructor(fields) {
		super('Validation failed');
		this.data = fields;
	}
}


export class UnexpectedError extends ApiError {
	constructor(text) {
		super();
		this.http = this.code = 500;
		this.text = text || 'Unexpected error occured';
	}
}
