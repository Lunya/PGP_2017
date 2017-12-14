const express = require('express');
const db = require('../databaseConnect');
const login = require('./login');
const router = express.Router();



function checkUndefinedObject(object, fields) {
	let ok = true;
	for (const field in fields) {
		if (object[fields[field]] === undefined)
			ok = false;
	}
	return ok;
}

function sendError(res, reason) {
	res.status(400).send({ error: true, reason: reason });
	// console.log(reason);
}

router.get('/project/:id', login.tokenVerifier, (req, res) => {
	res.contentType('application/json');


	db.query('SELECT id, name, description, url, begin, end FROM Project WHERE id=?', [req.params.id], (error, result) => {
		if (error) {
			sendError(res, 'Database error');
		} else {
			const  project = result[0];
			if (project) {
				res.send({
					id: project.id,
					name: project.name,
					description: project.description,
					url: project.url,
					begin: project.begin,
					end: project.end
				});
			} else
				sendError(res, 'No project selected');
		}
	});
});


router.get('/status/:userId/:idProject', login.tokenVerifier, (req, res) => {

	db.query('SELECT status FROM User_Project WHERE id_user = ? AND id_project = ?',[req.params.userId, req.params.idProject], (error, result) => {
		if (error)
			sendError(res, 'Database error');
		else {
			if (result) {
				res.send(
					result[0]
				);
			} else
				sendError(res, 'No project selected');
		}
	});
});

router.get('/:idProject',login.tokenVerifier, (req, res) => {
	res.contentType('application/json');
	db.query('SELECT id, name, description, url, begin, end, id_project, id_user, status FROM User_Project up INNER JOIN Project p ON up.id_project = p.id WHERE id_project = ?', [req.params.idProject], (error, result) => {
		if (error) {
			sendError(res, 'Database error');
		}
		else {
			let project = result[0];
			if (project) {
				res.send({
					id: project.id,
					name: project.name,
					description: project.description,
					url: project.url,
					begin: project.begin,
					end: project.end
				});
			} else
				sendError(res, 'No project selected');
		}
	});
});


router.post('/project', login.tokenVerifier, (req, res) => {
	res.contentType('application/json');
	if (checkUndefinedObject(req.body, ['name', 'description', 'url', 'begin', 'end', 'userId'])) {

		db.query('INSERT INTO Project(name, description, url, begin, end) VALUES (?,?,?,?,?)',
			[req.body.name, req.body.description, req.body.url, req.body.begin, req.body.end],
			(error, dbRes) => {
				if (error)
					sendError(res, 'Unable to query database');
				else {
					db.query('INSERT INTO User_Project(id_project, id_user, status) VALUES (?,?,?)',
						[dbRes.insertId, req.body.userId, 'OWNER'], (error) => {
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


router.patch('/project/:id', login.tokenVerifier, (req, res) => {
	if (checkUndefinedObject(req.body, ['name','description', 'url', 'begin', 'end'])) {

		db.query('UPDATE Project SET name=?, description=?, url=?, begin=?, end=? WHERE id=?',
		[req.body.name, req.body.description, req.body.url, req.body.begin, req.body.end, req.params.id], (error, dbRes) => {
			if (error)
				sendError(res, 'Unable to query database');
			else {
				res.status(200).send({
					insertId: dbRes.insertId
				});
			}
		});
	} else
		sendError(res, 'Error: required parameters not set');
});



router.delete('/project/:id', login.tokenVerifier, (req, res) => {
	db.query('DELETE FROM Project WHERE id = ?', [req.params.id], (error, dbRes) => {
		if (error)
			sendError(res, 'Unable to query database');
		else {
			res.status(200).send({
				error: false
			});
		}
	});
});


router.get('/projects/:id', login.tokenVerifier, (req, res) => {
	res.contentType('application/json');

	db.query('SELECT id, name, description, url, begin, end, id_project, id_user, status FROM User_Project up INNER JOIN Project p ON up.id_project = p.id WHERE id_user = ?', [req.params.id], (error, results) => {
		if (error) {
			console.log(error);
			sendError(res, 'Database error');
		}
		else {
			let projects = [];
			for (let i = 0; i < results.length; i++) {
				projects.push({
					id: results[i].id, name: results[i].name,
					description: results[i].description,
					url: results[i].url, begin: results[i].begin,
					end: results[i].end,
					status: results[i].status
				});
			}
			res.send(projects);
		}
	});
});

module.exports = router;
