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
	// console.log(reason);
}

router.get('/userstories/:id', login.tokenVerifier, (req, res) => {
	const db = databaseConnect();
	db.query('SELECT * FROM UserStory WHERE id_project = ?', [req.params.id], (error, results) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let userstories = [];
			for (let i = 0; i < results.length; i++) {
				userstories.push({
					id: results[i].id,
					description: results[i].description,
					difficulty: results[i].difficulty,
					priority: results[i].priority,
					state: results[i].state
				});
			}
			res.send(userstories);
		}
	});
});



router.post('/userstories/:id', login.tokenVerifier, (req, res) => {
	if (checkUndefinedObject(req.body, ['description', 'difficulty', 'priority', 'state'])) {
		const db = databaseConnect();
		db.query('INSERT INTO UserStory (id_project, description, difficulty, priority, state) VALUES (?,?,?,?,?)',
			[req.params.id, req.body.description, req.body.difficulty, req.body.priority, req.body.state], (error, dbRes) => {
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





router.patch('/userstory/:idproject/:id', login.tokenVerifier, (req, res) => {
	if (checkUndefinedObject(req.body, ['description', 'difficulty', 'priority', 'state'])) {
		const db = databaseConnect();
		db.query('UPDATE UserStory SET description=?, difficulty=?, priority=?, state=? WHERE id=? AND id_project=?',
			[req.body.description, req.body.difficulty, req.body.priority, req.body.state, req.params.id, req.params.idproject], (error, dbRes) => {
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

router.delete('/userstory/:idproject/:id', login.tokenVerifier, (req, res) => {
	const db = databaseConnect();
	db.query("DELETE FROM UserStory WHERE id_project=? AND id=?", [req.params.idproject, req.params.id], (error, dbRes) => {
		if (error)
			sendError(res, 'Unable to query database');
		else {
			res.status(200).send({
				error: false
			});
		}
	});
});


router.delete('/userstory/:idproject/:idsprint/:id', login.tokenVerifier, (req, res) => {
	const db = databaseConnect();
	db.query("DELETE FROM UserStory_Sprint WHERE id_sprint=? AND id_us=?", [req.params.idsprint, req.params.id], (error, dbRes) => {
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
