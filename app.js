const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./api/routes/users');
const sendEmailRoutes = require('./api/routes/send-email');

mongoose.connect(
	process.env.MONGO_URL,
	{ useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	// this example may be for some specific url
	// res.header('Access-Control-Allow-Origin', 'http://localhost:4200')
	res.header('Access-Control-Allow-Origin', '*');
	// could be all, passing *
	// res.header('Access-Control-Allow-Headers', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use('/api/users', userRoutes);
app.use('/api/sendemail', sendEmailRoutes);

app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status = 404;
	next(error);
});

app.use((error, req, res) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;
