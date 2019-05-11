const router = require('express').Router();
const db = require('../controllers/dbOps');
const user = require('../controllers/userOps');
const mod = require('../models/User');

// @route   GET api/users/
// @desc    Return all user in database
// @access  Public
router.get('/', (rq, rs) => db.getAll(rq, rs, mod));

// @route   GET api/users/:id
// @desc    Return a user by id
router.get('/:id', (rq, rs) => db.getById(rq, rs, mod));

// @route   POST api/users/register
// @desc    Register a new user
router.post('/register', (rq, rs) => user.register(rq, rs, mod));



module.exports = router;