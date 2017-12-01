let mysql = require('mysql2');

console.log(process.env.DB_SERVER_HOST,
	process.env.DB_SERVER_PORT,
	process.env.DB_SERVER_USER,
	process.env.DB_SERVER_PASSWORD,
	process.env.DB_NAME);

let bd = mysql.createConnection({
	host:		process.env.DB_SERVER_HOST,
	port:		process.env.DB_SERVER_PORT,
	user:		process.env.DB_SERVER_USER,
	password:	process.env.DB_SERVER_PASSWORD,
	database:	process.env.DB_NAME,
	charset:	'utf8'
});

module.exports = bd;
