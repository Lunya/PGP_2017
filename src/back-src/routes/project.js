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

router.get('/project/:id', (req, res) => {
	res.contentType('application/json');
	db.query('SELECT id, name, description, git, begin, end FROM Project WHERE id=?', [req.params.id], (error, result) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let project = result[0];
			if (project) {
				res.send({
					name: project.name,
					description: project.description,
					git: project.git,
					begin: project.begin,
					end: project.end
				});
			} else
				sendError(res, 'No project selected');
		}
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

router.get('/projects/:id', (req, res) => {
	res.contentType('application/json');
	db.query('SELECT id, name, description, git, begin, end, id_project, id_user FROM User_Project INNER JOIN Project ON id_project = id WHERE id_user = ?', [req.params.id], (error, results) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let projects = [];
			for (let i = 0; i < results.length; i++) {
				projects.push({
					id: results[i].id, name: results[i].name,
					description: results[i].description,
					git: results[i].git, begin: results[i].begin,
					end: results[i].end
				});
			}
			res.send(projects);
		}
	});
});

module.exports = router;
