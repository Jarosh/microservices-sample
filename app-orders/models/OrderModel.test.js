import mongoose from 'mongoose';

import OrderModel from '../models/OrderModel';


describe('Model: Order', () => {

	let order = new OrderModel({});

	beforeEach(() => {
		order = new OrderModel({});
	});

	it('_id: should be invalid when is empty', done => {
		order.validate(err => {
			expect(err.errors._id).to.exist;
			done();
		});
	});

	it('_id: should be valid when is set', done => {
		const id = mongoose.Types.ObjectId();
		order._id = id;
		order.validate(err => {
			expect(err && err.errors._id).to.not.exist;
			expect(order._id).to.equal(id);
			done();
		});
	});

	it('id_user: should be invalid when is empty', done => {
		order.validate(err => {
			expect(err.errors.id_user).to.exist;
			done();
		});
	});

	it('id_user: should be valid when is a valid string', done => {
		const id_user = '12345';
		order.id_user = id_user;
		order.validate(err => {
			expect(err && err.errors.id_user).to.not.exist;
			expect(order.id_user).to.equal(id_user);
			done();
		});
	});

	it('id_user: should be valid when is a valid number', done => {
		const id_user = 12345;
		order.id_user = id_user;
		order.validate(err => {
			expect(err && err.errors.id_user).to.not.exist;
			expect(order.id_user).to.not.equal(id_user);
			expect(order.id_user).to.equal(id_user.toString());
			done();
		});
	});

	it('state: should be valid and have a default value', done => {
		order.validate(err => {
			expect(err && err.errors.state).to.not.exist;
			expect(order.state).to.equal('created');
			done();
		});
	});

	it('state: should be valid when a valid value assigned', done => {
		const state = 'delivered';
		order.state = state;
		order.validate(err => {
			expect(err && err.errors.state).to.not.exist;
			expect(order.state).to.equal(state);
			done();
		});
	});

	it('state: should be invalid when an invalid value assigned', done => {
		const state = 'qwerty';
		order.state = state;
		order.validate(err => {
			expect(err && err.errors.state).to.exist;
			expect(order.state).to.equal(state);
			done();
		});
	});

	it('items: should be valid and have a default value', done => {
		order.validate(err => {
			expect(err.errors.items).to.not.exist;
			expect(order.items).to.deep.equal([]);
			done();
		});
	});

	it('items: should be valid and have an assigned value', done => {
		const items = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
		order.items = items;
		order.validate(err => {
			expect(err.errors.items).to.not.exist;
			expect(order.items).to.deep.equal(items);
			done();
		});
	});

	it('summary: should be valid and have a default value', done => {
		order.validate(err => {
			expect(err.errors.summary).to.not.exist;
			expect(order.summary).to.equal(undefined);
			done();
		});
	});

	it('summary: should be valid and have an assigned value', done => {
		const summary = 'lorem ipsum dolor sit amet';
		order.summary = summary;
		order.validate(err => {
			expect(err.errors.summary).to.not.exist;
			expect(order.summary).to.deep.equal(summary);
			done();
		});
	});

	it('created_at: should be valid and have an assigned value', done => {
		const created_at = new Date();
		order.created_at = created_at;
		order.validate(err => {
			expect(err.errors.created_at).to.not.exist;
			expect(order.created_at.toISOString()).to.equal(created_at.toISOString());
			done();
		});
	});

	it('updated_at: should be valid and have an assigned value', done => {
		const updated_at = new Date();
		order.updated_at = updated_at;
		order.validate(err => {
			expect(err.errors.updated_at).to.not.exist;
			expect(order.updated_at.toISOString()).to.equal(updated_at.toISOString());
			done();
		});
	});

});
