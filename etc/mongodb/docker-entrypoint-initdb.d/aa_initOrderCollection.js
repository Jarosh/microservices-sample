db.createCollection('Order', {
	validator: {
		$jsonSchema: {
			bsonType: 'object',
			required: [ 'id_user', 'state', 'created_at', 'updated_at' ],
			properties: {
				id_user: {
					bsonType: 'string',
					description: 'must be a string and is required'
				},
				state: {
					enum: [ 'created', 'cancelled', 'confirmed', 'delivered' ],
					description: 'must contain a supported value'
				},
				items: {
					bsonType: 'array'
				},
				summary: {
					bsonType: 'string'
				},
				created_at: {
					bsonType: 'date',
					description: 'must be a date and is required'
				},
				updated_at: {
					bsonType: 'date',
					description: 'must be a date and is required'
				}
			}
		}
	}
});

db.Order.createIndex( { id_user: 1 }, { name: 'id_user_' } );
db.Order.createIndex( { state: 1 }, { name: 'state_' } );
