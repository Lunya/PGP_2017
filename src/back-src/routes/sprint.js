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
	res.status(400).send({
		error: true,
		reason: reason
	});
}

router.get('/sprints/:id', login.tokenVerifier, (req, res) => {
	res.contentType('application/json');
	db.query('SELECT id, id_project, begin, end FROM Sprint WHERE id_project = ?', [req.params.id], (error, result) => {
		if (error)
			sendError(res, 'Database error');
		else {
			const sprints = [];
			for (let i = 0; i < result.length; i++) {
				const sprint = result[i];
				sprints.push({
					id: sprint.id,
					begin: sprint.begin,
					end: sprint.end
				});
			}
			res.status(200).send(sprints);
		}
	});
});


router.post('/sprint', login.tokenVerifier, (req, res) => {
	res.contentType('application/json');
	if (checkUndefinedObject(req.body, ['idProject', 'end', 'begin'])) {

		db.query('INSERT INTO Sprint(id_project, begin, end) VALUES (?, ?, ?)', [req.body.idProject, new Date(req.body.begin), new Date(req.body.end)], (error, result) => {
			if (error)
				sendError(res, 'Database error');
			else {
				req.body.usSprint.forEach((us) => {
					db.query('INSERT INTO UserStory_Sprint (id_us, id_sprint) VALUES (?,?)', [us.id, result.insertId], (err, dbRes) => {
						if (err)
							sendError(res, 'Unable to query database');
					});
				});
				res.status(200).send({
					id: result.insertId
				});
			}
		});
	} else
		sendError(res, 'Error: required parameters not set');
});

router.get('/sprint/:idsprint', login.tokenVerifier, (req, res) => {
	const db = databaseConnect();
	db.query('SELECT id, visible_id, description, difficulty, priority, state FROM UserStory u INNER JOIN UserStory_Sprint u2 ON u.id=u2.id_us WHERE u2.id_sprint = ?', [req.params.idsprint], (error, results) => {
		if (error)
			sendError(res, 'Database error');
		else {
			const userstories = [];
			for (let i = 0; i < results.length; i++) {
				userstories.push({
					id: results[i].id,
					visibleId: results[i].visible_id,
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



router.delete('/sprint/:idproject/:id', login.tokenVerifier, (req, res) => {
	db.query('DELETE FROM Sprint WHERE id_project = ? AND id = ?', [req.params.idproject, req.params.id], (error, dbRes) => {
		if (error)
			sendError(res, 'Unable to query database');
		else {
			res.status(200).send({
				error: false
			});
		}
	});
});


router.patch('/sprint/:idproject/:id', login.tokenVerifier, (req, res) => {
	if (checkUndefinedObject(req.body, ['end', 'begin'])) {
		db.query('UPDATE Sprint SET begin=?, end =? WHERE id_project=? AND id=?', [req.body.begin, req.body.end, req.params.idproject, req.params.id], (err, dbRes) => {
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

module.exports = router;
