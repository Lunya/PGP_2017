let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let db = require('../databaseConnect');

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


router.get('/userstories/:id', (req, res) => {
	let id = req.params.id;
	bd.query('SELECT * FROM UserStory WHERE id_project = ?',[id], (err, cols) => {
		let values = [];
		treatment(err,res,values,cols);
	});
});

router.post('/userstories/:id', (req, res) => {
	let id_project = req.params.id;
	let values = [];
	if (typeof req.body.idProject !== 'undefined' && req.body.description !== 'undefined') {

		bd.query('INSERT INTO UserStory VALUES(?,?,?,?)',[id_project,req.body.description, req.body.diff, req.body.prio], (err, result) => {
			treatment(err,res,response,"success");
		});
	}
	else {
		values.push({'result' : 'error', 'msg' : 'Missing field'});
		res.setHeader('Content-Type', 'application/json');
		res.send(200, JSON.stringify(values));
	}
});

router.patch('/userstory/:idproject/:idus', (req, res) => {
	let idproject = req.params.idproject;
	let idus = req.params.idus;
	bd.query('UPDATE UserStory SET description=? WHERE id_project=? AND id=?',[req.body.description,idprojet,idus], (err, cols) => {
		let values = [];
		treatment(err,res,values, "success");

	});
});

router.delete('/userstory/:idproject/:id', (req, res) => {
	let idproject = req.params.idprojet;
	let id = req.params.id;
	bd.query("DELETE FROM UserStory WHERE id_project=? AND id=?",[idproject,id], (err,count) => {
		if(err) throw err;
		else {
			let values = [];
			treatment(err, res, values, "success");
		}
	});
});

module.exports = router;
