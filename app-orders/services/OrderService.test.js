import axios from 'axios';

import OrderService from '../services/OrderService';
import OrderModel from '../models/OrderModel';


describe('Service: Order', () => {

	const service = OrderService;
	const sandbox = sinon.createSandbox();
	const id_user = '12345';

	let random;

	beforeEach(() => {
		random = parseInt(Math.random() * 999999999);

		sandbox.stub(OrderModel, 'find').callsFake(criteria => {
			return Promise.resolve(criteria);
		});
		sandbox.stub(OrderModel, 'findById').callsFake(id => {
			return Promise.resolve({ _id: id });
		});
		sandbox.stub(OrderModel, 'remove').callsFake(criteria => {
			return Promise.resolve(criteria);
		});
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should make a new order object with passed id_user field', done => {
		const model = service.makeOrder(id_user);
		model.validate(err => {
			expect(err.errors._id).to.exist;
			expect(model.id_user).to.equal(id_user);
			expect(JSON.parse(JSON.stringify(model))).to.deep.equal({
				id_user: '12345',
				state: 'created',
				items: [],
				summary: ''
			});
			done();
		});
	});

	it('should try to find all orders matching given criteria', async () => {
		const res = await service.getAll(id_user);
		expect(res).to.deep.equal({
			id_user: id_user
		});
	});

	it('should try to find an orders for a given id', async () => {
		const res = await service.getById(random);
		expect(res).to.deep.equal({
			_id: random
		});
	});

	it('should try to save an order', async () => {
		const spy = sinon.spy();
		const order = service.makeOrder(id_user);
		const params = {
			items: ['qwerty'],
			summary: 'Lorem ipsum dolor sit amet...'
		};

		sandbox.stub(axios, 'create').callsFake(criteria => {
			return { post: (url) => Promise.resolve(url).then(spy) };
		});
		sandbox.stub(order, 'save').callsFake(() => {
			return Promise.resolve({ rand: random });
		});

		const res = await service.save(order, params);
		expect(res).to.deep.equal({
			rand: random
		});
		expect(spy).to.have.been.calledWith('/v1/payment?order=' + order._id);
	});

	it('should try to drop an order', async () => {
		const order = service.makeOrder(id_user);

		sandbox.stub(order, 'remove').callsFake(() => {
			return Promise.resolve({ rand: random });
		});

		const res = await service.drop(random, id_user);
		expect(res).to.deep.equal({
			_id: random,
			id_user: id_user,
			state: { $ne: 'delivered' }
		});
	});

});
