let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let db = require('./databaseConnect');

let router = express.Router();

const secret = 'someSecretString';
const saltRounds = 8;
let _userId = 0;
let users = [];

function debugAddUser(username, password) {
	"use strict";
	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (!err)
			bcrypt.hash(password, salt, (err, password) => {
				users.push({
					username: username,
					password: password,
					salt: salt,
					id: _userId++
				});
			});
	});
}
debugAddUser('john', 'doe');
debugAddUser('nyan', 'cat');

router.post('/register', (req, res) => {
	res.contentType('application/json');
	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (err)
			res.send({error: err});
		else
			bcrypt.hash(req.body.password, salt, (err, password) => {
				users.push({
					username: req.body.username,
					password: password,
					salt: salt,
					id: _userId++
				});
				res.send({error: false, users:users});
			});
	});
});

router.post('/connect', (req, res) => {
	let resObj = {};
	let user = users.find(u => u.username == req.body.username && u.password == bcrypt.hashSync(req.body.password, u.salt));
	if (user !== undefined) {
		let token = jwt.sign(
			{ id: user.id },
			secret,
			{ expiresIn: '1h' });
		resObj.token = token;
	} else
		resObj.error = 'Error';
	res.contentType('application/json');
	res.send(resObj);
});

function tokenVerifier(req, res, next) {
	let token = req.headers['x-access-token'];
	if (!token)
		return res.status(403).send({ auth: false, message: 'No token provided.' });
	jwt.verify(token, secret, (err, decoded) => {
		if (err)
			return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		req.userId = decoded.id;
		next();
	});
}

module.exports = {
	router: router,
	tokenVerifier: tokenVerifier
};
