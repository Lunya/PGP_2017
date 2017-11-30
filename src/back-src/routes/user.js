let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let bd = require('../databaseConnect');

let router = express.Router();

function treatment(err, response, values,  rows) {
	if(err) response.status(400).send(values);
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

router.post('/user', (req, res) => {
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

router.patch('/:id', (req, res) => {
	let iduser = req.params.id;
	bd.query('UPDATE User SET name=?, password=?, mail=?, salt=? WHERE id=?',[req.body.name, req.body.password,req.body.mail, req.body.salt, iduser], (err, cols) => {
		let values = [];
		treatment(err,res,values, "success");

	});
});

router.delete('/user/:id', (req, res) => {
	let id = req.params.id;
	bd.query("DELETE FROM User WHERE id=?",[id], (err,count) => {
		let values = [];
		treatment(err, res, values, "success");

	})
});

module.exports = router;
