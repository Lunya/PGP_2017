let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.end('API Works');
});

module.exports = router;
