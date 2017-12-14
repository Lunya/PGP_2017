const express = require('express');
const databaseConnect = require('../databaseConnect');
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
	console.log(reason);
}


router.get('/tasks/:id', login.tokenVerifier, (req, res) => {
	const db = databaseConnect();
	db.query('SELECT * FROM Task WHERE id_sprint = ?', [req.params.id], (error, results) => {
		if (error)
			sendError(res, 'Database error');
		else {
			const tasks = [];
			for (let i = 0; i < results.length; i++) {
				tasks.push({
					id: results[i].id,
					description: results[i].description,
					developer: results[i].developer,
					state: results[i].state
				});
			}
			res.send(tasks);
		}
	});
});

router.get('/tasks/:idproject/:developerName', login.tokenVerifier, (req, res) => {
	const db = databaseConnect();
	db.query('SELECT * FROM Task WHERE developer = ?', [req.params.developerName], (error, results) => {
		if (error)
			sendError(res, 'Database error');
		else {
			const tasks = [];
			for (let i = 0; i < results.length; i++) {
				tasks.push({
					id: results[i].id,
					id_sprint: results[i].id_sprint,
					description: results[i].description,
					developer: results[i].developer,
					state: results[i].state
				});
			}
			res.send(tasks);
		}
	});
});

/*router.get('/tasks/:idsprint/:id', (req, res) => {
	db.query('SELECT * FROM Task WHERE id_sprint = ?', [req.params.id], (error, results) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let tasks = [];
			for (let i = 0; i < results.length; i++) {
				tasks.push({
					id: results[i].id,
					description: results[i].description,
					developer: results[i].developer,
					state: results[i].state
				});
			}
			res.send(tasks);
		}
	});
});*/


router.post('/tasks/:id', login.tokenVerifier, (req, res) => {
	if (checkUndefinedObject(req.body, ['description', 'developer', 'state'])) {
		const db = databaseConnect();
		db.query('INSERT INTO Task (id_sprint, description, developer, state) VALUES (?,?,?,?)',
			[req.params.id, req.body.description, req.body.developer, req.body.state], (error, dbRes) => {
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


router.patch('/task/:idsprint/:id' ,login.tokenVerifier, (req, res) => {
	if (checkUndefinedObject(req.body, ['description', 'developer', 'state'])) {
		const db = databaseConnect();
		db.query('UPDATE Task SET description = ?, developer=?, state = ? WHERE id_sprint = ? AND id = ? ',
			[req.body.description, req.body.developer, req.body.state, req.params.idsprint, req.params.id], (error, dbRes) => {
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

router.delete('/task/:idsprint/:id', login.tokenVerifier, (req, res) => {
	const db = databaseConnect();
	db.query("DELETE FROM Task WHERE id_sprint = ? AND id = ?", [req.params.idsprint, req.params.id], (error, dbRes) => {
		if (error)
			sendError(res, 'Unable to query database');
		else {
			res.status(200).send({
				error: false
			});
		}
	});
});

module.exports = router;
