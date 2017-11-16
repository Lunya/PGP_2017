let mysql = require('mysql2');

let bd = mysql.createConnection({
	host:		process.env.DB_SERVER_HOST,
	port:		process.env.DB_SERVER_PORT,
	user:		process.env.DB_SERVER_USER,
	password:	process.env.DB_SERVER_PASSWORD,
	database:	process.env.DB_NAME
});

module.exports = bd;
