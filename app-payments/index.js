require('@babel/register')({
	extends: './.babelrc',
	ignore: [/node_modules/]
});
require('dotenv-safe').config();

require('./app').start();
