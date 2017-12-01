let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let bd = require('../databaseConnect');

let router = express.Router();
const saltRounds = 8;

function sendError(res, reason) {
	res.status(400).send({ error: true, reason: reason });
	console.log(reason);
}

function treatment(errorStatus, response, values,  rows) {
	if(errorStatus) response.status(400).send(errorStatus);
	else {
		if (rows.length != 0) {
			values.push({'result' : 'success', 'data' : rows});
		} else {
			values.push({'result' : 'error', 'msg' : 'No Results Found'});
		}
		response.setHeader('Content-Type', 'application/json');
		response.status(200).send(JSON.stringify(values));
	}
};

router.get('/user', (req, res) => {
	if (typeof req.body.name !== 'undefined' && typeof req.body.password !== 'undefined') {
		bd.query('SELECT * FROM User WHERE name = ? AND password=? ',[req.body.name, req.body.password], (err,result) => {
			let value = [];
			treatment(err,res, value,result);
		})
	}
	else {
		values.push({'result' : 'error', 'msg' : 'Missing field'});
		res.setHeader('Content-Type', 'application/json');
		res.send(200, JSON.stringify(values));
	}
});


router.patch('/user/:id', (req, res) => {
	let iduser = req.params.id;
	bcrypt.hash(req.body.password, saltRounds, (err, password) => {
		if (!err) {
				bd.query("UPDATE User SET name=?, password=?, mail=? WHERE id=? ",[req.body.name,password,req.body.email, iduser], (error, result) => {
						if(error) throw error;
						else{
							let values = [];
							treatment(err, res, values, "success");
						}
				});
				res.send({ error: false });
		} else
				res.send({ error: err });
	});
});

router.delete('/user/:id', (req, res) => {
	let id = req.params.id;
	bd.query("DELETE FROM User WHERE id=?",[id], (err,count) => {
		let values = [];
		treatment(err, res, values, "success");

	})
});

router.get('/users/:idProject', (req, res) => {
	res.contentType('application/json');
	bd.query('SELECT User_Project.id_project, User_Project.id_user, User.id, User.mail, User.name FROM User_Project INNER JOIN User ON User_Project.id_user = User.id AND User_Project.id_project = ?', [req.params.idProject], (error, result) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let users = [];
			for (let i = 0; i < result.length; i++) {
				users.push({
					id: result[i]['id'],
					name: result[i]['name'],
					email: result[i]['mail']
				});
			}
			res.status(200).send(users);
		}
	});
});

module.exports = router;
