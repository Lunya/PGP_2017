let express = require('express');
let login = require('./routes/login');
let project = require('./routes/project');
let user = require('./routes/user');
let userstory = require('./routes/userstory');
let sprint = require('./routes/sprint');
let task = require('./routes/task');
let version = require('./routes/version');
let cors = require('cors');

const router = express.Router();
router.use(cors());

router.get('/', (req, res) => {
	res.setHeader('Content-Type', 'text/plain');
	res.send('API Works');
});


router.get('/secured', login.tokenVerifier, (req, res) => {
	res.contentType('application/json');
	res.send('Secured OK');
});


router.use(login.router);
router.use(project);
router.use(user);
router.use(userstory);
router.use(sprint);
router.use(task);
router.use(version);


module.exports = router;
