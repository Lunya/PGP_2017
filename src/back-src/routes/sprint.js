let express = require('express');
let bd = require('../databaseConnect')

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
};

router.get('/sprints/:id', (req,res) => {
  let id = req.params.id;
  bd.query('SELECT * FROM Sprint WHERE id_project = ?', [id], (err, cols) => {
      let values = [];
      treatment(err,res,values,cols);
  });
});

router.post('/sprints/:id', (req,res) => {
  let id = req.params.id;
  let values = [];
  if (typeof req.body.id !== 'undefined' && req.body.begin !== 'undefined'){
    bd.query('INSERT INTO Sprint VALUES(?,?,?)',[id,req.body.begin,req.body.end], (err,result) => {
      treatment(err,res,response,"success");
    });
  }
  else {
    values.push({'result' : 'error' : 'msg' : 'Missing field'});
    res.setHeader('Content-Type', 'application/json');
    res.send(200, JSON.stringify(values));
  }
});

router.get('/sprint/:idProject/:idSprint', (req,res) => {
  let id_project = req.params.idProject;
  let id = req.params.idSprint;
  bd.query('SELECT * FROM Sprint WHERE id_project = ? AND id = ?',[id_project, id], (err, result) => {
    let values = [];
    treatment(err, res, values, cols);
  });
});

router.delete('/sprint/:idProject/:idSprint', (req,res) => {
  let id_project = req.params.idProject;
  let id = req.params.idSprint;
  bd.query('DELETE * FROM Sprint WHERE id_project = ? AND id = ?',[id_project, id], (err, result) => {
    treatment(err, res, response, "success");
  });
});

router.post('/sprints/:idProject/:idSprint', (req,res) => {
  let id_project = req.params.idProject;
  let id = req.params.idSprint;
  let values = [];
  if (typeof req.body.id !== 'undefined' && req.body.id_project !== 'undefined' && req.body.begin){
    bd.query('INSERT INTO Sprint VALUES(?,?,?)',[id,req.body.begin,req.body.end], (err,result) => {
      treatment(err,res,response,"success");
    });
  }
  else {
    values.push({'result' : 'error' : 'msg' : 'Missing field'});
    res.setHeader('Content-Type', 'application/json');
    res.send(200, JSON.stringify(values));
  }
});

module.exports  = router;
