const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
