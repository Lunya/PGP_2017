let express = require('express');
let mysql = require('mysql');

let router = express.Router();

let bd = mysql.createConnection({
	host:		process.env.DB_SERVER_HOST,
	user:		process.env.DB_SERVER_USER,
	password:	process.env.DB_SERVER_PASSWORD,
	database:	process.env.DB_NAME
});

router.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.end('API Works');
});

bd.connect(err => {
	if (err) throw err;
	else {
		console.log('Connected to the database');

		// exemple d'utilisation pour lister toutes les tables de la base de donnée courante
		router.get('/tables', (req, res) => {
			res.setHeader('Content-Type', 'application/json');
			let tableFields;
			bd
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
	}
});

module.exports = router;
