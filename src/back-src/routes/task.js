let express = require('express');
let bd = require('../databaseConnect')

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

router.get('/tasks/:idSprint', (req, res) => {
  let idSprint = req.params.idSprint;
  bd.query('SELECT * FROM Task WHERE id_sprint = ?',[idSprint], (err,cols) => {
    let values = [];
    treatment(err,res,values,cols)
  })
});

router.post('/tasks/:idSprint', (req, res) => {
  let id_sprint = req.params.idSprint;
  let values = [];
  if (typeof req.body.description !== 'undefined'){
    bd.query('INSERT INTO Task VALUES(?,?)',[id_sprint,req.body.description],(err,result) => {
      treatment(err,result,values,"success")
    });
  }
  else{
    values.push({'result' : 'error', 'msg' : 'Missing field'});
    res.setHeader('Content-Type', 'application/json');
    res.send(200, JSON.stringify(values));
  }
});

router.patch('/tasks/:idSprint/:idTask', (req,res) => {
  let id_sprint = req.params.idSprint;
  let id = req.params.idTask;
  bd.query('UPDATE Task SET description = ? state = ? WHERE id = ? AND id_sprint = ? ',
            [req.body.description, req.body.state,id,id_sprint], (err, cols) => {
      let values = [];
      treatment(err,res,values,"success");
  });
});

router.delete('/tasks/:idSprint/:idTask', (req,res) => {
  let id_sprint = req.params.idSprint;
  let id = req.params.idTask;
  bd.query('DELETE FROM Task WHERE id_sprint = ? AND id = ?', [id_sprint,id], (err,count) => {
    if(err) throw err;
    else{
      let values = [];
      treatment(err,res,values,"success");
    }
  });
});

module.exports  = router;