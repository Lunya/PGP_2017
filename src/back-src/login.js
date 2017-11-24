let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let bd = require('./databaseConnect');
let router = express.Router();

const secret = 'someSecretString';
const saltRounds = 8;
//let _userId = 0;
//let users = [];

/*function debugAddUser(username, password) {
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
debugAddUser('a', 'a');*/

/*bd.connect(err => {
	if (err) throw err;
	else {
		console.log('Connected to the database');

	}
});*/

/*bd.connect(err => {
	if (err) throw err;
	else {
		console.log('Connected to the database');
*/
router.post('/register', (req, res) => {
	res.contentType('application/json');
	bcrypt.genSalt(saltRounds, (err, salt) => {
		if (err)	res.send({error: err});
		else
			bcrypt.hash(req.body.password, salt, (err, password) => {
					if(err) throw err;
				bd.query("INSERT INTO User (name,password,mail) VALUES (?,?,?)",[req.body.username,password,req.body.mail], (error, result) => {
						if(err) throw err;
						console.log(result);
						/*
						ResultSetHeader {
backend_1   | app-0      |   fieldCount: 0,
backend_1   | app-0      |   affectedRows: 1,
backend_1   | app-0      |   insertId: 10,
backend_1   | app-0      |   info: '',
backend_1   | app-0      |   serverStatus: 2,
backend_1   | app-0      |   warningStatus: 0 }

						*/
						res.send({error: false, response:result})
				});
			});
	});
});


router.post('/login', (req, res) => {
	res.contentType('application/json');
	let resObj = {};
	bd.query("SELECT * FROM User WHERE name = ?",[req.body.username], (err, result, fields) => {
			if(err) throw err;
			let user = bcrypt.compareSync(req.body.password, result[0]['password']);
			if (user !== undefined) {
				let token = jwt.sign(
					{ id: user.id },
					secret,
					{ expiresIn: '1h' });
				resObj.token = token;
			} else
				resObj.error = 'Error';
				console.log(resObj);
				res.send(resObj);
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
