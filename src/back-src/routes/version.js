let express = require('express');
let databaseConnect = require('../databaseConnect')

let router = express.Router();


function checkUndefinedObject(object, fields) {
	let ok = true;
	for (let field in fields) {
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
	console.log(reason);
}

router.get('/version/:idProject', (req, res) => {
	res.contentType('application/json');
	let db = databaseConnect();
	db.query('SELECT id, id_project, num_version_maj, num_version_min, link_doc, link_test, link_source, link_build FROM Version WHERE id_project = ?', [req.params.idProject], (error, result) => {
		if (error)
			sendError(res, 'Database error');
		else {
			let versions = [];
			for (let i = 0; i < result.length; i++) {
				let version = result[i];
				versions.push({
					id: version.id,
					num_version_maj: version.num_version_maj,
					num_version_min: version.num_version_min,
          link_doc: version.link_doc,
          link_test: version.link_test,
          link_source: version.link_source,
          link_build: version.link_build
				});
			}
			res.status(200).send(versions);
		}
	});
});


router.post('/version/:idProject', (req, res) => {
	res.contentType('application/json');
	if (checkUndefinedObject(req.body, ['versionMaj', 'versionMin', 'linkSrc', 'linkBld', 'linkDoc', 'linkTst'])) {
		let db = databaseConnect();
		db.query('INSERT INTO Version(id_project, num_version_maj, num_version_min, link_source, link_build, link_test, link_doc) VALUES (?, ?, ?, ?, ?, ?, ?)', [req.params.idProject, req.body.versionMaj, req.body.versionMin, req.body.linkSrc, req.body.linkBld, req.body.linkTst, req.body.linkDoc], (error, result) => {
			if (error){
				sendError(res, 'Database error');
			}
			else {
				res.status(200).send({
					id: result.insertId
				});
			}
		});
	} else
		sendError(res, 'Error: required parameters not set');
});




router.delete('/version/:idProject/:idVersion', (req, res) => {
	let db = databaseConnect();
	db.query('DELETE FROM Version WHERE id_project = ? AND id = ?', [req.params.idProject, req.params.idVersion], (error, dbRes) => {
		if (error)
			sendError(res, 'Unable to query database');
		else {
			res.status(200).send({
				error: false
			});
		}
	});
});


router.patch('/version/:idProject/:idVersion', (req, res) => {
	if (checkUndefinedObject(req.body, ['end', 'begin'])) {
		let db = databaseConnect();
		db.query('UPDATE Version SET num_version_maj=?, num_version_min=?, link_source=?, link_build=?, link_test=?, link_doc=? WHERE id_project=? AND id=?', [req.body.num_version_maj, req.body.num_version_min, req.body.link_source, req.body.link_build, req.body.link_test ,req.body.link_doc, req.params.idProject, req.params.idVersion], (err, dbRes) => {
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
