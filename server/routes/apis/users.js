const router = require('express').Router();
const user = require('../../controllers/userOps');
const db = require('../../controllers/dbOps');
const mod = require('../../models/User');

/**
 * Return all users in database
 * @route   GET api/users/
 * @access  Public
 */
router.get('/', (rq, rs) => db.getAll(rq, rs, mod));

// @route   GET api/users/:id
// @desc    Return a user by id
router.get('/id/:id', (rq, rs) => db.getById(rq, rs, mod));

// @route   GET api/users/:paramaeter
// @desc    Return a user by x parameter
router.get('/by/:key', user.auth, (rq, rs) => db.getBy(rq, rs, mod));

// @route   POST api/users/register
// @desc    Register a new user
router.post('/register', (rq, rs) => user.register(rq, rs, mod));

// @route   POST api/users/login
// @desc    Login a user
router.post('/login', (rq, rs) => user.login(rq, rs, mod));

// @route   POST api/users/login
// @desc    Login a user
router.get('/active', (rq, rs) => user.active(rq, rs, mod));


module.exports = router;