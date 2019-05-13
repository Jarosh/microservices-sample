import request from 'supertest';
import moment from 'moment';

import App from '../app';
import OrderController from './OrderController';
import OrderService from '../services/OrderService';


const app = App.app;


describe('API /v1/order/(...)', () => {

	const sandbox = sinon.createSandbox();
	const reqAppUserId = '123';
	const reqOrderId = 'qwerty';
	const resContentType = 'application/json; charset=utf-8';

	const resBody = [
		{
			ind: 0,
			val: reqAppUserId
		},
		{
			ind: 1,
			val: reqAppUserId
		},
		{
			ind: 2,
			val: reqAppUserId
		}
	];

	beforeEach(() => {
		sandbox.stub(OrderService, 'getAll').callsFake(userId => {
			return Promise.resolve((new Array(3)).fill().map((e, i) => ({ ind: i, val: userId })));
		});
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('GET / - should fail for unauthorized user', done => {
		request(app)
			.get('/')
			.set('Accept', 'application/json')
			.expect(401)
			.expect('Content-Type', resContentType, done);
	});

	it('GET / - should list all orders of an authorized user', done => {
		request(app)
			.get('/')
			.set({ 'Accept': 'application/json', 'X-App-User-Id': reqAppUserId })
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.header['content-type']).to.equal(resContentType);
				expect(res.body).to.be.deep.equal(resBody);
				done();
			});
	});

	it('GET /{id} - should fail for unauthorized user', done => {
		request(app)
			.get('/' + reqOrderId)
			.set('Accept', 'application/json')
			.expect(401)
			.expect('Content-Type', resContentType, done);
	});

	// ... TODO

});
