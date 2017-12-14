let express = require('express');
let path = require('path');
let http = require('http');
let bodyParser = require('body-parser');

// files included
let api = require('./api');

let app = express();

app.use(bodyParser.json());

// serve angular app
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../front/dist')));
}

// set API routes
app.use('/api', api);

// start server
let server = http.createServer(app);

server.listen(process.env.NODE_PORT,
	() => console.log(`Server running on localhost:${process.env.NODE_PORT}`));
