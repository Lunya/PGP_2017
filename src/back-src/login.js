"use strict";
let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

let router = express.Router();

const secret = 'someSecretString';
const saltRounds = 8;
let _userId = 0;
let users = [];

function debugAddUser(username, password) {
	"use strict";
	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (!err)
			bcrypt.hash(password, salt, (err, cryptedPassword) => {
				users.push({
					username: username,
					password: cryptedPassword,
					salt: salt,
					id: _userId++
				});
				let user = users.find(u => bcrypt.compareSync(password, u.password));
				console.log(
					user,
					bcrypt.compareSync(password, users[users.length-1].password));
			});
	});
}
debugAddUser('john', 'doe');
debugAddUser('nyan', 'cat');
debugAddUser('a', 'a');

router.post('/register', (req, res) => {
	res.contentType('application/json');
	bcrypt.hash(req.body.password, saltRounds, (err, password) => {
		if (!err) {
			users.push({
				email: req.body.email,
				name: req.body.name,
				password: password,
				id: _userId++
			});
			res.send({ error: false });
		} else
			res.send({ error: err });
	});
});

router.post('/login', (req, res) => {
	res.contentType('application/json');
	let user = users.find(u => u.email === req.body.email);
	bcrypt.compare(req.body.password, user.password)
		.then(match => {
			if (match) {
				let token = jwt.sign(
					{ id: user.id, email: user.email },
					secret,
					{ expiresIn: '1h' });
				res.send({ error: false, token: token });
			} else
				res.send({ error: true });
		});
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
