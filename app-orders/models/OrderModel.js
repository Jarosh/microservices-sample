import moment from 'moment';
import mongoose from 'mongoose';

const { Schema } = mongoose;

/**
 * @swagger
 * definitions:
 *   Order:
 *     allOf:
 *       - $ref: '#/definitions/Order_R'
 *       - $ref: '#/definitions/Order_RW'
 *   Order_R:
 *     properties:
 *       id_user:
 *         type: string
 *         required: true
 *       state:
 *         type: string
 *         enum: [ created, confirmed, delivered, cancelled ]
 *         required: true
 *       created_at:
 *         type: string
 *       updated_at:
 *         type: string
 *   Order_RW:
 *     properties:
 *       items:
 *         type: array
 *         items:
 *           type: string
 *       summary:
 *         type: string
 */

const orderSchema = new Schema({
	_id: {
		required: true,
		type: Schema.Types.ObjectId
	},
	id_user: {
		required: true,
		type: String,
		index: true,
		maxlength: 64,
		trim: true
	},
	state: {
		required: true,
		type: String,
		index: true,
		enum: [ 'created', 'confirmed', 'delivered', 'cancelled' ],
		default: 'created'
	},
	items: [
		{ type: String },
	],
	summary: {
		type: String,
		trim: true
	},
	created_at: Date,
	updated_at: Date
}, {
	collection: 'Order',
	versionKey: false
});

export default mongoose.model('Order', orderSchema, 'Order');
