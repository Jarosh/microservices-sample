import axios from 'axios';

import PaymentService from '../services/PaymentService';


describe('Service: Payment', () => {

	const service = PaymentService;
	const sandbox = sinon.createSandbox();
	const orderId = 'qwerty';

	let random;

	beforeEach(() => {
		random = parseInt(Math.random() * 999999999);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should try to process an order', async () => {
		sandbox.stub(PaymentService, 'changeOrderStatus').callsFake(() => {
			return Promise.resolve();
		});

		const res = await service.process(orderId);
		expect(res).to.deep.equal({});
	});

	it('should try to change order status', async () => {
		const spy = sinon.spy();

		sandbox.stub(axios, 'create').callsFake(criteria => {
			return { put: (url, state) => Promise.resolve(url).then(spy) };
		});

		const res = await service.changeOrderStatus(orderId, 'delivered');

		expect(spy).to.have.been.calledWith('/v1/order/' + orderId);
	});

});
