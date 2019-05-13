import request from 'supertest';

import App from '../app';
import PaymentService from '../services/PaymentService';


const app = App.app;


describe('API /v1/payment/(...)', () => {

	const sandbox = sinon.createSandbox();
	const reqAppSecret = process.env.APP_SECRET;
	const reqAppUserId = '123';
	const reqOrderId = 'qwerty';
	const resContentType = 'application/json; charset=utf-8';

	afterEach(() => {
		sandbox.restore();
	});

	it('POST / - should fail for unauthorized user', done => {
		request(app)
			.get('/')
			.set('Accept', 'application/json')
			.expect(401)
			.expect('Content-Type', resContentType, done);
	});

	it('POST / - should fail on processing', done => {
		sandbox.stub(PaymentService, 'process').callsFake(orderId => {
			return Promise.reject(orderId);
		});
		request(app)
			.post('/')
			.set({ 'Accept': 'application/json', 'X-App-Secret': reqAppSecret, 'X-App-User-Id': reqAppUserId })
			.end((err, res) => {
				expect(res.status).to.equal(500);
				expect(res.header['content-type']).to.equal(resContentType);
				expect(res.body).to.be.deep.equal({
					error: {
						code: 500,
						data: null,
						http: 500,
						text: 'Processing failed'
					}
				});
				done();
			});
	});

	it('POST / - should succeed on processing', done => {
		sandbox.stub(PaymentService, 'process').callsFake(orderId => {
			return Promise.resolve(orderId);
		});
		request(app)
			.post('/')
			.set({ 'Accept': 'application/json', 'X-App-Secret': reqAppSecret, 'X-App-User-Id': reqAppUserId })
			.expect(200)
			.expect('Content-Type', resContentType, done);
	});

});
