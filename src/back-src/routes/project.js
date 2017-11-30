"use strict";
let express = require('express');
let db = require('../databaseConnect');

let router = express.Router();


function treatment(errorStatus, response, values,  rows) {
	if(errorStatus) response.status(400).send(err);
	else {
		if (rows.length != 0) {
			values.push({'result' : 'success', 'data' : rows});
		} else {
			values.push({'result' : 'error', 'msg' : 'No Results Found'});
		}
		response.setHeader('Content-Type', 'application/json');
		response.status(200).send(JSON.stringify(value));
	}
}

function checkUndefinedObject(object, fields) {
	let ok = true;
	for (let field in fields) {
		if (object[fields[field]] === undefined)
			ok = false;
	}
	return ok;
}

function sendError(res, reason) {
	res.status(400).send({ error: true, reason: reason });
	console.log(reason);
}

router.get('/projects/:userId', (req, res) => {
	let id = req.params.userId;
	db.query('SELECT * FROM User_Project WHERE id_user = ?',[id], (err, cols) => {
		let values = [];
		treatment(err,res,values,cols);
	});

});

router.get('/project/:userId/:id', (req, res) => {
	let id = req.params.id;
	let userId = req.param.userId;
	db.query('SELECT * FROM User_Project WHERE id_user = ? AND id_project = ?',[userId, id], (err, cols) => {
		let response = [];
		treatment(err,res,values,cols);
	});
});

router.post('/project', (req, res) => {
	res.contentType('application/json');
	if (checkUndefinedObject(req.body, ['name', 'description', 'git', 'begin', 'end', 'userId'])) {

		db.query('INSERT INTO Project(name, description, git, begin, end) VALUES (?,?,?,?,?)',
			[req.body.name, req.body.description, req.body.git, req.body.begin, req.body.end],
			(error, dbRes) => {
				if (error)
					sendError(res, 'Unable to query database');
				else {
					db.query('INSERT INTO User_Project(id_project, id_user) VALUES (?,?)',
						[dbRes.insertId, req.body.userId], (error) => {
						if (error)
							sendError(res, 'Unable to complete insertion');
						else
							res.status(200).send({insertId: dbRes.insertId});
						}
					);
				}
			}
		);
	} else
		sendError(res, 'Error: required parameters not set');
	/*if (typeof req.body.name !== 'undefined' && typeof req.body.begin !== 'undefined') {

		db.query('BEGIN; INSERT INTO Project VALUES(?,?,?,?); INSERT INTO User_Project VALUES(?,LAST_INSERT_ID()); COMMIT;',[req.body.name, req.body.description, req.body.git, req.body.begin, req.body.end, id], (err, result) => {
			treatment(err,res,response,"success");
		});
	}
	else {
		values.push({'result' : 'error', 'msg' : 'Missing field'});
		res.setHeader('Content-Type', 'application/json');
		res.send(200, JSON.stringify(values));
	}*/
});

router.patch('/project/:id', (req, res) => {
	let id = req.params.id;
	db.query('UPDATE Project SET name=?, description=?, git=?, begin=?, end=? WHERE id=?',
		[req.body.name,req.body.description, req.body.git, req.body.begin, req.body.end, id], (err, cols) => {
			let values = [];
			treatment(err,res,values, "success");
		});
});

router.delete('/project/:id', (req, res) => {
	let id = req.params.id;
	db.query("DELETE FROM Project WHERE id=?",[id], (err,count) => {
		let values = [];
		treatment(err, res, values, "success");

	})
});

module.exports = router;
