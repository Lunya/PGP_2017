let express = require('express');
let bd = require('./databaseConnect');
let login = require('./routes/login');
let project = require('./routes/project');
let user = require('./routes/user');
let userstory = require('./routes/userstory');
let cors = require('cors');

let router = express.Router();

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

bd.connect(err => {
	if (err) throw err;
	else {
		console.log('Connected to the database');

		// exemple d'utilisation pour lister toutes les tables de la base de donnée courante
		router.get('/tables', (req, res) => {
			res.setHeader('Content-Type', 'application/json');
			bd.query('SHOW TABLES', (error, tables, fields) => {
				let result = {};
				for (let i = 0; i < tables.length; i++) {
					let table = tables[i][fields[i].name];
					let content = [];
					bd.query(`DESCRIBE ${table}`, (err, cols, fields) => {
						for (let j = 0; j < cols.length; j++) {
							let column = {};
							for (let k = 0; k < fields.length; k++)
								column[fields[k].name] = cols[j][fields[k].name];
							content.push(column);
						}
					}).on('end', () => {
						res.end(JSON.stringify(result));
					});
					result[table] = content;
				}
			});
		});

		router.use(login.router);
		router.use(project);
		router.use(user);
		router.use(userstory);
	}
});

module.exports = router;
