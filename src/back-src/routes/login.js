let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let bd = require('../databaseConnect');
let router = express.Router();

const secret = 'someSecretString';
const saltRounds = 8;

router.post('/register', (req, res) => {
	res.contentType('application/json');
	bcrypt.hash(req.body.password, saltRounds, (err, password) => {
		if (!err) {
			bd.query("INSERT INTO User (name,password,mail) VALUES (?,?,?)", [req.body.name, password, req.body.email], (error, result) => {
				if (err) throw err;
				console.log(result);
				res.send({
					error: false
				});
			});
		} else
			res.send({
				error: err
			});
	});
});


router.post('/login', (req, res) => {
	res.contentType('application/json');
	bd.query("SELECT * FROM User WHERE mail = ?", [req.body.email], (err, result, fields) => {
		if (err) throw err;
		if (result[0] != undefined) {
			bcrypt.compare(req.body.password, result[0]['password'])
				.then(match => {
					if (match) {
						let token = jwt.sign({
								id: result[0]['id'],
								email: result[0]['mail']
							},
							secret, {
								expiresIn: '1h'
							});

						bd.query("SELECT * FROM Project WHERE id IN (SELECT id_project FROM User_Project WHERE id_user= ?)", [result[0]['id']], (err, result, fields) => {
							if (err) throw err;
							res.status(200).json({
								error: false,
								token: token
							});
						});
					} else
						res.status(400).json({
							error: true
						});
				});

		} else {
			res.status(400).json({
				error: true
			});
		}
	});
});

function tokenVerifier(req, res, next) {
	let token = req.headers['x-access-token'];
	if (!token)
		return res.status(403).send({
			auth: false,
			message: 'No token provided.'
		});
	jwt.verify(token, secret, (err, decoded) => {
		if (err)
			return res.status(500).send({
				auth: false,
				message: 'Failed to authenticate token.'
			});
		req.userId = decoded.id;
		next();
	});
}

module.exports = {
	router: router,
	tokenVerifier: tokenVerifier
};
