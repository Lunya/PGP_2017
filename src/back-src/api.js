const express = require('express');
const databaseConnect = require('./databaseConnect');
const login = require('./routes/login');
const project = require('./routes/project');
const user = require('./routes/user');
const userstory = require('./routes/userstory');
const sprint = require('./routes/sprint');
const task = require('./routes/task');
const cors = require('cors');

const router = express.Router();

router.use(cors());

router.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.send('API Works');
	/*bd.query("INSERT INTO User (name,password,mail) VALUES('toto','toto','toto@toto')", (err,result) => {
		if (err) throw err;
		console.log(result);
		bd.query("SELECT * FROM User",(err,result,fields) => {
			if (err) throw err;
			console.log(result);
		})

	})*/

	//res.sendfile(__dirname + '/index.html');
});


router.get('/secured', login.tokenVerifier, (req, res) => {
	res.contentType('application/json');
	res.send('Secured OK');
});


const bd = databaseConnect();
bd.connect(err => {
	if (err) throw err;
	else {
		// console.log('Connected to the database');

		// exemple d'utilisation pour lister toutes les tables de la base de donnée courante
		router.get('/tables', (req, res) => {
			res.contentType('application/json');
			bd.query('SHOW TABLES', (error, tables) => {
				const result = {};
				if (tables.length === 0)
					res.end(JSON.stringify(result));
				else {
					let pendingRequests = tables.length;
					const content = [];
					for (const i in tables) {
						const table = tables[i]['Tables_in_pgp'];
						bd.query(`DESCRIBE ${table}`, (err, cols, fields) => {
							//pendingRequests += cols.length;
							const column = {};
							for (let j = 0; j < cols.length; j++) {
								for (let k = 0; k < fields.length; k++)
									column[fields[k].name] = cols[j][fields[k].name];
							}
							bd.query(`SELECT * FROM ${table}`, (e, c) => {
								column.database_content = c;
								content.push(column);
							}).on('end', () => {
								pendingRequests--;
								console.log(pendingRequests);
								if (pendingRequests === 0)
									res.end(JSON.stringify(content));
							});
						}).on('end', () => {
							/*pendingRequests--;
							console.log(pendingRequests);
							if (pendingRequests === 0)
								res.end(JSON.stringify(content));*/
						});
					}
				}
			});
		});

		router.use(login.router);
		router.use(project);
		router.use(user);
		router.use(userstory);
		router.use(sprint);
		router.use(task);
	}
});

module.exports = router;
