let mysql = require('mysql2');
var pool;

if (process.env.NODE_ENV == 'TEST')
	pool =  mysql.createPool({
		host: process.env.MYSQL_HOST,
		port: process.env.DB_SERVER_PORT,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE
	});
else
	pool =  mysql.createPool({
		host: process.env.DB_SERVER_HOST,
		port: process.env.DB_SERVER_PORT,
		user: process.env.DB_SERVER_USER,
		password: process.env.DB_SERVER_PASSWORD,
		database: process.env.DB_NAME,
		charset: 'utf8'
	});

module.exports = {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1];
        pool.getConnection(function(err, connection) {
        if(err) {
                console.log(err);
                return callback(err);
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
          connection.release();
          if(err){
                    console.log(err);
                    return callback(err);
                }
          callback(null, results);
        });
      });
    }
};
