import jwt from 'jsonwebtoken';

/*
{
	"id": "123",
	"name": "Jaroslav Shkarupilo",
	"email": "jshkarupilo@gmail.com",
	"iat": 2147483647
}
 */
const MOCKED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsIm5hbWUiOiJKYXJvc2xhdiBTaGthcnVwaWxvIiwiZW1haWwiOiJqc2hrYXJ1cGlsb0BnbWFpbC5jb20iLCJpYXQiOjIxNDc0ODM2NDd9.PYkGbU77qNE0h0z0NDwTOMtEizbVmlz7D1bZH1ilxtE';


export default class {

	static async processJWT(req, res, next) {
		const token = req.headers['authorization'] || MOCKED_TOKEN;
		if (token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					decoded = {};
				}
				[ 'id', 'name', 'email' ].forEach(i => {
					if (decoded[i]) {
						req.headers[`x-app-user-${i}`] = decoded[i];
					} else {
						delete req.headers[`x-app-user-${i}`];
					}
				});
				next();
			});
		} else {
			next();
		}
	}

}
