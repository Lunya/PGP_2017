const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// files included
const api = require('./api');

const app = express();

app.use(bodyParser.json());

// serve angular app
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../front/dist')));
}

// set API routes
app.use('/api', api);

// start server
const server = http.createServer(app);

server.listen(process.env.NODE_PORT,
	() => console.log(`Server running on localhost:${process.env.NODE_PORT}`));
